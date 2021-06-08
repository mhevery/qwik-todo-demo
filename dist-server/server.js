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
        console.log(req.path, qwikBundle.length);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VydmVyLmpzIiwic291cmNlUm9vdCI6Ii4vIiwic291cmNlcyI6WyJzZXJ2ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7OztHQU1HO0FBQ0gsZ0NBQWdDO0FBQ2hDLDBEQUFrQztBQUNsQyxvREFBNEI7QUFDNUIsc0RBQThCO0FBQzlCLHVDQUF5QjtBQUN6QiwrQkFBNEI7QUFDNUIsMENBQTBDO0FBQzFDLDJDQUEyQztBQUMzQywyQ0FBa0Q7QUFDbEQsNkNBQXlDO0FBQ3pDLGdEQUFrQztBQUVsQyxNQUFNLENBQUMsY0FBYyxDQUNuQixPQUFPLEVBQ1Asa0JBQWtCLEVBQ2xCLENBQUMsVUFBUyxRQUFrQjtJQUMxQixPQUFPLFVBQ0wsT0FBZSxFQUNmLE1BQVcsRUFDWCxNQUFlLEVBQ2YsT0FBWTtRQUVaLE1BQU0sR0FBRyxHQUFHLFFBQVEsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBQ3JFLE9BQU8sR0FBRyxDQUFDO0lBQ2IsQ0FBQyxDQUFDO0FBQ0osQ0FBQyxDQUFDLENBQUUsT0FBZSxDQUFDLGdCQUFnQixDQUFDLENBQ3RDLENBQUM7QUFFRixvQkFBb0I7QUFDcEIsTUFBTSxRQUFRLEdBQUcsT0FBTyxDQUFDLEdBQUcsRUFBRSxDQUFDO0FBQzlCLE1BQWMsQ0FBQyxZQUFZLEdBQUcsQ0FBQyxJQUFZLEVBQUUsRUFBRTtJQUM5QyxJQUFJLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFDbkMsSUFBSSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDMUIsTUFBTSxNQUFNLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztJQUM5QyxPQUFPLE1BQU0sQ0FB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QyxhQUFhLENBQUMsQ0FBQztBQUM3QixDQUFDLENBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBCdWlsZGVySU8gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2dpdGh1Yi5jb20vQnVpbGRlcklPL3F3aWsvYmxvYi9tYWluL0xJQ0VOU0VcbiAqL1xuLyogZXNsaW50IG5vLWNvbnNvbGU6IFtcIm9mZlwiXSAqL1xuaW1wb3J0IGNvbW1hbmRlciBmcm9tICdjb21tYW5kZXInO1xuaW1wb3J0IGRvbWlubyBmcm9tICdkb21pbm8nO1xuaW1wb3J0IGV4cHJlc3MgZnJvbSAnZXhwcmVzcyc7XG5pbXBvcnQgKiBhcyBmcyBmcm9tICdmcyc7XG5pbXBvcnQgeyBqb2luIH0gZnJvbSAncGF0aCc7XG4vLyBzb3VyY2UtbWFwLXN1cHBvcnQgc2VlbXMgdG8gYnJlYWsgbm9kZS5cbi8vIGltcG9ydCBzcmNNYXAgZnJvbSAnc291cmNlLW1hcC1zdXBwb3J0JztcbmltcG9ydCB7IHNlcmlhbGl6ZVN0YXRlIH0gZnJvbSAnQGJ1aWxkZXIuaW8vcXdpayc7XG5pbXBvcnQgeyBmaW5kRmlsZXMgfSBmcm9tICcuL2ZzX3V0aWwuanMnO1xuaW1wb3J0ICogYXMgX21vZHVsZSBmcm9tICdtb2R1bGUnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoXG4gIF9tb2R1bGUsXG4gICdfcmVzb2x2ZUZpbGVuYW1lJyxcbiAgKGZ1bmN0aW9uKGRlbGVnYXRlOiBGdW5jdGlvbikge1xuICAgIHJldHVybiBmdW5jdGlvbihcbiAgICAgIHJlcXVlc3Q6IHN0cmluZyxcbiAgICAgIHBhcmVudDogYW55LFxuICAgICAgaXNNYWluOiBib29sZWFuLFxuICAgICAgb3B0aW9uczogYW55XG4gICAgKSB7XG4gICAgICBjb25zdCByZXQgPSBkZWxlZ2F0ZS5jYWxsKF9tb2R1bGUsIHJlcXVlc3QsIHBhcmVudCwgaXNNYWluLCBvcHRpb25zKTtcbiAgICAgIHJldHVybiByZXQ7XG4gICAgfTtcbiAgfSkoKF9tb2R1bGUgYXMgYW55KS5fcmVzb2x2ZUZpbGVuYW1lKVxuKTtcblxuLy8gc3JjTWFwLmluc3RhbGwoKTtcbmNvbnN0IFJVTkZJTEVTID0gcHJvY2Vzcy5jd2QoKTtcbihnbG9iYWwgYXMgYW55KS5fX21vY2tJbXBvcnQgPSAocGF0aDogc3RyaW5nKSA9PiB7XG4gIHBhdGggPSBwYXRoLnJlcGxhY2UoJ2ZpbGU6Ly8nLCAnJyk7XG4gIHBhdGggPSBwYXRoLnNwbGl0KCcjJylbMF07XG4gIGNvbnN0IHJlc3VsdCA9IFByb21pc2UucmVzb2x2ZShyZXF1aXJlKHBhdGgpKTtcbiAgcmV0dXJuIHJlc3VsdDtcbn07XG5cbmFzeW5jIGZ1bmN0aW9uIG1haW4oX19kaXJuYW1lOiBzdHJpbmcsIHByb2Nlc3M6IE5vZGVKUy5Qcm9jZXNzKSB7XG4gIGNvbnNvbGUubG9nKCc9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0nKTtcbiAgY29uc29sZS5sb2coJ1N0YXJ0aW5nOicsIF9fZGlybmFtZSk7XG4gIGNvbnNvbGUubG9nKCdOb2RlIFZlcnNpb246JywgcHJvY2Vzcy52ZXJzaW9uKTtcblxuICBjb25zdCBwcm9ncmFtID0gY29tbWFuZGVyLnByb2dyYW07XG4gIHByb2dyYW1cbiAgICAudmVyc2lvbignMC4wLjEnKVxuICAgIC5vcHRpb24oJy1wIC0tcG9ydCA8cG9ydD4nLCAnSFRUUCBwb3J0IHRvIHNlcnZlIGZyb20nLCBwYXJzZUludCwgODA4MClcbiAgICAub3B0aW9uKCctciAtLXJvb3QgPHBhdGguLi4+JywgJ0xpc3Qgb2Ygcm9vdHMgdG8gc2VydmUgZnJvbScsIFtdIGFzIGFueSk7XG5cbiAgcHJvZ3JhbS5wYXJzZShwcm9jZXNzLmFyZ3YpO1xuICBjb25zdCBvcHRzOiB7IHBvcnQ6IG51bWJlcjsgcm9vdDogc3RyaW5nW10gfSA9IHByb2dyYW0ub3B0cygpIGFzIGFueTtcbiAgY29uc29sZS5sb2cob3B0cyk7XG4gIGNvbnN0IGFwcCA9IChleHByZXNzIGFzIGFueSkoKTtcblxuICBhcHAudXNlKFxuICAgIChcbiAgICAgIHJlcTogZXhwcmVzcy5SZXF1ZXN0LFxuICAgICAgcmVzOiBleHByZXNzLlJlc3BvbnNlLFxuICAgICAgbmV4dDogZXhwcmVzcy5OZXh0RnVuY3Rpb25cbiAgICApID0+IHtcbiAgICAgIGNvbnNvbGUubG9nKHJlcS5wYXRoLCBxd2lrQnVuZGxlLmxlbmd0aCk7XG4gICAgICBpZiAocmVxLnBhdGguZW5kc1dpdGgoJy9xd2lrLmpzJykpIHtcbiAgICAgICAgcmVzLnR5cGUoJ2FwcGxpY2F0aW9uL2phdmFzY3JpcHQnKTtcbiAgICAgICAgaWYgKHJlcS5wYXRoID09ICcvcXdpay5qcycpIHtcbiAgICAgICAgICByZXMuc2VuZChxd2lrQnVuZGxlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXMuc2VuZChcImV4cG9ydCAqIGZyb20gJy9xd2lrLmpzJztcIik7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAocmVxLnBhdGguZW5kc1dpdGgoJy9xd2lrbG9hZGVyLm1pbi5qcycpKSB7XG4gICAgICAgIHJlcy50eXBlKCdhcHBsaWNhdGlvbi9qYXZhc2NyaXB0Jyk7XG4gICAgICAgIHJlcy5zZW5kKHF3aWtsb2FkZXJCdW5kbGUpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbmV4dCgpO1xuICAgICAgfVxuICAgIH1cbiAgKTtcblxuICAvLyBTZXQgdXAgc3RhdGljIHJvdXRlcyBmaXJzdFxuICBjb25zdCBzZXJ2ZVBhdGhzID0gb3B0cy5yb290Lm1hcCgoc2VydmVQYXRoOiBzdHJpbmcpID0+XG4gICAgam9pbihSVU5GSUxFUywgc2VydmVQYXRoKVxuICApO1xuICBjb25zdCBxd2lrQnVuZGxlID0gU3RyaW5nKFxuICAgIGZzLnJlYWRGaWxlU3luYygnLi9ub2RlX21vZHVsZXMvQGJ1aWxkZXIuaW8vcXdpay9xd2lrLmpzJylcbiAgKTtcblxuICBjb25zdCBxd2lrbG9hZGVyQnVuZGxlID0gU3RyaW5nKFxuICAgIGZzLnJlYWRGaWxlU3luYygnLi9ub2RlX21vZHVsZXMvQGJ1aWxkZXIuaW8vcXdpay9xd2lrbG9hZGVyLmpzJylcbiAgKTtcblxuICBzZXJ2ZVBhdGhzLmZvckVhY2goKHBhdGg6IHN0cmluZykgPT4ge1xuICAgIGNvbnNvbGUubG9nKHBhdGgpO1xuICAgIGlmIChmcy5leGlzdHNTeW5jKHBhdGgpKSB7XG4gICAgICBjb25zb2xlLmxvZygnU2VydmUgc3RhdGljOicsIHBhdGgpO1xuICAgICAgYXBwLnVzZSgnLycsIGV4cHJlc3Muc3RhdGljKHBhdGgpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc29sZS5sb2coJ1JFSkVDVElORzonLCBwYXRoKTtcbiAgICB9XG4gIH0pO1xuXG4gIGNvbnN0IHNlcnZlckluZGV4SlM6IHsgdXJsOiBzdHJpbmc7IHBhdGg6IHN0cmluZyB9W10gPSBbXTtcbiAgb3B0cy5yb290LmZvckVhY2gocm9vdCA9PiB7XG4gICAgLy8gSGFjayB0byBzd2l0Y2ggdG8gc2VydmVyIENKUyBiZWNhdXNlOiBodHRwczovL2dpdGh1Yi5jb20vc3RhY2tibGl0ei93ZWJjb250YWluZXItY29yZS9pc3N1ZXMvMTY3Y1xuICAgIHJvb3QgPSByb290LnJlcGxhY2UoJy9kaXN0LycsICcvZGlzdC1zZXJ2ZXIvJyk7XG4gICAgZmluZEZpbGVzKFxuICAgICAgam9pbihSVU5GSUxFUywgcm9vdCksXG4gICAgICAnc2VydmVyX2luZGV4LmpzJyxcbiAgICAgIChmdWxsUGF0aDogc3RyaW5nLCBmaWxlTmFtZTogc3RyaW5nLCByZWxhdGl2ZVBhdGg6IHN0cmluZykgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZygnRm91bmQ6ICcsIGZpbGVOYW1lLCByZWxhdGl2ZVBhdGgsIGZ1bGxQYXRoKTtcbiAgICAgICAgc2VydmVySW5kZXhKUy5wdXNoKHsgdXJsOiByZWxhdGl2ZVBhdGgsIHBhdGg6IGZ1bGxQYXRoIH0pO1xuICAgICAgfVxuICAgICk7XG4gIH0pO1xuXG4gIC8vIE5vdyBzZWFyY2ggZm9yIGBzZXJ2ZXIuanNgXG4gIGF3YWl0IFByb21pc2UuYWxsKFxuICAgIHNlcnZlckluZGV4SlMubWFwKGFzeW5jIGluZGV4SlMgPT4ge1xuICAgICAgY29uc29sZS5sb2coJ0ltcG9ydGluZzonLCBpbmRleEpTLnBhdGgpO1xuICAgICAgdHJ5IHtcbiAgICAgICAgY29uc3Qgc2VydmVyTWFpbiA9IHJlcXVpcmUoaW5kZXhKUy5wYXRoKS5zZXJ2ZXJNYWluO1xuICAgICAgICBjb25zdCBiYXNlVVJJID0gYGZpbGU6Ly8ke2luZGV4SlMucGF0aH1gO1xuICAgICAgICBhcHAudXNlKCcvJyArIGluZGV4SlMudXJsLCBjcmVhdGVTZXJ2ZXJKU0hhbmRsZXIoc2VydmVyTWFpbiwgYmFzZVVSSSkpO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBjb25zb2xlLmVycm9yKGUpO1xuICAgICAgfVxuICAgIH0pXG4gICk7XG5cbiAgYXBwLmxpc3RlbihvcHRzLnBvcnQpO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVTZXJ2ZXJKU0hhbmRsZXIoXG4gIHNlcnZlck1haW46IChkb2M6IERvY3VtZW50LCB1cmw6IHN0cmluZykgPT4gUHJvbWlzZTxhbnlbXT4sXG4gIGJhc2VVcmk6IHN0cmluZ1xuKSB7XG4gIHJldHVybiBhc3luYyBmdW5jdGlvbiBzZXJ2ZXJKU0hhbmRsZXIoXG4gICAgcmVxOiBleHByZXNzLlJlcXVlc3QsXG4gICAgcmVzOiBleHByZXNzLlJlc3BvbnNlXG4gICkge1xuICAgIGNvbnN0IGRvY3VtZW50ID0gZG9taW5vLmNyZWF0ZURvY3VtZW50KCk7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGRvY3VtZW50LCAnYmFzZVVSSScsIHsgdmFsdWU6IGJhc2VVcmkgfSk7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGRvY3VtZW50LCAnVVJMJywge1xuICAgICAgdmFsdWU6IGAke3JlcS5wcm90b2NvbH06Ly8ke3JlcS5oZWFkZXJzLmhvc3R9JHtyZXEub3JpZ2luYWxVcmx9YFxuICAgIH0pO1xuICAgIGNvbnN0IHJvb3RzID0gYXdhaXQgc2VydmVyTWFpbihkb2N1bWVudCwgcmVxLnVybCk7XG4gICAgaWYgKCFBcnJheS5pc0FycmF5KHJvb3RzKSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICBgU0VSVkVSOiBSZW5kZXIgbWV0aG9kIG9mICcke1xuICAgICAgICAgIHJlcS51cmxcbiAgICAgICAgfScgc2hvdWxkIGhhdmUgcmV0dXJuZWQgYSBwcm9taXNlIHdoaWNoIHJlc29sdmVzIHdoZW4gRE9NIGlzIHJlYWR5IGZvciBzZXJpYWxpemF0aW9uLmBcbiAgICAgICk7XG4gICAgfVxuICAgIHNlcmlhbGl6ZVN0YXRlKGRvY3VtZW50KTtcbiAgICBjb25zdCBodG1sID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignaHRtbCcpITtcbiAgICByZXMuc2VuZChodG1sLm91dGVySFRNTCk7XG4gIH07XG59XG5cbm1haW4oX19kaXJuYW1lLCBwcm9jZXNzKS50aGVuKCgpID0+IHtcbiAgY29uc29sZS5sb2coJ1NlcnZpbmcgLi4uJyk7XG59KTtcbiJdfQ==