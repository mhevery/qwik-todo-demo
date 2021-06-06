/**
 * @license
 * Copyright BuilderIO All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/BuilderIO/qwik/blob/main/LICENSE
 */
import './CONFIG.js';
import { jsxFactory } from './qwik.js';
export declare const _needed_by_JSX_: typeof jsxFactory;
/**
 * Entry point for server-side pre-rendering.
 *
 * @param document
 * @returns a promise when all of the rendering is completed.
 */
export declare function serverMain(document: Document): Promise<import("./qwik.js").HostElements>;
