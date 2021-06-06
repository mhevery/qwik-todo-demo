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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
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
var commander_1 = __importDefault(require("commander"));
var domino_1 = __importDefault(require("domino"));
var express_1 = __importDefault(require("express"));
var fs = __importStar(require("fs"));
var path_1 = require("path");
var source_map_support_1 = __importDefault(require("source-map-support"));
var url_1 = require("url");
var qwik_1 = require("qwik");
var fs_util_js_1 = require("./fs_util.js");
source_map_support_1.default.install();
function main(__dirname, process) {
    return __awaiter(this, void 0, void 0, function () {
        var program, opts, app, RUNFILES, servePaths, qwikBundle, serverIndexJS;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log('===================================================');
                    console.log('Starting:', __dirname);
                    console.log('Node Version:', process.version);
                    program = commander_1.default.program;
                    program
                        .version('0.0.1')
                        .option('-p --port <port>', 'HTTP port to serve from', parseInt, 8080)
                        .option('-r --root <path...>', 'List of roots to serve from', []);
                    program.parse(process.argv);
                    opts = program.opts();
                    console.log(opts);
                    app = express_1.default();
                    RUNFILES = process.env.RUNFILES || '';
                    console.log('RUNFILES', RUNFILES);
                    app.use(function (req, res, next) {
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
                    servePaths = opts.root.map(function (servePath) {
                        return path_1.join(RUNFILES, servePath);
                    });
                    qwikBundle = readBundleContent(servePaths);
                    servePaths.forEach(function (path) {
                        if (fs.existsSync(path)) {
                            console.log('Serve static:', path);
                            app.use('/', express_1.default.static(path));
                        }
                        else {
                            console.log('REJECTING:', path);
                        }
                    });
                    serverIndexJS = [];
                    opts.root.forEach(function (root) {
                        fs_util_js_1.findFiles(path_1.join(RUNFILES, root), 'server_index.js', function (fullPath, fileName, relativePath) {
                            console.log('Found: ', fileName, relativePath, fullPath);
                            serverIndexJS.push({ url: relativePath, path: fullPath });
                        });
                    });
                    // Now search for `server.js`
                    return [4 /*yield*/, Promise.all(serverIndexJS.map(function (indexJS) { return __awaiter(_this, void 0, void 0, function () {
                            var serverMain, baseURI;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        console.log('Importing: ', indexJS.path);
                                        return [4 /*yield*/, Promise.resolve().then(function () { return __importStar(require(indexJS.path)); })];
                                    case 1:
                                        serverMain = (_a.sent()).serverMain;
                                        baseURI = "file://" + indexJS.path;
                                        app.use('/' + indexJS.url, createServerJSHandler(serverMain, baseURI));
                                        return [2 /*return*/];
                                }
                            });
                        }); }))];
                case 1:
                    // Now search for `server.js`
                    _a.sent();
                    app.listen(opts.port);
                    return [2 /*return*/];
            }
        });
    });
}
function readBundleContent(paths) {
    for (var i = 0; i < paths.length; i++) {
        var path = paths[i];
        var qwikPath = path_1.join(path, 'qwik.js');
        var content = fs.readFileSync(qwikPath);
        if (content.length) {
            console.log('Found Qwik bundle:', qwikPath);
            return String(content);
        }
    }
    return null;
}
function createServerJSHandler(serverMain, baseUri) {
    return function serverJSHandler(req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var document, roots, html;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        document = domino_1.default.createDocument();
                        Object.defineProperty(document, 'baseURI', { value: baseUri });
                        Object.defineProperty(document, 'URL', {
                            value: req.protocol + "://" + req.headers.host + req.originalUrl
                        });
                        return [4 /*yield*/, serverMain(document, req.url)];
                    case 1:
                        roots = _a.sent();
                        if (!Array.isArray(roots)) {
                            throw new Error("SERVER: Render method of '" + req.url + "' should have returned a promise which resolves when DOM is ready for serialization.");
                        }
                        qwik_1.serializeState(document);
                        html = document.querySelector('html');
                        res.send(html.outerHTML);
                        return [2 /*return*/];
                }
            });
        });
    };
}
var __dirname = path_1.dirname(url_1.fileURLToPath(import.meta.url));
main(__dirname, process).then(function () {
    console.log('Serving ...');
});
