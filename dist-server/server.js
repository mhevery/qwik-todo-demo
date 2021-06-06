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
const source_map_support_1 = __importDefault(require("source-map-support"));
const qwik_1 = require("@builder.io/qwik");
const fs_util_js_1 = require("./fs_util.js");
source_map_support_1.default.install();
const RUNFILES = '.';
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
    const servePaths = opts.root.map((servePath) => path_1.join(RUNFILES, servePath));
    const qwikBundle = String(fs.readFileSync('./node_modules/@builder.io/qwik/qwik.js'));
    console.log('A', servePaths);
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
        fs_util_js_1.findFiles(path_1.join(RUNFILES, root), 'server_index.js', (fullPath, fileName, relativePath) => {
            console.log('Found: ', fileName, relativePath, fullPath);
            serverIndexJS.push({ url: relativePath, path: fullPath });
        });
    });
    // Now search for `server.js`
    await Promise.all(serverIndexJS.map(async (indexJS) => {
        console.log('Importing: ', indexJS.path);
        const serverMain = (await Promise.resolve().then(() => __importStar(require(indexJS.path)))).serverMain;
        const baseURI = `file://${indexJS.path}`;
        app.use('/' + indexJS.url, createServerJSHandler(serverMain, baseURI));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VydmVyLmpzIiwic291cmNlUm9vdCI6Ii4vIiwic291cmNlcyI6WyJzZXJ2ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7OztHQU1HO0FBQ0gsZ0NBQWdDO0FBQ2hDLDBEQUFrQztBQUNsQyxvREFBNEI7QUFDNUIsc0RBQThCO0FBQzlCLHVDQUF5QjtBQUN6QiwrQkFBcUM7QUFDckMsNEVBQXdDO0FBRXhDLDJDQUFrRDtBQUVsRCw2Q0FBeUM7QUFFekMsNEJBQU0sQ0FBQyxPQUFPLEVBQUUsQ0FBQztBQUNqQixNQUFNLFFBQVEsR0FBRyxHQUFHLENBQUM7QUFFckIsS0FBSyxVQUFVLElBQUksQ0FBQyxTQUFpQixFQUFFLE9BQXVCO0lBQzVELE9BQU8sQ0FBQyxHQUFHLENBQUMscURBQXFELENBQUMsQ0FBQztJQUNuRSxPQUFPLENBQUMsR0FBRyxDQUFDLFdBQVcsRUFBRSxTQUFTLENBQUMsQ0FBQztJQUNwQyxPQUFPLENBQUMsR0FBRyxDQUFDLGVBQWUsRUFBRSxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7SUFFOUMsTUFBTSxPQUFPLEdBQUcsbUJBQVMsQ0FBQyxPQUFPLENBQUM7SUFDbEMsT0FBTztTQUNKLE9BQU8sQ0FBQyxPQUFPLENBQUM7U0FDaEIsTUFBTSxDQUFDLGtCQUFrQixFQUFFLHlCQUF5QixFQUFFLFFBQVEsRUFBRSxJQUFJLENBQUM7U0FDckUsTUFBTSxDQUFDLHFCQUFxQixFQUFFLDZCQUE2QixFQUFFLEVBQVMsQ0FBQyxDQUFDO0lBRTNFLE9BQU8sQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzVCLE1BQU0sSUFBSSxHQUFxQyxPQUFPLENBQUMsSUFBSSxFQUFTLENBQUM7SUFDckUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNsQixNQUFNLEdBQUcsR0FBSSxpQkFBZSxFQUFFLENBQUM7SUFFL0IsR0FBRyxDQUFDLEdB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Ii8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBCdWlsZGVySU8gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2dpdGh1Yi5jb20vQnVpbGRlcklPL3F3aWsvYmxvYi9tYWluL0xJQ0VOU0VcbiAqL1xuLyogZXNsaW50IG5vLWNvbnNvbGU6IFtcIm9mZlwiXSAqL1xuaW1wb3J0IGNvbW1hbmRlciBmcm9tICdjb21tYW5kZXInO1xuaW1wb3J0IGRvbWlubyBmcm9tICdkb21pbm8nO1xuaW1wb3J0IGV4cHJlc3MgZnJvbSAnZXhwcmVzcyc7XG5pbXBvcnQgKiBhcyBmcyBmcm9tICdmcyc7XG5pbXBvcnQgeyBkaXJuYW1lLCBqb2luIH0gZnJvbSAncGF0aCc7XG5pbXBvcnQgc3JjTWFwIGZyb20gJ3NvdXJjZS1tYXAtc3VwcG9ydCc7XG5pbXBvcnQgeyBmaWxlVVJMVG9QYXRoIH0gZnJvbSAndXJsJztcbmltcG9ydCB7IHNlcmlhbGl6ZVN0YXRlIH0gZnJvbSAnQGJ1aWxkZXIuaW8vcXdpayc7XG5cbmltcG9ydCB7IGZpbmRGaWxlcyB9IGZyb20gJy4vZnNfdXRpbC5qcyc7XG5cbnNyY01hcC5pbnN0YWxsKCk7XG5jb25zdCBSVU5GSUxFUyA9ICcuJztcblxuYXN5bmMgZnVuY3Rpb24gbWFpbihfX2Rpcm5hbWU6IHN0cmluZywgcHJvY2VzczogTm9kZUpTLlByb2Nlc3MpIHtcbiAgY29uc29sZS5sb2coJz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PScpO1xuICBjb25zb2xlLmxvZygnU3RhcnRpbmc6JywgX19kaXJuYW1lKTtcbiAgY29uc29sZS5sb2coJ05vZGUgVmVyc2lvbjonLCBwcm9jZXNzLnZlcnNpb24pO1xuXG4gIGNvbnN0IHByb2dyYW0gPSBjb21tYW5kZXIucHJvZ3JhbTtcbiAgcHJvZ3JhbVxuICAgIC52ZXJzaW9uKCcwLjAuMScpXG4gICAgLm9wdGlvbignLXAgLS1wb3J0IDxwb3J0PicsICdIVFRQIHBvcnQgdG8gc2VydmUgZnJvbScsIHBhcnNlSW50LCA4MDgwKVxuICAgIC5vcHRpb24oJy1yIC0tcm9vdCA8cGF0aC4uLj4nLCAnTGlzdCBvZiByb290cyB0byBzZXJ2ZSBmcm9tJywgW10gYXMgYW55KTtcblxuICBwcm9ncmFtLnBhcnNlKHByb2Nlc3MuYXJndik7XG4gIGNvbnN0IG9wdHM6IHsgcG9ydDogbnVtYmVyOyByb290OiBzdHJpbmdbXSB9ID0gcHJvZ3JhbS5vcHRzKCkgYXMgYW55O1xuICBjb25zb2xlLmxvZyhvcHRzKTtcbiAgY29uc3QgYXBwID0gKGV4cHJlc3MgYXMgYW55KSgpO1xuXG4gIGFwcC51c2UoXG4gICAgKFxuICAgICAgcmVxOiBleHByZXNzLlJlcXVlc3QsXG4gICAgICByZXM6IGV4cHJlc3MuUmVzcG9uc2UsXG4gICAgICBuZXh0OiBleHByZXNzLk5leHRGdW5jdGlvblxuICAgICkgPT4ge1xuICAgICAgaWYgKHJlcS5wYXRoLmVuZHNXaXRoKCcvcXdpay5qcycpICYmIHJlcS5wYXRoICE9PSAnL3F3aWsuanMnKSB7XG4gICAgICAgIHJlcy50eXBlKCdhcHBsaWNhdGlvbi9qYXZhc2NyaXB0Jyk7XG4gICAgICAgIGlmIChxd2lrQnVuZGxlKSB7XG4gICAgICAgICAgcmVzLndyaXRlKHF3aWtCdW5kbGUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJlcy53cml0ZShcImV4cG9ydCAqIGZyb20gJy9xd2lrLmpzJztcIik7XG4gICAgICAgIH1cbiAgICAgICAgcmVzLmVuZCgpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbmV4dCgpO1xuICAgICAgfVxuICAgIH1cbiAgKTtcblxuICAvLyBTZXQgdXAgc3RhdGljIHJvdXRlcyBmaXJzdFxuICBjb25zdCBzZXJ2ZVBhdGhzID0gb3B0cy5yb290Lm1hcCgoc2VydmVQYXRoOiBzdHJpbmcpID0+XG4gICAgam9pbihSVU5GSUxFUywgc2VydmVQYXRoKVxuICApO1xuICBjb25zdCBxd2lrQnVuZGxlID0gU3RyaW5nKFxuICAgIGZzLnJlYWRGaWxlU3luYygnLi9ub2RlX21vZHVsZXMvQGJ1aWxkZXIuaW8vcXdpay9xd2lrLmpzJylcbiAgKTtcblxuICBjb25zb2xlLmxvZygnQScsIHNlcnZlUGF0aHMpO1xuICBzZXJ2ZVBhdGhzLmZvckVhY2goKHBhdGg6IHN0cmluZykgPT4ge1xuICAgIGNvbnNvbGUubG9nKHBhdGgpO1xuICAgIGlmIChmcy5leGlzdHNTeW5jKHBhdGgpKSB7XG4gICAgICBjb25zb2xlLmxvZygnU2VydmUgc3RhdGljOicsIHBhdGgpO1xuICAgICAgYXBwLnVzZSgnLycsIGV4cHJlc3Muc3RhdGljKHBhdGgpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc29sZS5sb2coJ1JFSkVDVElORzonLCBwYXRoKTtcbiAgICB9XG4gIH0pO1xuXG4gIGNvbnN0IHNlcnZlckluZGV4SlM6IHsgdXJsOiBzdHJpbmc7IHBhdGg6IHN0cmluZyB9W10gPSBbXTtcbiAgb3B0cy5yb290LmZvckVhY2gocm9vdCA9PiB7XG4gICAgZmluZEZpbGVzKFxuICAgICAgam9pbihSVU5GSUxFUywgcm9vdCksXG4gICAgICAnc2VydmVyX2luZGV4LmpzJyxcbiAgICAgIChmdWxsUGF0aDogc3RyaW5nLCBmaWxlTmFtZTogc3RyaW5nLCByZWxhdGl2ZVBhdGg6IHN0cmluZykgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZygnRm91bmQ6ICcsIGZpbGVOYW1lLCByZWxhdGl2ZVBhdGgsIGZ1bGxQYXRoKTtcbiAgICAgICAgc2VydmVySW5kZXhKUy5wdXNoKHsgdXJsOiByZWxhdGl2ZVBhdGgsIHBhdGg6IGZ1bGxQYXRoIH0pO1xuICAgICAgfVxuICAgICk7XG4gIH0pO1xuXG4gIC8vIE5vdyBzZWFyY2ggZm9yIGBzZXJ2ZXIuanNgXG4gIGF3YWl0IFByb21pc2UuYWxsKFxuICAgIHNlcnZlckluZGV4SlMubWFwKGFzeW5jIGluZGV4SlMgPT4ge1xuICAgICAgY29uc29sZS5sb2coJ0ltcG9ydGluZzogJywgaW5kZXhKUy5wYXRoKTtcbiAgICAgIGNvbnN0IHNlcnZlck1haW4gPSAoYXdhaXQgaW1wb3J0KGluZGV4SlMucGF0aCkpLnNlcnZlck1haW47XG4gICAgICBjb25zdCBiYXNlVVJJID0gYGZpbGU6Ly8ke2luZGV4SlMucGF0aH1gO1xuICAgICAgYXBwLnVzZSgnLycgKyBpbmRleEpTLnVybCwgY3JlYXRlU2VydmVySlNIYW5kbGVyKHNlcnZlck1haW4sIGJhc2VVUkkpKTtcbiAgICB9KVxuICApO1xuXG4gIGFwcC5saXN0ZW4ob3B0cy5wb3J0KTtcbn1cblxuZnVuY3Rpb24gY3JlYXRlU2VydmVySlNIYW5kbGVyKFxuICBzZXJ2ZXJNYWluOiAoZG9jOiBEb2N1bWVudCwgdXJsOiBzdHJpbmcpID0+IFByb21pc2U8YW55W10+LFxuICBiYXNlVXJpOiBzdHJpbmdcbikge1xuICByZXR1cm4gYXN5bmMgZnVuY3Rpb24gc2VydmVySlNIYW5kbGVyKFxuICAgIHJlcTogZXhwcmVzcy5SZXF1ZXN0LFxuICAgIHJlczogZXhwcmVzcy5SZXNwb25zZVxuICApIHtcbiAgICBjb25zdCBkb2N1bWVudCA9IGRvbWluby5jcmVhdGVEb2N1bWVudCgpO1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShkb2N1bWVudCwgJ2Jhc2VVUkknLCB7IHZhbHVlOiBiYXNlVXJpIH0pO1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShkb2N1bWVudCwgJ1VSTCcsIHtcbiAgICAgIHZhbHVlOiBgJHtyZXEucHJvdG9jb2x9Oi8vJHtyZXEuaGVhZGVycy5ob3N0fSR7cmVxLm9yaWdpbmFsVXJsfWBcbiAgICB9KTtcbiAgICBjb25zdCByb290cyA9IGF3YWl0IHNlcnZlck1haW4oZG9jdW1lbnQsIHJlcS51cmwpO1xuICAgIGlmICghQXJyYXkuaXNBcnJheShyb290cykpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgYFNFUlZFUjogUmVuZGVyIG1ldGhvZCBvZiAnJHtcbiAgICAgICAgICByZXEudXJsXG4gICAgICAgIH0nIHNob3VsZCBoYXZlIHJldHVybmVkIGEgcHJvbWlzZSB3aGljaCByZXNvbHZlcyB3aGVuIERPTSBpcyByZWFkeSBmb3Igc2VyaWFsaXphdGlvbi5gXG4gICAgICApO1xuICAgIH1cbiAgICBzZXJpYWxpemVTdGF0ZShkb2N1bWVudCk7XG4gICAgY29uc3QgaHRtbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2h0bWwnKSE7XG4gICAgcmVzLnNlbmQoaHRtbC5vdXRlckhUTUwpO1xuICB9O1xufVxuXG5tYWluKF9fZGlybmFtZSwgcHJvY2VzcykudGhlbigoKSA9PiB7XG4gIGNvbnNvbGUubG9nKCdTZXJ2aW5nIC4uLicpO1xufSk7XG4iXX0=