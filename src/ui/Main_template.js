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
var qwik_js_1 = require("../qwik.js");
var Item_js_1 = require("./Item.js");
// TODO(file_layout): Rework the file layout. I think it should be in same directory as loading `template.ts` looks weird
// - Main.ts // public.ts
// - Main_template.ts // template.ts
// - Main_action.ts // action.ts
exports._needed_by_JSX_ = qwik_js_1.jsxFactory; // eslint-disable-line @typescript-eslint/no-unused-vars
exports.default = qwik_js_1.injectFunction(qwik_js_1.provideEntity(qwik_js_1.provideComponentProp('$todos')), // TODO(type):
function (todoEntity) {
    var itemKeys = todoEntity.filteredItems;
    return (<qwik_js_1.Host class="main" /* TODO *ngIf="todoStore.todos.length > 0 " */>
        <input id="toggle-all" class="toggle-all" type="checkbox"/>
        <ul class="todo-list">
          {itemKeys.map(function (key) { return (<Item_js_1.Item $item={key}/>); })}
        </ul>
      </qwik_js_1.Host>);
});
/* // TODO: Create QFor and QIf directive?
  <Q for="todos.value" do={(todo) => <Item $item={todo} />} />
  <Q if="todos.value.length > 0" then={(value) => <section></section>} />
*/
