/**
 * @license
 * Copyright BuilderIO All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/BuilderIO/qwik/blob/main/LICENSE
 */
import { ItemEntity } from '../data/Item.js';
import { Provider } from '../qwik.js';
import { ItemComponent } from './Item_component.js';
export declare const begin: import("../qwik.js").EventHandler<ItemComponent, [], Promise<void>>;
export declare const change: import("../qwik.js").EventHandler<ItemComponent, [Provider<string>, Provider<string>, Provider<ItemEntity>], Promise<void>>;
export declare const end: import("../qwik.js").EventHandler<ItemComponent, [], Promise<void>>;
