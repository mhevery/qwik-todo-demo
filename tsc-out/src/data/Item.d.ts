/**
 * @license
 * Copyright BuilderIO All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/BuilderIO/qwik/blob/main/LICENSE
 */
import { QRL, Entity } from '../qwik.js';
export interface ItemProps {
    id: string;
}
export interface Item {
    completed: boolean;
    title: string;
}
export declare class ItemEntity extends Entity<ItemProps, Item> {
    static $type: string;
    static $qrl: QRL<ItemEntity>;
    static $keyProps: string[];
    toggle(isCompleted: boolean): Promise<void>;
}
