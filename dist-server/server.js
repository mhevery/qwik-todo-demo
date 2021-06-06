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
const qwik_1 = require("qwik");
const fs_util_js_1 = require("./fs_util.js");
source_map_support_1.default.install();
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
    const RUNFILES = process.env.RUNFILES || '';
    console.log('RUNFILES', RUNFILES);
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
    const qwikBundle = readBundleContent(servePaths);
    servePaths.forEach((path) => {
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
function readBundleContent(paths) {
    for (let i = 0; i < paths.length; i++) {
        const path = paths[i];
        const qwikPath = path_1.join(path, 'qwik.js');
        const content = fs.readFileSync(qwikPath);
        if (content.length) {
            console.log('Found Qwik bundle:', qwikPath);
            return String(content);
        }
    }
    return null;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VydmVyLmpzIiwic291cmNlUm9vdCI6Ii4vIiwic291cmNlcyI6WyJzZXJ2ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7OztHQU1HO0FBQ0gsZ0NBQWdDO0FBQ2hDLDBEQUFrQztBQUNsQyxvREFBNEI7QUFDNUIsc0RBQThCO0FBQzlCLHVDQUF5QjtBQUN6QiwrQkFBcUM7QUFDckMsNEVBQXdDO0FBRXhDLCtCQUFzQztBQUV0Qyw2Q0FBeUM7QUFFekMsNEJBQU0sQ0FBQyxPQUFPLEVBQUUsQ0FBQztBQUVqQixLQUFLLFVBQVUsSUFBSSxDQUFDLFNBQWlCLEVBQUUsT0FBdUI7SUFDNUQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxxREFBcUQsQ0FBQyxDQUFDO0lBQ25FLE9BQU8sQ0FBQyxHQUFHLENBQUMsV0FBVyxFQUFFLFNBQVMsQ0FBQyxDQUFDO0lBQ3BDLE9BQU8sQ0FBQyxHQUFHLENBQUMsZUFBZSxFQUFFLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUU5QyxNQUFNLE9BQU8sR0FBRyxtQkFBUyxDQUFDLE9BQU8sQ0FBQztJQUNsQyxPQUFPO1NBQ0osT0FBTyxDQUFDLE9BQU8sQ0FBQztTQUNoQixNQUFNLENBQUMsa0JBQWtCLEVBQUUseUJBQXlCLEVBQUUsUUFBUSxFQUFFLElBQUksQ0FBQztTQUNyRSxNQUFNLENBQUMscUJBQXFCLEVBQUUsNkJBQTZCLEVBQUUsRUFBUyxDQUFDLENBQUM7SUFFM0UsT0FBTyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDNUIsTUFBTSxJQUFJLEdBQXFDLE9BQU8sQ0FBQyxJQUFJLEVBQVMsQ0FBQztJQUNyRSxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2xCLE1BQU0sR0FBRyxHQUFJLGlCQUFlLEVBQUUsQ0FBQztJQUUvQixNQUFNLFFBQVEsR0FBVyxPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsSUFB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S0FBSyxDQUFDLEVBQUU7WUFDekIsTUFBTSxJQUFJLEtBQUssQ0FDYiw2QkFDRSxHQUFHLENBQUMsR0FDTixzRkFBc0YsQ0FDdkYsQ0FBQztTQUNIO1FBQ0QscUJBQWMsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUN6QixNQUFNLElBQUksR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBRSxDQUFDO1FBQzdDLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQzNCLENBQUMsQ0FBQztBQUNKLENBQUM7QUFFRCxJQUFJLENBQUMsU0FBUyxFQUFFLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUU7SUFDakMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUMsQ0FBQztBQUM3QixDQUFDLENBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBCdWlsZGVySU8gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2dpdGh1Yi5jb20vQnVpbGRlcklPL3F3aWsvYmxvYi9tYWluL0xJQ0VOU0VcbiAqL1xuLyogZXNsaW50IG5vLWNvbnNvbGU6IFtcIm9mZlwiXSAqL1xuaW1wb3J0IGNvbW1hbmRlciBmcm9tICdjb21tYW5kZXInO1xuaW1wb3J0IGRvbWlubyBmcm9tICdkb21pbm8nO1xuaW1wb3J0IGV4cHJlc3MgZnJvbSAnZXhwcmVzcyc7XG5pbXBvcnQgKiBhcyBmcyBmcm9tICdmcyc7XG5pbXBvcnQgeyBkaXJuYW1lLCBqb2luIH0gZnJvbSAncGF0aCc7XG5pbXBvcnQgc3JjTWFwIGZyb20gJ3NvdXJjZS1tYXAtc3VwcG9ydCc7XG5pbXBvcnQgeyBmaWxlVVJMVG9QYXRoIH0gZnJvbSAndXJsJztcbmltcG9ydCB7IHNlcmlhbGl6ZVN0YXRlIH0gZnJvbSAncXdpayc7XG5cbmltcG9ydCB7IGZpbmRGaWxlcyB9IGZyb20gJy4vZnNfdXRpbC5qcyc7XG5cbnNyY01hcC5pbnN0YWxsKCk7XG5cbmFzeW5jIGZ1bmN0aW9uIG1haW4oX19kaXJuYW1lOiBzdHJpbmcsIHByb2Nlc3M6IE5vZGVKUy5Qcm9jZXNzKSB7XG4gIGNvbnNvbGUubG9nKCc9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0nKTtcbiAgY29uc29sZS5sb2coJ1N0YXJ0aW5nOicsIF9fZGlybmFtZSk7XG4gIGNvbnNvbGUubG9nKCdOb2RlIFZlcnNpb246JywgcHJvY2Vzcy52ZXJzaW9uKTtcblxuICBjb25zdCBwcm9ncmFtID0gY29tbWFuZGVyLnByb2dyYW07XG4gIHByb2dyYW1cbiAgICAudmVyc2lvbignMC4wLjEnKVxuICAgIC5vcHRpb24oJy1wIC0tcG9ydCA8cG9ydD4nLCAnSFRUUCBwb3J0IHRvIHNlcnZlIGZyb20nLCBwYXJzZUludCwgODA4MClcbiAgICAub3B0aW9uKCctciAtLXJvb3QgPHBhdGguLi4+JywgJ0xpc3Qgb2Ygcm9vdHMgdG8gc2VydmUgZnJvbScsIFtdIGFzIGFueSk7XG5cbiAgcHJvZ3JhbS5wYXJzZShwcm9jZXNzLmFyZ3YpO1xuICBjb25zdCBvcHRzOiB7IHBvcnQ6IG51bWJlcjsgcm9vdDogc3RyaW5nW10gfSA9IHByb2dyYW0ub3B0cygpIGFzIGFueTtcbiAgY29uc29sZS5sb2cob3B0cyk7XG4gIGNvbnN0IGFwcCA9IChleHByZXNzIGFzIGFueSkoKTtcblxuICBjb25zdCBSVU5GSUxFUzogc3RyaW5nID0gcHJvY2Vzcy5lbnYuUlVORklMRVMgfHwgJyc7XG4gIGNvbnNvbGUubG9nKCdSVU5GSUxFUycsIFJVTkZJTEVTKTtcblxuICBhcHAudXNlKFxuICAgIChcbiAgICAgIHJlcTogZXhwcmVzcy5SZXF1ZXN0LFxuICAgICAgcmVzOiBleHByZXNzLlJlc3BvbnNlLFxuICAgICAgbmV4dDogZXhwcmVzcy5OZXh0RnVuY3Rpb25cbiAgICApID0+IHtcbiAgICAgIGlmIChyZXEucGF0aC5lbmRzV2l0aCgnL3F3aWsuanMnKSAmJiByZXEucGF0aCAhPT0gJy9xd2lrLmpzJykge1xuICAgICAgICByZXMudHlwZSgnYXBwbGljYXRpb24vamF2YXNjcmlwdCcpO1xuICAgICAgICBpZiAocXdpa0J1bmRsZSkge1xuICAgICAgICAgIHJlcy53cml0ZShxd2lrQnVuZGxlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXMud3JpdGUoXCJleHBvcnQgKiBmcm9tICcvcXdpay5qcyc7XCIpO1xuICAgICAgICB9XG4gICAgICAgIHJlcy5lbmQoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG5leHQoKTtcbiAgICAgIH1cbiAgICB9XG4gICk7XG5cbiAgLy8gU2V0IHVwIHN0YXRpYyByb3V0ZXMgZmlyc3RcbiAgY29uc3Qgc2VydmVQYXRocyA9IG9wdHMucm9vdC5tYXAoKHNlcnZlUGF0aDogc3RyaW5nKSA9PlxuICAgIGpvaW4oUlVORklMRVMsIHNlcnZlUGF0aClcbiAgKTtcbiAgY29uc3QgcXdpa0J1bmRsZSA9IHJlYWRCdW5kbGVDb250ZW50KHNlcnZlUGF0aHMpO1xuXG4gIHNlcnZlUGF0aHMuZm9yRWFjaCgocGF0aDogc3RyaW5nKSA9PiB7XG4gICAgaWYgKGZzLmV4aXN0c1N5bmMocGF0aCkpIHtcbiAgICAgIGNvbnNvbGUubG9nKCdTZXJ2ZSBzdGF0aWM6JywgcGF0aCk7XG4gICAgICBhcHAudXNlKCcvJywgZXhwcmVzcy5zdGF0aWMocGF0aCkpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zb2xlLmxvZygnUkVKRUNUSU5HOicsIHBhdGgpO1xuICAgIH1cbiAgfSk7XG5cbiAgY29uc3Qgc2VydmVySW5kZXhKUzogeyB1cmw6IHN0cmluZzsgcGF0aDogc3RyaW5nIH1bXSA9IFtdO1xuICBvcHRzLnJvb3QuZm9yRWFjaChyb290ID0+IHtcbiAgICBmaW5kRmlsZXMoXG4gICAgICBqb2luKFJVTkZJTEVTLCByb290KSxcbiAgICAgICdzZXJ2ZXJfaW5kZXguanMnLFxuICAgICAgKGZ1bGxQYXRoOiBzdHJpbmcsIGZpbGVOYW1lOiBzdHJpbmcsIHJlbGF0aXZlUGF0aDogc3RyaW5nKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdGb3VuZDogJywgZmlsZU5hbWUsIHJlbGF0aXZlUGF0aCwgZnVsbFBhdGgpO1xuICAgICAgICBzZXJ2ZXJJbmRleEpTLnB1c2goeyB1cmw6IHJlbGF0aXZlUGF0aCwgcGF0aDogZnVsbFBhdGggfSk7XG4gICAgICB9XG4gICAgKTtcbiAgfSk7XG5cbiAgLy8gTm93IHNlYXJjaCBmb3IgYHNlcnZlci5qc2BcbiAgYXdhaXQgUHJvbWlzZS5hbGwoXG4gICAgc2VydmVySW5kZXhKUy5tYXAoYXN5bmMgaW5kZXhKUyA9PiB7XG4gICAgICBjb25zb2xlLmxvZygnSW1wb3J0aW5nOiAnLCBpbmRleEpTLnBhdGgpO1xuICAgICAgY29uc3Qgc2VydmVyTWFpbiA9IChhd2FpdCBpbXBvcnQoaW5kZXhKUy5wYXRoKSkuc2VydmVyTWFpbjtcbiAgICAgIGNvbnN0IGJhc2VVUkkgPSBgZmlsZTovLyR7aW5kZXhKUy5wYXRofWA7XG4gICAgICBhcHAudXNlKCcvJyArIGluZGV4SlMudXJsLCBjcmVhdGVTZXJ2ZXJKU0hhbmRsZXIoc2VydmVyTWFpbiwgYmFzZVVSSSkpO1xuICAgIH0pXG4gICk7XG5cbiAgYXBwLmxpc3RlbihvcHRzLnBvcnQpO1xufVxuXG5mdW5jdGlvbiByZWFkQnVuZGxlQ29udGVudChwYXRoczogc3RyaW5nW10pOiBzdHJpbmcgfCBudWxsIHtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBwYXRocy5sZW5ndGg7IGkrKykge1xuICAgIGNvbnN0IHBhdGggPSBwYXRoc1tpXTtcbiAgICBjb25zdCBxd2lrUGF0aCA9IGpvaW4ocGF0aCwgJ3F3aWsuanMnKTtcbiAgICBjb25zdCBjb250ZW50ID0gZnMucmVhZEZpbGVTeW5jKHF3aWtQYXRoKTtcbiAgICBpZiAoY29udGVudC5sZW5ndGgpIHtcbiAgICAgIGNvbnNvbGUubG9nKCdGb3VuZCBRd2lrIGJ1bmRsZTonLCBxd2lrUGF0aCk7XG4gICAgICByZXR1cm4gU3RyaW5nKGNvbnRlbnQpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gbnVsbDtcbn1cblxuZnVuY3Rpb24gY3JlYXRlU2VydmVySlNIYW5kbGVyKFxuICBzZXJ2ZXJNYWluOiAoZG9jOiBEb2N1bWVudCwgdXJsOiBzdHJpbmcpID0+IFByb21pc2U8YW55W10+LFxuICBiYXNlVXJpOiBzdHJpbmdcbikge1xuICByZXR1cm4gYXN5bmMgZnVuY3Rpb24gc2VydmVySlNIYW5kbGVyKFxuICAgIHJlcTogZXhwcmVzcy5SZXF1ZXN0LFxuICAgIHJlczogZXhwcmVzcy5SZXNwb25zZVxuICApIHtcbiAgICBjb25zdCBkb2N1bWVudCA9IGRvbWluby5jcmVhdGVEb2N1bWVudCgpO1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShkb2N1bWVudCwgJ2Jhc2VVUkknLCB7IHZhbHVlOiBiYXNlVXJpIH0pO1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShkb2N1bWVudCwgJ1VSTCcsIHtcbiAgICAgIHZhbHVlOiBgJHtyZXEucHJvdG9jb2x9Oi8vJHtyZXEuaGVhZGVycy5ob3N0fSR7cmVxLm9yaWdpbmFsVXJsfWBcbiAgICB9KTtcbiAgICBjb25zdCByb290cyA9IGF3YWl0IHNlcnZlck1haW4oZG9jdW1lbnQsIHJlcS51cmwpO1xuICAgIGlmICghQXJyYXkuaXNBcnJheShyb290cykpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgYFNFUlZFUjogUmVuZGVyIG1ldGhvZCBvZiAnJHtcbiAgICAgICAgICByZXEudXJsXG4gICAgICAgIH0nIHNob3VsZCBoYXZlIHJldHVybmVkIGEgcHJvbWlzZSB3aGljaCByZXNvbHZlcyB3aGVuIERPTSBpcyByZWFkeSBmb3Igc2VyaWFsaXphdGlvbi5gXG4gICAgICApO1xuICAgIH1cbiAgICBzZXJpYWxpemVTdGF0ZShkb2N1bWVudCk7XG4gICAgY29uc3QgaHRtbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2h0bWwnKSE7XG4gICAgcmVzLnNlbmQoaHRtbC5vdXRlckhUTUwpO1xuICB9O1xufVxuXG5tYWluKF9fZGlybmFtZSwgcHJvY2VzcykudGhlbigoKSA9PiB7XG4gIGNvbnNvbGUubG9nKCdTZXJ2aW5nIC4uLicpO1xufSk7XG4iXX0=