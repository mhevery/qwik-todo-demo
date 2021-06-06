"use strict";
/**
 * @license
 * Copyright BuilderIO All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/BuilderIO/qwik/blob/main/LICENSE
 */
Object.defineProperty(exports, "__esModule", { value: true });
var qwik_js_1 = require("./qwik.js");
qwik_js_1.setConfig({
    baseURI: qwik_js_1.dirname(import.meta.url),
    protocol: {
        ui: './ui',
        data: './data',
        base: '.',
    },
});
