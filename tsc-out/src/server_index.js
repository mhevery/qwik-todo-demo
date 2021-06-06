/**
 * @license
 * Copyright BuilderIO All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/BuilderIO/qwik/blob/main/LICENSE
 */
import './CONFIG.js';
import { jsxFactory, jsxRender } from './qwik.js';
import { ToDoApp } from './ui/TodoApp.js';
export const _needed_by_JSX_ = jsxFactory; // eslint-disable-line @typescript-eslint/no-unused-vars
/**
 * Entry point for server-side pre-rendering.
 *
 * @param document
 * @returns a promise when all of the rendering is completed.
 */
export async function serverMain(document) {
    const doc = (jsxFactory("html", null,
        jsxFactory("head", null,
            jsxFactory("title", null, "ToDo Application"),
            jsxFactory("script", { src: "/qwikloader.min.js", type: "module", events: "click;dblclick;keyup;blur" }),
            jsxFactory("script", null, "var Q={protocol:{ui:'./ui',data:'./data',base:'./'}}"),
            jsxFactory("link", { rel: "stylesheet", href: "./base.css" }),
            jsxFactory("link", { rel: "stylesheet", href: "./index.css" })),
        jsxFactory("body", null,
            jsxFactory(ToDoApp, null))));
    return jsxRender(document, doc, document);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VydmVyX2luZGV4LmpzIiwic291cmNlUm9vdCI6Ii4vIiwic291cmNlcyI6WyJzcmMvc2VydmVyX2luZGV4LnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFFSCxPQUFPLGFBQWEsQ0FBQztBQUNyQixPQUFPLEVBQUUsVUFBVSxFQUFFLFNBQVMsRUFBRSxNQUFNLFdBQVcsQ0FBQztBQUNsRCxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFFMUMsTUFBTSxDQUFDLE1BQU0sZUFBZSxHQUFHLFVBQVUsQ0FBQyxDQUFDLHdEQUF3RDtBQUNuRzs7Ozs7R0FLRztBQUNILE1BQU0sQ0FBQyxLQUFLLFVBQVUsVUFBVSxDQUFDLFFBQWtCO0lBQ2pELE1BQU0sR0FBRyxHQUFHLENBQ1Y7UUFDRTtZQUNFLDZDQUErQjtZQUMvQix1QkFBUSxHQUFHLEVBQUMsb0JBQW9CLEVBQUMsSUFBSSxFQUFDLFFBQVEsRUFBQyxNQUFNLEVBQUMsMkJBQTJCLEdBQVU7WUFDM0YsMkJBQVMsc0RBQXNELENBQVU7WUFDekUscUJBQU0sR0FBRyxFQUFDLFlBQVksRUFBQyxJQUFJLEVBQUMsWUFBWSxHQUFHO1lBQzNDLHFCQUFNLEdBQUcsRUFBQyxZQUFZLEVBQUMsSUFBSSxFQUFDLGFBQWEsR0FBRyxDQUN2QztRQUNQO1lBQ0UsV0FBQyxPQUFPLE9BQUcsQ0FDTixDQUNGLENBQ1IsQ0FBQztJQUNGLE9BQU8sU0FBUyxDQUFDLFFBQVEsRUFBRSxHQUFHLEVBQUUsUUFBUSxDQUFDLENBQUM7QUFDNUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBCdWlsZGVySU8gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2dpdGh1Yi5jb20vQnVpbGRlcklPL3F3aWsvYmxvYi9tYWluL0xJQ0VOU0VcbiAqL1xuXG5pbXBvcnQgJy4vQ09ORklHLmpzJztcbmltcG9ydCB7IGpzeEZhY3RvcnksIGpzeFJlbmRlciB9IGZyb20gJy4vcXdpay5qcyc7XG5pbXBvcnQgeyBUb0RvQXBwIH0gZnJvbSAnLi91aS9Ub2RvQXBwLmpzJztcblxuZXhwb3J0IGNvbnN0IF9uZWVkZWRfYnlfSlNYXyA9IGpzeEZhY3Rvcnk7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLXVudXNlZC12YXJzXG4vKipcbiAqIEVudHJ5IHBvaW50IGZvciBzZXJ2ZXItc2lkZSBwcmUtcmVuZGVyaW5nLlxuICpcbiAqIEBwYXJhbSBkb2N1bWVudFxuICogQHJldHVybnMgYSBwcm9taXNlIHdoZW4gYWxsIG9mIHRoZSByZW5kZXJpbmcgaXMgY29tcGxldGVkLlxuICovXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gc2VydmVyTWFpbihkb2N1bWVudDogRG9jdW1lbnQpIHtcbiAgY29uc3QgZG9jID0gKFxuICAgIDxodG1sPlxuICAgICAgPGhlYWQ+XG4gICAgICAgIDx0aXRsZT5Ub0RvIEFwcGxpY2F0aW9uPC90aXRsZT5cbiAgICAgICAgPHNjcmlwdCBzcmM9XCIvcXdpa2xvYWRlci5taW4uanNcIiB0eXBlPVwibW9kdWxlXCIgZXZlbnRzPVwiY2xpY2s7ZGJsY2xpY2s7a2V5dXA7Ymx1clwiPjwvc2NyaXB0PlxuICAgICAgICA8c2NyaXB0PntcInZhciBRPXtwcm90b2NvbDp7dWk6Jy4vdWknLGRhdGE6Jy4vZGF0YScsYmFzZTonLi8nfX1cIn08L3NjcmlwdD5cbiAgICAgICAgPGxpbmsgcmVsPVwic3R5bGVzaGVldFwiIGhyZWY9XCIuL2Jhc2UuY3NzXCIgLz5cbiAgICAgICAgPGxpbmsgcmVsPVwic3R5bGVzaGVldFwiIGhyZWY9XCIuL2luZGV4LmNzc1wiIC8+XG4gICAgICA8L2hlYWQ+XG4gICAgICA8Ym9keT5cbiAgICAgICAgPFRvRG9BcHAgLz5cbiAgICAgIDwvYm9keT5cbiAgICA8L2h0bWw+XG4gICk7XG4gIHJldHVybiBqc3hSZW5kZXIoZG9jdW1lbnQsIGRvYywgZG9jdW1lbnQpO1xufVxuIl19