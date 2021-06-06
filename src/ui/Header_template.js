"use strict";
/**
 * @license
 * Copyright BuilderIO All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/BuilderIO/qwik/blob/main/LICENSE
 */
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports._needed_by_JSX_ = void 0;
var qwik_js_1 = require("../qwik.js");
var Header_component_js_1 = require("./Header_component.js");
exports._needed_by_JSX_ = qwik_js_1.jsxFactory; // eslint-disable-line @typescript-eslint/no-unused-vars
exports.default = qwik_js_1.injectMethod(Header_component_js_1.HeaderComponent, //
function () {
    return (<>
        <h1>todos</h1>
        <input class="new-todo" placeholder="What needs to be done?" autofocus value={this.$state.text} on:keyup={qwik_js_1.QRL(templateObject_1 || (templateObject_1 = __makeTemplateObject(["ui:/Header_addTodo#?value=.target.value&code=.code"], ["ui:/Header_addTodo#?value=.target.value&code=.code"])))}/>
      </>);
});
var templateObject_1;
