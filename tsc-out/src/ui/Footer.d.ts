/**
 * @license
 * Copyright BuilderIO All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/BuilderIO/qwik/blob/main/LICENSE
 */
import { TodoEntity } from '../data/Todo.js';
import { EntityKey } from '../qwik.js';
/**
 * @fileoverview
 *
 */
export interface FooterProps {
    $todos: EntityKey<TodoEntity>;
}
export declare const Footer: (props: FooterProps & import("../qwik.js").JSXBase) => import("../qwik.js").JSXNode<string>;
