"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @license
 * Copyright BuilderIO All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/BuilderIO/qwik/blob/main/LICENSE
 */
/* eslint no-console: ["off"] */
const commander_1 = __importDefault(require("commander"));
const domino_1 = __importDefault(require("domino"));
const express_1 = __importDefault(require("express"));
const fs = __importStar(require("fs"));
const path_1 = require("path");
// source-map-support seems to break node.
// import srcMap from 'source-map-support';
const qwik_1 = require("@builder.io/qwik");
const fs_util_js_1 = require("./fs_util.js");
const _module = __importStar(require("module"));
Object.defineProperty(_module, '_resolveFilename', (function (delegate) {
    return function (request, parent, isMain, options) {
        const ret = delegate.call(_module, request, parent, isMain, options);
        return ret;
    };
})(_module._resolveFilename));
// srcMap.install();
const RUNFILES = process.cwd();
global.__mockImport = (path) => {
    path = path.replace('file://', '');
    path = path.split('#')[0];
    const result = Promise.resolve(require(path));
    return result;
};
async function main(__dirname, process) {
    console.log('===================================================');
    console.log('Starting:', __dirname);
    console.log('Node Version:', process.version);
    const program = commander_1.default.program;
    program
        .version('0.0.1')
        .option('-p --port <port>', 'HTTP port to serve from', parseInt, 8080)
        .option('-r --root <path...>', 'List of roots to serve from', []);
    program.parse(process.argv);
    const opts = program.opts();
    console.log(opts);
    const app = express_1.default();
    app.use((req, res, next) => {
        console.log('REQUEST', req.path);
        if (req.path.endsWith('/qwik.js')) {
            res.type('application/javascript');
            if (req.path == '/qwik.js') {
                res.send(qwikBundle);
            }
            else {
                res.send("export * from '/qwik.js';");
            }
        }
        else if (req.path.endsWith('/qwikloader.min.js')) {
            res.type('application/javascript');
            res.send(qwikloaderBundle);
        }
        else {
            next();
        }
    });
    // Set up static routes first
    const servePaths = opts.root.map((servePath) => path_1.join(RUNFILES, servePath));
    const qwikBundle = String(fs.readFileSync('./node_modules/@builder.io/qwik/qwik.js'));
    const qwikloaderBundle = String(fs.readFileSync('./node_modules/@builder.io/qwik/qwikloader.js'));
    servePaths.forEach((path) => {
        console.log(path);
        if (fs.existsSync(path)) {
            console.log('Serve static:', path);
            app.use('/', express_1.default.static(path));
        }
        else {
            console.log('REJECTING:', path);
        }
    });
    const serverIndexJS = [];
    opts.root.forEach(root => {
        // Hack to switch to server CJS because: https://github.com/stackblitz/webcontainer-core/issues/167c
        root = root.replace('/dist/', '/dist-server/');
        fs_util_js_1.findFiles(path_1.join(RUNFILES, root), 'server_index.js', (fullPath, fileName, relativePath) => {
            console.log('Found: ', fileName, relativePath, fullPath);
            serverIndexJS.push({ url: relativePath, path: fullPath });
        });
    });
    // Now search for `server.js`
    await Promise.all(serverIndexJS.map(async (indexJS) => {
        console.log('Importing:', indexJS.path);
        try {
            const serverMain = require(indexJS.path).serverMain;
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
        const document = domino_1.default.createDocument();
        Object.defineProperty(document, 'baseURI', { value: baseUri });
        Object.defineProperty(document, 'URL', {
            value: `${req.protocol}://${req.headers.host}${req.originalUrl}`
        });
        const roots = await serverMain(document, req.url);
        if (!Array.isArray(roots)) {
            throw new Error(`SERVER: Render method of '${req.url}' should have returned a promise which resolves when DOM is ready for serialization.`);
        }
        qwik_1.serializeState(document);
        const html = document.querySelector('html');
        res.send(html.outerHTML);
    };
}
main(__dirname, process).then(() => {
    console.log('Serving ...');
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VydmVyLmpzIiwic291cmNlUm9vdCI6Ii4vIiwic291cmNlcyI6WyJzZXJ2ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7OztHQU1HO0FBQ0gsZ0NBQWdDO0FBQ2hDLDBEQUFrQztBQUNsQyxvREFBNEI7QUFDNUIsc0RBQThCO0FBQzlCLHVDQUF5QjtBQUN6QiwrQkFBNEI7QUFDNUIsMENBQTBDO0FBQzFDLDJDQUEyQztBQUMzQywyQ0FBa0Q7QUFDbEQsNkNBQXlDO0FBQ3pDLGdEQUFrQztBQUVsQyxNQUFNLENBQUMsY0FBYyxDQUNuQixPQUFPLEVBQ1Asa0JBQWtCLEVBQ2xCLENBQUMsVUFBUyxRQUFrQjtJQUMxQixPQUFPLFVBQ0wsT0FBZSxFQUNmLE1BQVcsRUFDWCxNQUFlLEVBQ2YsT0FBWTtRQUVaLE1BQU0sR0FBRyxHQUFHLFFBQVEsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBQ3JFLE9BQU8sR0FBRyxDQUFDO0lBQ2IsQ0FBQyxDQUFDO0FBQ0osQ0FBQyxDQUFDLENBQUUsT0FBZSxDQUFDLGdCQUFnQixDQUFDLENBQ3RDLENBQUM7QUFFRixvQkFBb0I7QUFDcEIsTUFBTSxRQUFRLEdBQUcsT0FBTyxDQUFDLEdBQUcsRUFBRSxDQUFDO0FBQzlCLE1BQWMsQ0FBQyxZQUFZLEdBQUcsQ0FBQyxJQUFZLEVBQUUsRUFBRTtJQUM5QyxJQUFJLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFDbkMsSUFBSSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDMUIsTUFBTSxNQUFNLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztJQUM5QyxPQUFPLE1BQU0sQ0FBQztBQUNoQixDQUFDLENBQUM7QUFFRixLQUFLLFVBQVUsSUFBSSxDQUFDLFNBQWlCLEVBQUUsT0FBdUI7SUFDNUQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxxREFBcUQsQ0FBQyxDQUFDO0lBQ25FLE9BQU8sQ0FBQyxHQUFHLENBQUMsV0FBVyxFQUFFLFNBQVMsQ0FBQyxDQUFDO0lBQ3BDLE9BQU8sQ0FBQyxHQUFHLENBQUMsZUFBZSxFQUFFLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUU5QyxNQUFNLE9BQU8sR0FBRyxtQkFBUyxDQUFDLE9BQU8sQ0FBQztJQUNsQyxPQUFPO1NBQ0osT0FBTyxDQUFDLE9BQU8sQ0FBQztTQUNoQixNQUFNLENBQUMsa0JBQWtCLEVBQUUseUJBQXlCLEVBQUUsUUFBUSxFQUFFLElBQUksQ0FBQztTQUNyRSxNQUFNLENBQUMscUJBQXFCLEVBQUUsNkJBQTZCLEVBQUUsRUFBUyxDQUFDLENBQUM7SUFFM0UsT0FBTyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDNUIsTUFBTSxJQUFJLEdBQXFDLE9BQU8sQ0FBQyxJQUFJLEVBQVMsQ0FBQztJQUNyRSxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2xCLE1BQU0sR0FBRyxHQUFJLGlCQUFlLEVBQUUsQ0FBQztJQUUvQixHQUFHLENBQUMsR0FBRyxDQUNMLENBQ0UsR0FBb0IsRUFDcEIsR0FBcUIsRUFDckIsSUFBMEIsRUFDMUIsRUFBRTtRQUNGLE9BQU8sQ0FBQyxHQUFHLENBQUMsU0FBUyxFQUFFLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNqQyxJQUFJLEdBQUcsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxFQUFFO1lBQ2pDLEdBQUcsQ0FBQyxJQUFJLENBQUMsd0JBQXdCLENBQUMsQ0FBQztZQUNuQyxJQUFJLEdBQUcsQ0FBQyxJQUFJLElBQUksVUFBVSxFQUFFO2dCQUMxQixHQUFHLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO2FBQ3RCO2lCQUFNO2dCQUNMLEdBQUcsQ0FBQyxJQUFJLENBQUMsMkJBQTJCLENBQUMsQ0FBQzthQUN2QztTQUNGO2FBQU0sSUFBSSxHQUFHLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxvQkFBb0IsQ0FBQyxFQUFFO1lBQ2xELEdBQUcsQ0FBQyxJQUFJLENBQUMsd0JBQXdCLENBQUMsQ0FBQztZQUNuQyxHQUFHLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUM7U0FDNUI7YUFBTTtZQUNMLElBQUksRUFBRSxDQUFDO1NBQ1I7SUFDSCxDQUFDLENBQ0YsQ0FBQztJQUVGLDZCQUE2QjtJQUM3QixNQUFNLFVBQVUsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLFNBQWlCLEVBQUUsRUFBRSxDQUNyRCxXQUFJLENBQUMsUUFBUSxFQUFFLFNBQVMsQ0FBQyxDQUMxQixDQUFDO0lBQ0YsTUFBTSxVQUFVLEdBQUcsTUFBTSxDQUN2QixFQUFFLENBQUMsWUFBWSxDQUFDLHlDQUF5QyxDQUFDLENBQzNELENBQUM7SUFFRixNQUFNLGdCQUFnQixHQUFHLE1BQU0sQ0FDN0IsRUFBRSxDQUFDLFlBQVksQ0FBQywrQ0FBK0MsQ0FBQyxDQUNqRSxDQUFDO0lBRUYsVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQVksRUFBRSxFQUFFO1FBQ2xDLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDbEIsSUFBSSxFQUFFLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxFQUFFO1lBQ3ZCLE9BQU8sQ0FBQyxHQUFHLENBQUMsZUFBZSxFQUFFLElBQUksQ0FBQyxDQUFDO1lBQ25DLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLGlCQUFPLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7U0FDcEM7YUFBTTtZQUNMLE9BQU8sQ0FBQyxHQUFHLENBQUMsWUFBWSxFQUFFLElBQUksQ0FBQyxDQUFDO1NBQ2pDO0lBQ0gsQ0FBQyxDQUFDLENBQUM7SUFFSCxNQUFNLGFBQWEsR0FBb0MsRUFBRSxDQUFDO0lBQzFELElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFFO1FBQ3ZCLG9HQUFvRztRQUNwRyxJQUFJLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUUsZUFBZSxDQUFDLENBQUM7UUFDL0Msc0JBQVMsQ0FDUCxXQUFJLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxFQUNwQixpQkFBaUIsRUFDakIsQ0FBQyxRQUFnQixFQUFFLFFBQWdCLEVBQUUsWUFBb0IsRUFBRSxFQUFFO1lBQzNELE9BQU8sQ0FBQyxHQUFHLENBQUMsU0FBUyxFQUFFLFFBQVEsRUFBRSxZQUFZLEVBQUUsUUFBUSxDQUFDLENBQUM7WUFDekQsYUFBYSxDQUFDLElBQUksQ0FBQyxFQUFFLEdBQUcsRUFBRSxZQUFZLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxDQUFDLENBQUM7UUFDNUQsQ0FBQyxDQUNGLENBQUM7SUFDSixDQUFDLENBQUMsQ0FBQztJQUVILDZCQUE2QjtJQUM3QixNQUFNLE9BQU8sQ0FBQyxHQUFHLENBQ2YsYUFBYSxDQUFDLEdBQUcsQ0FBQyxLQUFLLEVBQUMsT0FBTyxFQUFDLEVBQUU7UUFDaEMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxZQUFZLEVBQUUsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3hDLElBQUk7WUFDRixNQUFNLFVBQVUsR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLFVBQVUsQ0FBQztZQUNwRCxNQUFNLE9BQU8sR0FBRyxVQUFVLE9BQU8sQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUN6QyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsR0FBRyxPQUFPLENBQUMsR0FBRyxFQUFFLHFCQUFxQixDQUFDLFVBQVUsRUFBRSxPQUFPLENBQUMsQ0FBQyxDQUFDO1NBQ3hFO1FBQUMsT0FBTyxDQUFDLEVBQUU7WUFDVixPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQ2xCO0lBQ0gsQ0FBQyxDQUFDLENBQ0gsQ0FBQztJQUVGLEdBQUcsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ3hCLENBQUM7QUFFRCxTQUFTLHFCQUFxQixDQUM1QixVQUEwRCxFQUMxRCxPQUFlO0lBRWYsT0FBTyxLQUFLLFVBQVUsZUFBZSxDQUNuQyxHQUFvQixFQUNwQixHQUFxQjtRQUVyQixNQUFNLFFBQVEsR0FBRyxnQkFBTSxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQ3pDLE1BQU0sQ0FBQyxjQUFjLENBQUMsUUFBUSxFQUFFLFNBQVMsRUFBRSxFQUFFLEtBQUssRUFBRSxPQUFPLEVBQUUsQ0FBQyxDQUFDO1FBQy9ELE1BQU0sQ0FBQyxjQUFjLENBQUMsUUFBUSxFQUFFLEtBQUssRUFBRTtZQUNyQyxLQUFLLEVBQUUsR0FBRyxHQUFHLENBQUMsUUFBUSxNQUFNLEdBQUcsQ0FBQyxPQUFPLENBQUMsSUFBSSxHQUFHLEdBQUcsQ0FBQyxXQUFXLEVBQUU7U0FDakUsQ0FBQyxDQUFDO1FBQ0gsTUFBTSxLQUFLLEdBQUcsTUFBTSxVQUFVLENBQUMsUUFBUSxFQUFFLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNsRCxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsRUFBRTtZQUN6QixNQUFNLElBQUksS0FBSyxDQUNiLDZCQUNFLEdBQUcsQ0FBQyxHQUNOLHNGQUFzRixDQUN2RixDQUFDO1NBQ0g7UUFDRCxxQkFBYyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ3pCLE1BQU0sSUFBSSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFFLENBQUM7UUFDN0MsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDM0IsQ0FBQyxDQUFDO0FBQ0osQ0FBQztBQUVELElBQUksQ0FBQyxTQUFTLEVBQUUsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRTtJQUNqQyxPQUFPLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxDQUFDO0FBQzdCLENBQUMsQ0FBQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEJ1aWxkZXJJTyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vZ2l0aHViLmNvbS9CdWlsZGVySU8vcXdpay9ibG9iL21haW4vTElDRU5TRVxuICovXG4vKiBlc2xpbnQgbm8tY29uc29sZTogW1wib2ZmXCJdICovXG5pbXBvcnQgY29tbWFuZGVyIGZyb20gJ2NvbW1hbmRlcic7XG5pbXBvcnQgZG9taW5vIGZyb20gJ2RvbWlubyc7XG5pbXBvcnQgZXhwcmVzcyBmcm9tICdleHByZXNzJztcbmltcG9ydCAqIGFzIGZzIGZyb20gJ2ZzJztcbmltcG9ydCB7IGpvaW4gfSBmcm9tICdwYXRoJztcbi8vIHNvdXJjZS1tYXAtc3VwcG9ydCBzZWVtcyB0byBicmVhayBub2RlLlxuLy8gaW1wb3J0IHNyY01hcCBmcm9tICdzb3VyY2UtbWFwLXN1cHBvcnQnO1xuaW1wb3J0IHsgc2VyaWFsaXplU3RhdGUgfSBmcm9tICdAYnVpbGRlci5pby9xd2lrJztcbmltcG9ydCB7IGZpbmRGaWxlcyB9IGZyb20gJy4vZnNfdXRpbC5qcyc7XG5pbXBvcnQgKiBhcyBfbW9kdWxlIGZyb20gJ21vZHVsZSc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShcbiAgX21vZHVsZSxcbiAgJ19yZXNvbHZlRmlsZW5hbWUnLFxuICAoZnVuY3Rpb24oZGVsZWdhdGU6IEZ1bmN0aW9uKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uKFxuICAgICAgcmVxdWVzdDogc3RyaW5nLFxuICAgICAgcGFyZW50OiBhbnksXG4gICAgICBpc01haW46IGJvb2xlYW4sXG4gICAgICBvcHRpb25zOiBhbnlcbiAgICApIHtcbiAgICAgIGNvbnN0IHJldCA9IGRlbGVnYXRlLmNhbGwoX21vZHVsZSwgcmVxdWVzdCwgcGFyZW50LCBpc01haW4sIG9wdGlvbnMpO1xuICAgICAgcmV0dXJuIHJldDtcbiAgICB9O1xuICB9KSgoX21vZHVsZSBhcyBhbnkpLl9yZXNvbHZlRmlsZW5hbWUpXG4pO1xuXG4vLyBzcmNNYXAuaW5zdGFsbCgpO1xuY29uc3QgUlVORklMRVMgPSBwcm9jZXNzLmN3ZCgpO1xuKGdsb2JhbCBhcyBhbnkpLl9fbW9ja0ltcG9ydCA9IChwYXRoOiBzdHJpbmcpID0+IHtcbiAgcGF0aCA9IHBhdGgucmVwbGFjZSgnZmlsZTovLycsICcnKTtcbiAgcGF0aCA9IHBhdGguc3BsaXQoJyMnKVswXTtcbiAgY29uc3QgcmVzdWx0ID0gUHJvbWlzZS5yZXNvbHZlKHJlcXVpcmUocGF0aCkpO1xuICByZXR1cm4gcmVzdWx0O1xufTtcblxuYXN5bmMgZnVuY3Rpb24gbWFpbihfX2Rpcm5hbWU6IHN0cmluZywgcHJvY2VzczogTm9kZUpTLlByb2Nlc3MpIHtcbiAgY29uc29sZS5sb2coJz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PScpO1xuICBjb25zb2xlLmxvZygnU3RhcnRpbmc6JywgX19kaXJuYW1lKTtcbiAgY29uc29sZS5sb2coJ05vZGUgVmVyc2lvbjonLCBwcm9jZXNzLnZlcnNpb24pO1xuXG4gIGNvbnN0IHByb2dyYW0gPSBjb21tYW5kZXIucHJvZ3JhbTtcbiAgcHJvZ3JhbVxuICAgIC52ZXJzaW9uKCcwLjAuMScpXG4gICAgLm9wdGlvbignLXAgLS1wb3J0IDxwb3J0PicsICdIVFRQIHBvcnQgdG8gc2VydmUgZnJvbScsIHBhcnNlSW50LCA4MDgwKVxuICAgIC5vcHRpb24oJy1yIC0tcm9vdCA8cGF0aC4uLj4nLCAnTGlzdCBvZiByb290cyB0byBzZXJ2ZSBmcm9tJywgW10gYXMgYW55KTtcblxuICBwcm9ncmFtLnBhcnNlKHByb2Nlc3MuYXJndik7XG4gIGNvbnN0IG9wdHM6IHsgcG9ydDogbnVtYmVyOyByb290OiBzdHJpbmdbXSB9ID0gcHJvZ3JhbS5vcHRzKCkgYXMgYW55O1xuICBjb25zb2xlLmxvZyhvcHRzKTtcbiAgY29uc3QgYXBwID0gKGV4cHJlc3MgYXMgYW55KSgpO1xuXG4gIGFwcC51c2UoXG4gICAgKFxuICAgICAgcmVxOiBleHByZXNzLlJlcXVlc3QsXG4gICAgICByZXM6IGV4cHJlc3MuUmVzcG9uc2UsXG4gICAgICBuZXh0OiBleHByZXNzLk5leHRGdW5jdGlvblxuICAgICkgPT4ge1xuICAgICAgY29uc29sZS5sb2coJ1JFUVVFU1QnLCByZXEucGF0aCk7XG4gICAgICBpZiAocmVxLnBhdGguZW5kc1dpdGgoJy9xd2lrLmpzJykpIHtcbiAgICAgICAgcmVzLnR5cGUoJ2FwcGxpY2F0aW9uL2phdmFzY3JpcHQnKTtcbiAgICAgICAgaWYgKHJlcS5wYXRoID09ICcvcXdpay5qcycpIHtcbiAgICAgICAgICByZXMuc2VuZChxd2lrQnVuZGxlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXMuc2VuZChcImV4cG9ydCAqIGZyb20gJy9xd2lrLmpzJztcIik7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAocmVxLnBhdGguZW5kc1dpdGgoJy9xd2lrbG9hZGVyLm1pbi5qcycpKSB7XG4gICAgICAgIHJlcy50eXBlKCdhcHBsaWNhdGlvbi9qYXZhc2NyaXB0Jyk7XG4gICAgICAgIHJlcy5zZW5kKHF3aWtsb2FkZXJCdW5kbGUpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbmV4dCgpO1xuICAgICAgfVxuICAgIH1cbiAgKTtcblxuICAvLyBTZXQgdXAgc3RhdGljIHJvdXRlcyBmaXJzdFxuICBjb25zdCBzZXJ2ZVBhdGhzID0gb3B0cy5yb290Lm1hcCgoc2VydmVQYXRoOiBzdHJpbmcpID0+XG4gICAgam9pbihSVU5GSUxFUywgc2VydmVQYXRoKVxuICApO1xuICBjb25zdCBxd2lrQnVuZGxlID0gU3RyaW5nKFxuICAgIGZzLnJlYWRGaWxlU3luYygnLi9ub2RlX21vZHVsZXMvQGJ1aWxkZXIuaW8vcXdpay9xd2lrLmpzJylcbiAgKTtcblxuICBjb25zdCBxd2lrbG9hZGVyQnVuZGxlID0gU3RyaW5nKFxuICAgIGZzLnJlYWRGaWxlU3luYygnLi9ub2RlX21vZHVsZXMvQGJ1aWxkZXIuaW8vcXdpay9xd2lrbG9hZGVyLmpzJylcbiAgKTtcblxuICBzZXJ2ZVBhdGhzLmZvckVhY2goKHBhdGg6IHN0cmluZykgPT4ge1xuICAgIGNvbnNvbGUubG9nKHBhdGgpO1xuICAgIGlmIChmcy5leGlzdHNTeW5jKHBhdGgpKSB7XG4gICAgICBjb25zb2xlLmxvZygnU2VydmUgc3RhdGljOicsIHBhdGgpO1xuICAgICAgYXBwLnVzZSgnLycsIGV4cHJlc3Muc3RhdGljKHBhdGgpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc29sZS5sb2coJ1JFSkVDVElORzonLCBwYXRoKTtcbiAgICB9XG4gIH0pO1xuXG4gIGNvbnN0IHNlcnZlckluZGV4SlM6IHsgdXJsOiBzdHJpbmc7IHBhdGg6IHN0cmluZyB9W10gPSBbXTtcbiAgb3B0cy5yb290LmZvckVhY2gocm9vdCA9PiB7XG4gICAgLy8gSGFjayB0byBzd2l0Y2ggdG8gc2VydmVyIENKUyBiZWNhdXNlOiBodHRwczovL2dpdGh1Yi5jb20vc3RhY2tibGl0ei93ZWJjb250YWluZXItY29yZS9pc3N1ZXMvMTY3Y1xuICAgIHJvb3QgPSByb290LnJlcGxhY2UoJy9kaXN0LycsICcvZGlzdC1zZXJ2ZXIvJyk7XG4gICAgZmluZEZpbGVzKFxuICAgICAgam9pbihSVU5GSUxFUywgcm9vdCksXG4gICAgICAnc2VydmVyX2luZGV4LmpzJyxcbiAgICAgIChmdWxsUGF0aDogc3RyaW5nLCBmaWxlTmFtZTogc3RyaW5nLCByZWxhdGl2ZVBhdGg6IHN0cmluZykgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZygnRm91bmQ6ICcsIGZpbGVOYW1lLCByZWxhdGl2ZVBhdGgsIGZ1bGxQYXRoKTtcbiAgICAgICAgc2VydmVySW5kZXhKUy5wdXNoKHsgdXJsOiByZWxhdGl2ZVBhdGgsIHBhdGg6IGZ1bGxQYXRoIH0pO1xuICAgICAgfVxuICAgICk7XG4gIH0pO1xuXG4gIC8vIE5vdyBzZWFyY2ggZm9yIGBzZXJ2ZXIuanNgXG4gIGF3YWl0IFByb21pc2UuYWxsKFxuICAgIHNlcnZlckluZGV4SlMubWFwKGFzeW5jIGluZGV4SlMgPT4ge1xuICAgICAgY29uc29sZS5sb2coJ0ltcG9ydGluZzonLCBpbmRleEpTLnBhdGgpO1xuICAgICAgdHJ5IHtcbiAgICAgICAgY29uc3Qgc2VydmVyTWFpbiA9IHJlcXVpcmUoaW5kZXhKUy5wYXRoKS5zZXJ2ZXJNYWluO1xuICAgICAgICBjb25zdCBiYXNlVVJJID0gYGZpbGU6Ly8ke2luZGV4SlMucGF0aH1gO1xuICAgICAgICBhcHAudXNlKCcvJyArIGluZGV4SlMudXJsLCBjcmVhdGVTZXJ2ZXJKU0hhbmRsZXIoc2VydmVyTWFpbiwgYmFzZVVSSSkpO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBjb25zb2xlLmVycm9yKGUpO1xuICAgICAgfVxuICAgIH0pXG4gICk7XG5cbiAgYXBwLmxpc3RlbihvcHRzLnBvcnQpO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVTZXJ2ZXJKU0hhbmRsZXIoXG4gIHNlcnZlck1haW46IChkb2M6IERvY3VtZW50LCB1cmw6IHN0cmluZykgPT4gUHJvbWlzZTxhbnlbXT4sXG4gIGJhc2VVcmk6IHN0cmluZ1xuKSB7XG4gIHJldHVybiBhc3luYyBmdW5jdGlvbiBzZXJ2ZXJKU0hhbmRsZXIoXG4gICAgcmVxOiBleHByZXNzLlJlcXVlc3QsXG4gICAgcmVzOiBleHByZXNzLlJlc3BvbnNlXG4gICkge1xuICAgIGNvbnN0IGRvY3VtZW50ID0gZG9taW5vLmNyZWF0ZURvY3VtZW50KCk7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGRvY3VtZW50LCAnYmFzZVVSSScsIHsgdmFsdWU6IGJhc2VVcmkgfSk7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGRvY3VtZW50LCAnVVJMJywge1xuICAgICAgdmFsdWU6IGAke3JlcS5wcm90b2NvbH06Ly8ke3JlcS5oZWFkZXJzLmhvc3R9JHtyZXEub3JpZ2luYWxVcmx9YFxuICAgIH0pO1xuICAgIGNvbnN0IHJvb3RzID0gYXdhaXQgc2VydmVyTWFpbihkb2N1bWVudCwgcmVxLnVybCk7XG4gICAgaWYgKCFBcnJheS5pc0FycmF5KHJvb3RzKSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICBgU0VSVkVSOiBSZW5kZXIgbWV0aG9kIG9mICcke1xuICAgICAgICAgIHJlcS51cmxcbiAgICAgICAgfScgc2hvdWxkIGhhdmUgcmV0dXJuZWQgYSBwcm9taXNlIHdoaWNoIHJlc29sdmVzIHdoZW4gRE9NIGlzIHJlYWR5IGZvciBzZXJpYWxpemF0aW9uLmBcbiAgICAgICk7XG4gICAgfVxuICAgIHNlcmlhbGl6ZVN0YXRlKGRvY3VtZW50KTtcbiAgICBjb25zdCBodG1sID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignaHRtbCcpITtcbiAgICByZXMuc2VuZChodG1sLm91dGVySFRNTCk7XG4gIH07XG59XG5cbm1haW4oX19kaXJuYW1lLCBwcm9jZXNzKS50aGVuKCgpID0+IHtcbiAgY29uc29sZS5sb2coJ1NlcnZpbmcgLi4uJyk7XG59KTtcbiJdfQ==