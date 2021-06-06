"use strict";
/**
 * @license
 * Copyright BuilderIO All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/BuilderIO/qwik/blob/main/LICENSE
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.serverMain = exports._needed_by_JSX_ = void 0;
require("./CONFIG.js");
const qwik_js_1 = require("./qwik.js");
const TodoApp_js_1 = require("./ui/TodoApp.js");
exports._needed_by_JSX_ = qwik_js_1.jsxFactory; // eslint-disable-line @typescript-eslint/no-unused-vars
/**
 * Entry point for server-side pre-rendering.
 *
 * @param document
 * @returns a promise when all of the rendering is completed.
 */
async function serverMain(document) {
    const doc = (qwik_js_1.jsxFactory("html", null,
        qwik_js_1.jsxFactory("head", null,
            qwik_js_1.jsxFactory("title", null, "ToDo Application"),
            qwik_js_1.jsxFactory("script", { src: "/qwikloader.min.js", type: "module", events: "click;dblclick;keyup;blur" }),
            qwik_js_1.jsxFactory("script", null, "var Q={protocol:{ui:'./ui',data:'./data',base:'./'}}"),
            qwik_js_1.jsxFactory("link", { rel: "stylesheet", href: "./base.css" }),
            qwik_js_1.jsxFactory("link", { rel: "stylesheet", href: "./index.css" })),
        qwik_js_1.jsxFactory("body", null,
            qwik_js_1.jsxFactory(TodoApp_js_1.ToDoApp, null))));
    return qwik_js_1.jsxRender(document, doc, document);
}
exports.serverMain = serverMain;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VydmVyX2luZGV4LmpzIiwic291cmNlUm9vdCI6Ii4vIiwic291cmNlcyI6WyJzcmMvc2VydmVyX2luZGV4LnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7OztHQU1HOzs7QUFFSCx1QkFBcUI7QUFDckIsdUNBQWtEO0FBQ2xELGdEQUEwQztBQUU3QixRQUFBLGVBQWUsR0FBRyxvQkFBVSxDQUFDLENBQUMsd0RBQXdEO0FBQ25HOzs7OztHQUtHO0FBQ0ksS0FBSyxVQUFVLFVBQVUsQ0FBQyxRQUFrQjtJQUNqRCxNQUFNLEdBQUcsR0FBRyxDQUNWO1FBQ0U7WUFDRSx1REFBK0I7WUFDL0IsaUNBQVEsR0FBRyxFQUFDLG9CQUFvQixFQUFDLElBQUksRUFBQyxRQUFRLEVBQUMsTUFBTSxFQUFDLDJCQUEyQixHQUFVO1lBQzNGLHFDQUFTLHNEQUFzRCxDQUFVO1lBQ3pFLCtCQUFNLEdBQUcsRUFBQyxZQUFZLEVBQUMsSUFBSSxFQUFDLFlBQVksR0FBRztZQUMzQywrQkFBTSxHQUFHLEVBQUMsWUFBWSxFQUFDLElBQUksRUFBQyxhQUFhLEdBQUcsQ0FDdkM7UUFDUDtZQUNFLHFCQUFDLG9CQUFPLE9BQUcsQ0FDTixDQUNGLENBQ1IsQ0FBQztJQUNGLE9BQU8sbUJBQVMsQ0FBQyxRQUFRLEVBQUUsR0FBRyxFQUFFLFFBQVEsQ0FBQyxDQUFDO0FBQzVDLENBQUM7QUFoQkQsZ0NBZ0JDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEJ1aWxkZXJJTyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vZ2l0aHViLmNvbS9CdWlsZGVySU8vcXdpay9ibG9iL21haW4vTElDRU5TRVxuICovXG5cbmltcG9ydCAnLi9DT05GSUcuanMnO1xuaW1wb3J0IHsganN4RmFjdG9yeSwganN4UmVuZGVyIH0gZnJvbSAnLi9xd2lrLmpzJztcbmltcG9ydCB7IFRvRG9BcHAgfSBmcm9tICcuL3VpL1RvZG9BcHAuanMnO1xuXG5leHBvcnQgY29uc3QgX25lZWRlZF9ieV9KU1hfID0ganN4RmFjdG9yeTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tdW51c2VkLXZhcnNcbi8qKlxuICogRW50cnkgcG9pbnQgZm9yIHNlcnZlci1zaWRlIHByZS1yZW5kZXJpbmcuXG4gKlxuICogQHBhcmFtIGRvY3VtZW50XG4gKiBAcmV0dXJucyBhIHByb21pc2Ugd2hlbiBhbGwgb2YgdGhlIHJlbmRlcmluZyBpcyBjb21wbGV0ZWQuXG4gKi9cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBzZXJ2ZXJNYWluKGRvY3VtZW50OiBEb2N1bWVudCkge1xuICBjb25zdCBkb2MgPSAoXG4gICAgPGh0bWw+XG4gICAgICA8aGVhZD5cbiAgICAgICAgPHRpdGxlPlRvRG8gQXBwbGljYXRpb248L3RpdGxlPlxuICAgICAgICA8c2NyaXB0IHNyYz1cIi9xd2lrbG9hZGVyLm1pbi5qc1wiIHR5cGU9XCJtb2R1bGVcIiBldmVudHM9XCJjbGljaztkYmxjbGljaztrZXl1cDtibHVyXCI+PC9zY3JpcHQ+XG4gICAgICAgIDxzY3JpcHQ+e1widmFyIFE9e3Byb3RvY29sOnt1aTonLi91aScsZGF0YTonLi9kYXRhJyxiYXNlOicuLyd9fVwifTwvc2NyaXB0PlxuICAgICAgICA8bGluayByZWw9XCJzdHlsZXNoZWV0XCIgaHJlZj1cIi4vYmFzZS5jc3NcIiAvPlxuICAgICAgICA8bGluayByZWw9XCJzdHlsZXNoZWV0XCIgaHJlZj1cIi4vaW5kZXguY3NzXCIgLz5cbiAgICAgIDwvaGVhZD5cbiAgICAgIDxib2R5PlxuICAgICAgICA8VG9Eb0FwcCAvPlxuICAgICAgPC9ib2R5PlxuICAgIDwvaHRtbD5cbiAgKTtcbiAgcmV0dXJuIGpzeFJlbmRlcihkb2N1bWVudCwgZG9jLCBkb2N1bWVudCk7XG59XG4iXX0=