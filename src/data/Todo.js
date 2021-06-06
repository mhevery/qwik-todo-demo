"use strict";
/**
 * @license
 * Copyright BuilderIO All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/BuilderIO/qwik/blob/main/LICENSE
 */
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodoEntity = void 0;
var qwik_js_1 = require("../qwik.js");
var Item_js_1 = require("./Item.js");
var TodoEntity = /** @class */ (function (_super) {
    __extends(TodoEntity, _super);
    function TodoEntity() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.filteredItems = [];
        return _this;
    }
    TodoEntity.prototype.archive = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.$invokeQRL(qwik_js_1.QRL(templateObject_1 || (templateObject_1 = __makeTemplateObject(["data:/Todo_archive"], ["data:/Todo_archive"]))))];
            });
        });
    };
    TodoEntity.prototype.newItem = function (text) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.$invokeQRL(qwik_js_1.QRL(templateObject_2 || (templateObject_2 = __makeTemplateObject(["data:/Todo_newItem"], ["data:/Todo_newItem"]))), text)];
            });
        });
    };
    TodoEntity.prototype.remove = function (itemKey) {
        return this.$invokeQRL(qwik_js_1.QRL(templateObject_3 || (templateObject_3 = __makeTemplateObject(["data:/Todo_removeItem"], ["data:/Todo_removeItem"]))), itemKey);
    };
    TodoEntity.prototype.setFilter = function (filter) {
        return __awaiter(this, void 0, void 0, function () {
            var injector, itemStatePromises, items;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        injector = qwik_js_1.getInjector(this.$element);
                        itemStatePromises = this.$state.items.map(function (itemKey) {
                            return injector.getEntityState(itemKey);
                        });
                        return [4 /*yield*/, Promise.all(itemStatePromises)];
                    case 1:
                        items = _a.sent();
                        this.filteredItems = items
                            .filter({
                            all: function () { return true; },
                            active: function (item) { return !item.completed; },
                            completed: function (item) { return item.completed; },
                        }[filter])
                            .map(qwik_js_1.entityStateKey); // TODO(type): fix cast
                        this.$state.filter = filter;
                        qwik_js_1.markDirty(this);
                        return [2 /*return*/];
                }
            });
        });
    };
    TodoEntity.prototype.$init = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.filteredItems = this.$state.items;
                return [2 /*return*/];
            });
        });
    };
    TodoEntity.prototype.$newState = function () {
        return __awaiter(this, void 0, void 0, function () {
            var host;
            return __generator(this, function (_a) {
                host = this.$element;
                return [2 /*return*/, {
                        completed: 0,
                        filter: 'all',
                        nextId: 4,
                        items: [
                            Item_js_1.ItemEntity.$hydrate(host, { id: '1' }, { completed: false, title: 'Read Qwik docs' }).$key,
                            Item_js_1.ItemEntity.$hydrate(host, { id: '2' }, { completed: false, title: 'Build HelloWorld' })
                                .$key,
                            Item_js_1.ItemEntity.$hydrate(host, { id: '3' }, { completed: false, title: 'Profit' }).$key,
                        ],
                    }];
            });
        });
    };
    TodoEntity.$qrl = qwik_js_1.QRL(templateObject_4 || (templateObject_4 = __makeTemplateObject(["data:/Todo#TodoEntity"], ["data:/Todo#TodoEntity"])));
    TodoEntity.$type = 'Todos';
    TodoEntity.$keyProps = ['todos'];
    TodoEntity.MOCK_USER = qwik_js_1.toEntityKey('todos:1234');
    return TodoEntity;
}(qwik_js_1.Entity));
exports.TodoEntity = TodoEntity;
var templateObject_1, templateObject_2, templateObject_3, templateObject_4;
