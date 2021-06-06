/**
 * @license
 * Copyright BuilderIO All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/BuilderIO/qwik/blob/main/LICENSE
 */
export declare function findFiles(baseDir: string, pattern: string | RegExp, fn: (fullPath: string, filename: string, relativePath: string) => void, relativeDir?: string): void;
