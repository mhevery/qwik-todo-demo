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
var Todo_js_1 = require("../data/Todo.js");
exports.default = qwik_js_1.injectEventHandler(
//
null, qwik_js_1.provideEntity(Todo_js_1.TodoEntity.MOCK_USER), qwik_js_1.provideEvent(), function (todos, event) {
    todos.setFilter(event.filter);
});
