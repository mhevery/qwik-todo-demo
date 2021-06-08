/**
 * @license
 * Copyright BuilderIO All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/BuilderIO/qwik/blob/main/LICENSE
 */

import { dirname, setConfig } from '@builder.io/qwik';

setConfig({
  baseURI: 'file://' + __dirname + '/',
  protocol: {
    ui: './ui',
    data: './data',
    base: '.'
  }
});
