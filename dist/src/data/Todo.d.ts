/**
 * @license
 * Copyright BuilderIO All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/BuilderIO/qwik/blob/main/LICENSE
 */
import { QRL, Entity, EntityKey } from '../qwik.js';
import { ItemEntity } from './Item.js';
export interface TodoProps {
}
export interface Todo {
    completed: number;
    filter: 'active' | 'all' | 'completed';
    items: EntityKey<ItemEntity>[];
    nextId: number;
}
export declare class TodoEntity extends Entity<TodoProps, Todo> {
    static $qrl: QRL<ItemEntity>;
    static $type: string;
    static $keyProps: string[];
    static MOCK_USER: EntityKey<TodoEntity>;
    filteredItems: EntityKey<ItemEntity>[];
    archive(): Promise<void>;
    newItem(text: string): Promise<ItemEntity>;
    remove(itemKey: EntityKey<ItemEntity>): Promise<Promise<void>>;
    setFilter(filter: 'active' | 'all' | 'completed'): Promise<void>;
    $init(): Promise<void>;
    $newState(): Promise<Todo>;
}
