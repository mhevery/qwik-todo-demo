/**
 * @license
 * Copyright BuilderIO All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/BuilderIO/qwik/blob/main/LICENSE
 */
import type { ItemEntity } from '../data/Item.js';
import { EntityKey } from '../qwik.js';
export interface ItemProps {
    $item: EntityKey<ItemEntity>;
}
export declare const Item: (props: ItemProps & import("../qwik.js").JSXBase) => import("../qwik.js").JSXNode<string>;
