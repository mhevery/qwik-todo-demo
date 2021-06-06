/**
 * @license
 * Copyright BuilderIO All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/BuilderIO/qwik/blob/main/LICENSE
 */
import { EntityKey } from '../qwik.js';
import type { TodoEntity } from '../data/Todo.js';
export interface MainProps {
    $todos: EntityKey<TodoEntity>;
}
export declare const Main: (props: MainProps & import("../qwik.js").JSXBase) => import("../qwik.js").JSXNode<string>;
