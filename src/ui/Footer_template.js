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
exports._needed_by_JSX_ = qwik_js_1.jsxFactory; // eslint-disable-line @typescript-eslint/no-unused-vars
exports.default = qwik_js_1.injectFunction(qwik_js_1.provideEntityState(qwik_js_1.provideComponentProp('$todos')), // TODO(type): fix cast
function FooterTemplate(todos) {
    var remaining = todos.items.length - todos.completed;
    function filterClick(mode) {
        var lMode = mode.toLowerCase();
        return (<li>
          <a class={{ selected: todos.filter == lMode }} on:click={qwik_js_1.QRL(templateObject_1 || (templateObject_1 = __makeTemplateObject(["base:qwik#emitEvent?$type=selectFilter&filter=", ""], ["base:qwik#emitEvent?$type=selectFilter&filter=", ""])), lMode)}>
            {mode}
          </a>
        </li>);
    }
    return (<qwik_js_1.Host class="footer" on:selectFilter={qwik_js_1.QRL(templateObject_2 || (templateObject_2 = __makeTemplateObject(["ui:/Footer_selectFilter"], ["ui:/Footer_selectFilter"])))}>
        {todos.items.length > 0 ? (<>
            <span class="todo-count">
              <strong>{remaining}</strong>
              {remaining == 1 ? ' item' : ' items'} left
            </span>
            <ul class="filters">
              {filterClick('All')}
              {filterClick('Active')}
              {filterClick('Completed')}
            </ul>
            {todos.completed > 0 ? (<button class="clear-completed" on:click={qwik_js_1.QRL(templateObject_3 || (templateObject_3 = __makeTemplateObject(["ui:/Footer_archive"], ["ui:/Footer_archive"])))}>
                Clear completed
              </button>) : null}
          </>) : null}
      </qwik_js_1.Host>);
});
var templateObject_1, templateObject_2, templateObject_3;
