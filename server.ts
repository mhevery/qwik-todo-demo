/**
 * @license
 * Copyright BuilderIO All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/BuilderIO/qwik/blob/main/LICENSE
 */
/* eslint no-console: ["off"] */
import commander from 'commander';
import domino from 'domino';
import express from 'express';
import * as fs from 'fs';
import { dirname, join } from 'path';
import srcMap from 'source-map-support';
import { fileURLToPath } from 'url';
import { serializeState } from '@builder.io/qwik';

import { findFiles } from './fs_util.js';

srcMap.install();
const RUNFILES = '.';

async function main(__dirname: string, process: NodeJS.Process) {
  console.log('===================================================');
  console.log('Starting:', __dirname);
  console.log('Node Version:', process.version);

  const program = commander.program;
  program
    .version('0.0.1')
    .option('-p --port <port>', 'HTTP port to serve from', parseInt, 8080)
    .option('-r --root <path...>', 'List of roots to serve from', [] as any);

  program.parse(process.argv);
  const opts: { port: number; root: string[] } = program.opts() as any;
  console.log(opts);
  const app = (express as any)();

  app.use(
    (
      req: express.Request,
      res: express.Response,
      next: express.NextFunction
    ) => {
      if (req.path.endsWith('/qwik.js') && req.path !== '/qwik.js') {
        res.type('application/javascript');
        if (qwikBundle) {
          res.write(qwikBundle);
        } else {
          res.write("export * from '/qwik.js';");
        }
        res.end();
      } else {
        next();
      }
    }
  );

  // Set up static routes first
  const servePaths = opts.root.map((servePath: string) =>
    join(RUNFILES, servePath)
  );
  const qwikBundle = String(
    fs.readFileSync('./node_modules/@builder.io/qwik/qwik.js')
  );

  console.log('A', servePaths);
  servePaths.forEach((path: string) => {
    console.log(path);
    if (fs.existsSync(path)) {
      console.log('Serve static:', path);
      app.use('/', express.static(path));
    } else {
      console.log('REJECTING:', path);
    }
  });

  const serverIndexJS: { url: string; path: string }[] = [];
  opts.root.forEach(root => {
    findFiles(
      join(RUNFILES, root),
      'server_index.js',
      (fullPath: string, fileName: string, relativePath: string) => {
        console.log('Found: ', fileName, relativePath, fullPath);
        serverIndexJS.push({ url: relativePath, path: fullPath });
      }
    );
  });

  // Now search for `server.js`
  await Promise.all(
    serverIndexJS.map(async indexJS => {
      console.log('Importing: ', indexJS.path);
      const serverMain = (await import(indexJS.path)).serverMain;
      const baseURI = `file://${indexJS.path}`;
      app.use('/' + indexJS.url, createServerJSHandler(serverMain, baseURI));
    })
  );

  app.listen(opts.port);
}

function createServerJSHandler(
  serverMain: (doc: Document, url: string) => Promise<any[]>,
  baseUri: string
) {
  return async function serverJSHandler(
    req: express.Request,
    res: express.Response
  ) {
    const document = domino.createDocument();
    Object.defineProperty(document, 'baseURI', { value: baseUri });
    Object.defineProperty(document, 'URL', {
      value: `${req.protocol}://${req.headers.host}${req.originalUrl}`
    });
    const roots = await serverMain(document, req.url);
    if (!Array.isArray(roots)) {
      throw new Error(
        `SERVER: Render method of '${
          req.url
        }' should have returned a promise which resolves when DOM is ready for serialization.`
      );
    }
    serializeState(document);
    const html = document.querySelector('html')!;
    res.send(html.outerHTML);
  };
}

main(__dirname, process).then(() => {
  console.log('Serving ...');
});
