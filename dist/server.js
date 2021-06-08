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
import { join } from 'path';
// source-map-support seems to break node.
// import srcMap from 'source-map-support';
import { serializeState } from '@builder.io/qwik';
import { findFiles } from './fs_util.js';
import * as _module from 'module';
console.log(Object.keys(_module));
console.log(process.cwd());
Object.defineProperty(_module, '_resolveFilename', (function (delegate) {
    return function (request, parent, isMain, options) {
        console.log('REQUIRE', request, '...');
        const ret = delegate.call(_module, request, parent, isMain, options);
        console.log('REQUIRE', request, '!');
        return ret;
    };
})(_module._resolveFilename));
// srcMap.install();
const RUNFILES = '.';
global.__mockImport = (path) => {
    console.log('IMPORT', path);
    path = path.replace('file://', '');
    path = path.split('#')[0];
    console.log('IMPORT', path);
    return Promise.resolve(require(path));
};
async function main(__dirname, process) {
    console.log('===================================================');
    console.log('Starting:', __dirname);
    console.log('Node Version:', process.version);
    const program = commander.program;
    program
        .version('0.0.1')
        .option('-p --port <port>', 'HTTP port to serve from', parseInt, 8080)
        .option('-r --root <path...>', 'List of roots to serve from', []);
    program.parse(process.argv);
    const opts = program.opts();
    console.log(opts);
    const app = express();
    app.use((req, res, next) => {
        if (req.path.endsWith('/qwik.js') && req.path !== '/qwik.js') {
            res.type('application/javascript');
            if (qwikBundle) {
                res.write(qwikBundle);
            }
            else {
                res.write("export * from '/qwik.js';");
            }
            res.end();
        }
        else {
            next();
        }
    });
    // Set up static routes first
    const servePaths = opts.root.map((servePath) => join(RUNFILES, servePath));
    const qwikBundle = String(fs.readFileSync('./node_modules/@builder.io/qwik/qwik.js'));
    servePaths.forEach((path) => {
        console.log(path);
        if (fs.existsSync(path)) {
            console.log('Serve static:', path);
            app.use('/', express.static(path));
        }
        else {
            console.log('REJECTING:', path);
        }
    });
    const serverIndexJS = [];
    opts.root.forEach(root => {
        findFiles(join(RUNFILES, root), 'server_index.js', (fullPath, fileName, relativePath) => {
            console.log('Found: ', fileName, relativePath, fullPath);
            serverIndexJS.push({ url: relativePath, path: fullPath });
        });
    });
    // Now search for `server.js`
    await Promise.all(serverIndexJS.map(async (indexJS) => {
        console.log('Importing:', indexJS.path);
        try {
            console.log('BEFORE', indexJS.path);
            const serverMain = require('../' + indexJS.path).serverMain;
            console.log('AFTER', indexJS.path);
            const baseURI = `file://${indexJS.path}`;
            app.use('/' + indexJS.url, createServerJSHandler(serverMain, baseURI));
        }
        catch (e) {
            console.error(e);
        }
    }));
    app.listen(opts.port);
}
function createServerJSHandler(serverMain, baseUri) {
    return async function serverJSHandler(req, res) {
        const document = domino.createDocument();
        Object.defineProperty(document, 'baseURI', { value: baseUri });
        Object.defineProperty(document, 'URL', {
            value: `${req.protocol}://${req.headers.host}${req.originalUrl}`
        });
        const roots = await serverMain(document, req.url);
        if (!Array.isArray(roots)) {
            throw new Error(`SERVER: Render method of '${req.url}' should have returned a promise which resolves when DOM is ready for serialization.`);
        }
        serializeState(document);
        const html = document.querySelector('html');
        res.send(html.outerHTML);
    };
}
main(__dirname, process).then(() => {
    console.log('Serving ...');
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VydmVyLmpzIiwic291cmNlUm9vdCI6Ii4vIiwic291cmNlcyI6WyJzZXJ2ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBQ0gsZ0NBQWdDO0FBQ2hDLE9BQU8sU0FBUyxNQUFNLFdBQVcsQ0FBQztBQUNsQyxPQUFPLE1BQU0sTUFBTSxRQUFRLENBQUM7QUFDNUIsT0FBTyxPQUFPLE1BQU0sU0FBUyxDQUFDO0FBQzlCLE9BQU8sS0FBSyxFQUFFLE1BQU0sSUFBSSxDQUFDO0FBQ3pCLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDNUIsMENBQTBDO0FBQzFDLDJDQUEyQztBQUMzQyxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFDbEQsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUN6QyxPQUFPLEtBQUssT0FBTyxNQUFNLFFBQVEsQ0FBQztBQUVsQyxPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztBQUNsQyxPQUFPLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDO0FBQzNCLE1BQU0sQ0FBQyxjQUFjLENBQ25CLE9BQU8sRUFDUCxrQkFBa0IsRUFDbEIsQ0FBQyxVQUFTLFFBQWtCO0lBQzFCLE9BQU8sVUFDTCxPQUFlLEVBQ2YsTUFBVyxFQUNYLE1BQWUsRUFDZixPQUFZO1FBRVosT0FBTyxDQUFDLEdBQUcsQ0FBQyxTQUFTLEVBQUUsT0FBTyxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQ3ZDLE1BQU0sR0FBRyxHQUFHLFFBQVEsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBQ3JFLE9BQU8sQ0FBQyxHQUFHLENBQUMsU0FBUyxFQUFFLE9BQU8sRUFBRSxHQUFHLENBQUMsQ0FBQztRQUNy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Q0FBQztTQUNIO1FBQ0QsY0FBYyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ3pCLE1BQU0sSUFBSSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFFLENBQUM7UUFDN0MsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDM0IsQ0FBQyxDQUFDO0FBQ0osQ0FBQztBQUVELElBQUksQ0FBQyxTQUFTLEVBQUUsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRTtJQUNqQyxPQUFPLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxDQUFDO0FBQzdCLENBQUMsQ0FBQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEJ1aWxkZXJJTyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vZ2l0aHViLmNvbS9CdWlsZGVySU8vcXdpay9ibG9iL21haW4vTElDRU5TRVxuICovXG4vKiBlc2xpbnQgbm8tY29uc29sZTogW1wib2ZmXCJdICovXG5pbXBvcnQgY29tbWFuZGVyIGZyb20gJ2NvbW1hbmRlcic7XG5pbXBvcnQgZG9taW5vIGZyb20gJ2RvbWlubyc7XG5pbXBvcnQgZXhwcmVzcyBmcm9tICdleHByZXNzJztcbmltcG9ydCAqIGFzIGZzIGZyb20gJ2ZzJztcbmltcG9ydCB7IGpvaW4gfSBmcm9tICdwYXRoJztcbi8vIHNvdXJjZS1tYXAtc3VwcG9ydCBzZWVtcyB0byBicmVhayBub2RlLlxuLy8gaW1wb3J0IHNyY01hcCBmcm9tICdzb3VyY2UtbWFwLXN1cHBvcnQnO1xuaW1wb3J0IHsgc2VyaWFsaXplU3RhdGUgfSBmcm9tICdAYnVpbGRlci5pby9xd2lrJztcbmltcG9ydCB7IGZpbmRGaWxlcyB9IGZyb20gJy4vZnNfdXRpbC5qcyc7XG5pbXBvcnQgKiBhcyBfbW9kdWxlIGZyb20gJ21vZHVsZSc7XG5cbmNvbnNvbGUubG9nKE9iamVjdC5rZXlzKF9tb2R1bGUpKTtcbmNvbnNvbGUubG9nKHByb2Nlc3MuY3dkKCkpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KFxuICBfbW9kdWxlLFxuICAnX3Jlc29sdmVGaWxlbmFtZScsXG4gIChmdW5jdGlvbihkZWxlZ2F0ZTogRnVuY3Rpb24pIHtcbiAgICByZXR1cm4gZnVuY3Rpb24oXG4gICAgICByZXF1ZXN0OiBzdHJpbmcsXG4gICAgICBwYXJlbnQ6IGFueSxcbiAgICAgIGlzTWFpbjogYm9vbGVhbixcbiAgICAgIG9wdGlvbnM6IGFueVxuICAgICkge1xuICAgICAgY29uc29sZS5sb2coJ1JFUVVJUkUnLCByZXF1ZXN0LCAnLi4uJyk7XG4gICAgICBjb25zdCByZXQgPSBkZWxlZ2F0ZS5jYWxsKF9tb2R1bGUsIHJlcXVlc3QsIHBhcmVudCwgaXNNYWluLCBvcHRpb25zKTtcbiAgICAgIGNvbnNvbGUubG9nKCdSRVFVSVJFJywgcmVxdWVzdCwgJyEnKTtcbiAgICAgIHJldHVybiByZXQ7XG4gICAgfTtcbiAgfSkoKF9tb2R1bGUgYXMgYW55KS5fcmVzb2x2ZUZpbGVuYW1lKVxuKTtcblxuLy8gc3JjTWFwLmluc3RhbGwoKTtcbmNvbnN0IFJVTkZJTEVTID0gJy4nO1xuKGdsb2JhbCBhcyBhbnkpLl9fbW9ja0ltcG9ydCA9IChwYXRoOiBzdHJpbmcpID0+IHtcbiAgY29uc29sZS5sb2coJ0lNUE9SVCcsIHBhdGgpO1xuICBwYXRoID0gcGF0aC5yZXBsYWNlKCdmaWxlOi8vJywgJycpO1xuICBwYXRoID0gcGF0aC5zcGxpdCgnIycpWzBdO1xuICBjb25zb2xlLmxvZygnSU1QT1JUJywgcGF0aCk7XG4gIHJldHVybiBQcm9taXNlLnJlc29sdmUocmVxdWlyZShwYXRoKSk7XG59O1xuXG5hc3luYyBmdW5jdGlvbiBtYWluKF9fZGlybmFtZTogc3RyaW5nLCBwcm9jZXNzOiBOb2RlSlMuUHJvY2Vzcykge1xuICBjb25zb2xlLmxvZygnPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09Jyk7XG4gIGNvbnNvbGUubG9nKCdTdGFydGluZzonLCBfX2Rpcm5hbWUpO1xuICBjb25zb2xlLmxvZygnTm9kZSBWZXJzaW9uOicsIHByb2Nlc3MudmVyc2lvbik7XG5cbiAgY29uc3QgcHJvZ3JhbSA9IGNvbW1hbmRlci5wcm9ncmFtO1xuICBwcm9ncmFtXG4gICAgLnZlcnNpb24oJzAuMC4xJylcbiAgICAub3B0aW9uKCctcCAtLXBvcnQgPHBvcnQ+JywgJ0hUVFAgcG9ydCB0byBzZXJ2ZSBmcm9tJywgcGFyc2VJbnQsIDgwODApXG4gICAgLm9wdGlvbignLXIgLS1yb290IDxwYXRoLi4uPicsICdMaXN0IG9mIHJvb3RzIHRvIHNlcnZlIGZyb20nLCBbXSBhcyBhbnkpO1xuXG4gIHByb2dyYW0ucGFyc2UocHJvY2Vzcy5hcmd2KTtcbiAgY29uc3Qgb3B0czogeyBwb3J0OiBudW1iZXI7IHJvb3Q6IHN0cmluZ1tdIH0gPSBwcm9ncmFtLm9wdHMoKSBhcyBhbnk7XG4gIGNvbnNvbGUubG9nKG9wdHMpO1xuICBjb25zdCBhcHAgPSAoZXhwcmVzcyBhcyBhbnkpKCk7XG5cbiAgYXBwLnVzZShcbiAgICAoXG4gICAgICByZXE6IGV4cHJlc3MuUmVxdWVzdCxcbiAgICAgIHJlczogZXhwcmVzcy5SZXNwb25zZSxcbiAgICAgIG5leHQ6IGV4cHJlc3MuTmV4dEZ1bmN0aW9uXG4gICAgKSA9PiB7XG4gICAgICBpZiAocmVxLnBhdGguZW5kc1dpdGgoJy9xd2lrLmpzJykgJiYgcmVxLnBhdGggIT09ICcvcXdpay5qcycpIHtcbiAgICAgICAgcmVzLnR5cGUoJ2FwcGxpY2F0aW9uL2phdmFzY3JpcHQnKTtcbiAgICAgICAgaWYgKHF3aWtCdW5kbGUpIHtcbiAgICAgICAgICByZXMud3JpdGUocXdpa0J1bmRsZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmVzLndyaXRlKFwiZXhwb3J0ICogZnJvbSAnL3F3aWsuanMnO1wiKTtcbiAgICAgICAgfVxuICAgICAgICByZXMuZW5kKCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBuZXh0KCk7XG4gICAgICB9XG4gICAgfVxuICApO1xuXG4gIC8vIFNldCB1cCBzdGF0aWMgcm91dGVzIGZpcnN0XG4gIGNvbnN0IHNlcnZlUGF0aHMgPSBvcHRzLnJvb3QubWFwKChzZXJ2ZVBhdGg6IHN0cmluZykgPT5cbiAgICBqb2luKFJVTkZJTEVTLCBzZXJ2ZVBhdGgpXG4gICk7XG4gIGNvbnN0IHF3aWtCdW5kbGUgPSBTdHJpbmcoXG4gICAgZnMucmVhZEZpbGVTeW5jKCcuL25vZGVfbW9kdWxlcy9AYnVpbGRlci5pby9xd2lrL3F3aWsuanMnKVxuICApO1xuXG4gIHNlcnZlUGF0aHMuZm9yRWFjaCgocGF0aDogc3RyaW5nKSA9PiB7XG4gICAgY29uc29sZS5sb2cocGF0aCk7XG4gICAgaWYgKGZzLmV4aXN0c1N5bmMocGF0aCkpIHtcbiAgICAgIGNvbnNvbGUubG9nKCdTZXJ2ZSBzdGF0aWM6JywgcGF0aCk7XG4gICAgICBhcHAudXNlKCcvJywgZXhwcmVzcy5zdGF0aWMocGF0aCkpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zb2xlLmxvZygnUkVKRUNUSU5HOicsIHBhdGgpO1xuICAgIH1cbiAgfSk7XG5cbiAgY29uc3Qgc2VydmVySW5kZXhKUzogeyB1cmw6IHN0cmluZzsgcGF0aDogc3RyaW5nIH1bXSA9IFtdO1xuICBvcHRzLnJvb3QuZm9yRWFjaChyb290ID0+IHtcbiAgICBmaW5kRmlsZXMoXG4gICAgICBqb2luKFJVTkZJTEVTLCByb290KSxcbiAgICAgICdzZXJ2ZXJfaW5kZXguanMnLFxuICAgICAgKGZ1bGxQYXRoOiBzdHJpbmcsIGZpbGVOYW1lOiBzdHJpbmcsIHJlbGF0aXZlUGF0aDogc3RyaW5nKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdGb3VuZDogJywgZmlsZU5hbWUsIHJlbGF0aXZlUGF0aCwgZnVsbFBhdGgpO1xuICAgICAgICBzZXJ2ZXJJbmRleEpTLnB1c2goeyB1cmw6IHJlbGF0aXZlUGF0aCwgcGF0aDogZnVsbFBhdGggfSk7XG4gICAgICB9XG4gICAgKTtcbiAgfSk7XG5cbiAgLy8gTm93IHNlYXJjaCBmb3IgYHNlcnZlci5qc2BcbiAgYXdhaXQgUHJvbWlzZS5hbGwoXG4gICAgc2VydmVySW5kZXhKUy5tYXAoYXN5bmMgaW5kZXhKUyA9PiB7XG4gICAgICBjb25zb2xlLmxvZygnSW1wb3J0aW5nOicsIGluZGV4SlMucGF0aCk7XG4gICAgICB0cnkge1xuICAgICAgICBjb25zb2xlLmxvZygnQkVGT1JFJywgaW5kZXhKUy5wYXRoKTtcbiAgICAgICAgY29uc3Qgc2VydmVyTWFpbiA9IHJlcXVpcmUoJy4uLycgKyBpbmRleEpTLnBhdGgpLnNlcnZlck1haW47XG4gICAgICAgIGNvbnNvbGUubG9nKCdBRlRFUicsIGluZGV4SlMucGF0aCk7XG4gICAgICAgIGNvbnN0IGJhc2VVUkkgPSBgZmlsZTovLyR7aW5kZXhKUy5wYXRofWA7XG4gICAgICAgIGFwcC51c2UoJy8nICsgaW5kZXhKUy51cmwsIGNyZWF0ZVNlcnZlckpTSGFuZGxlcihzZXJ2ZXJNYWluLCBiYXNlVVJJKSk7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoZSk7XG4gICAgICB9XG4gICAgfSlcbiAgKTtcblxuICBhcHAubGlzdGVuKG9wdHMucG9ydCk7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZVNlcnZlckpTSGFuZGxlcihcbiAgc2VydmVyTWFpbjogKGRvYzogRG9jdW1lbnQsIHVybDogc3RyaW5nKSA9PiBQcm9taXNlPGFueVtdPixcbiAgYmFzZVVyaTogc3RyaW5nXG4pIHtcbiAgcmV0dXJuIGFzeW5jIGZ1bmN0aW9uIHNlcnZlckpTSGFuZGxlcihcbiAgICByZXE6IGV4cHJlc3MuUmVxdWVzdCxcbiAgICByZXM6IGV4cHJlc3MuUmVzcG9uc2VcbiAgKSB7XG4gICAgY29uc3QgZG9jdW1lbnQgPSBkb21pbm8uY3JlYXRlRG9jdW1lbnQoKTtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoZG9jdW1lbnQsICdiYXNlVVJJJywgeyB2YWx1ZTogYmFzZVVyaSB9KTtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoZG9jdW1lbnQsICdVUkwnLCB7XG4gICAgICB2YWx1ZTogYCR7cmVxLnByb3RvY29sfTovLyR7cmVxLmhlYWRlcnMuaG9zdH0ke3JlcS5vcmlnaW5hbFVybH1gXG4gICAgfSk7XG4gICAgY29uc3Qgcm9vdHMgPSBhd2FpdCBzZXJ2ZXJNYWluKGRvY3VtZW50LCByZXEudXJsKTtcbiAgICBpZiAoIUFycmF5LmlzQXJyYXkocm9vdHMpKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgIGBTRVJWRVI6IFJlbmRlciBtZXRob2Qgb2YgJyR7XG4gICAgICAgICAgcmVxLnVybFxuICAgICAgICB9JyBzaG91bGQgaGF2ZSByZXR1cm5lZCBhIHByb21pc2Ugd2hpY2ggcmVzb2x2ZXMgd2hlbiBET00gaXMgcmVhZHkgZm9yIHNlcmlhbGl6YXRpb24uYFxuICAgICAgKTtcbiAgICB9XG4gICAgc2VyaWFsaXplU3RhdGUoZG9jdW1lbnQpO1xuICAgIGNvbnN0IGh0bWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdodG1sJykhO1xuICAgIHJlcy5zZW5kKGh0bWwub3V0ZXJIVE1MKTtcbiAgfTtcbn1cblxubWFpbihfX2Rpcm5hbWUsIHByb2Nlc3MpLnRoZW4oKCkgPT4ge1xuICBjb25zb2xlLmxvZygnU2VydmluZyAuLi4nKTtcbn0pO1xuIl19