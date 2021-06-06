"use strict";
/**
 * @license
 * Copyright BuilderIO All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/BuilderIO/qwik/blob/main/LICENSE
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports._needed_by_JSX_ = void 0;
var Item_js_1 = require("../data/Item.js");
var Todo_js_1 = require("../data/Todo.js");
var qwik_js_1 = require("../qwik.js");
var Footer_js_1 = require("./Footer.js");
var Header_js_1 = require("./Header.js");
var Main_js_1 = require("./Main.js");
exports._needed_by_JSX_ = qwik_js_1.jsxFactory; // eslint-disable-line @typescript-eslint/no-unused-vars
exports.default = qwik_js_1.injectFunction(function () {
    return (<section class="todoapp" decl:entity={[Todo_js_1.TodoEntity, Item_js_1.ItemEntity]}>
      <Header_js_1.Header />
      <Main_js_1.Main $todos={Todo_js_1.TodoEntity.MOCK_USER}/>
      <Footer_js_1.Footer $todos={Todo_js_1.TodoEntity.MOCK_USER}/>
    </section>);
});
