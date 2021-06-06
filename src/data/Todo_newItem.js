"use strict";
/**
 * @license
 * Copyright BuilderIO All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/BuilderIO/qwik/blob/main/LICENSE
 */
Object.defineProperty(exports, "__esModule", { value: true });
var qwik_js_1 = require("../qwik.js");
var Item_js_1 = require("./Item.js");
var Todo_js_1 = require("./Todo.js");
exports.default = qwik_js_1.injectMethod(Todo_js_1.TodoEntity, //
function newItem(newTitle) {
    var itemEntity = Item_js_1.ItemEntity.$hydrate(this.$element, { id: String(this.$state.nextId++) }, { completed: false, title: newTitle });
    this.$state.items.push(itemEntity.$key);
    this.setFilter(this.$state.filter);
    qwik_js_1.markDirty(this);
    return itemEntity;
});
