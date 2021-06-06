"use strict";
/**
 * @license
 * Copyright BuilderIO All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/BuilderIO/qwik/blob/main/LICENSE
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports._needed_by_JSX_ = void 0;
const qwik_js_1 = require("../qwik.js");
exports._needed_by_JSX_ = qwik_js_1.jsxFactory; // eslint-disable-line @typescript-eslint/no-unused-vars
exports.default = qwik_js_1.injectFunction(qwik_js_1.provideEntityState(qwik_js_1.provideComponentProp('$todos')), // TODO(type): fix cast
function FooterTemplate(todos) {
    const remaining = todos.items.length - todos.completed;
    function filterClick(mode) {
        const lMode = mode.toLowerCase();
        return (qwik_js_1.jsxFactory("li", null,
            qwik_js_1.jsxFactory("a", { class: { selected: todos.filter == lMode }, "on:click": qwik_js_1.QRL `base:qwik#emitEvent?$type=selectFilter&filter=${lMode}` }, mode)));
    }
    return (qwik_js_1.jsxFactory(qwik_js_1.Host, { class: "footer", "on:selectFilter": qwik_js_1.QRL `ui:/Footer_selectFilter` }, todos.items.length > 0 ? (qwik_js_1.jsxFactory(null, null,
        qwik_js_1.jsxFactory("span", { class: "todo-count" },
            qwik_js_1.jsxFactory("strong", null, remaining),
            remaining == 1 ? ' item' : ' items',
            " left"),
        qwik_js_1.jsxFactory("ul", { class: "filters" },
            filterClick('All'),
            filterClick('Active'),
            filterClick('Completed')),
        todos.completed > 0 ? (qwik_js_1.jsxFactory("button", { class: "clear-completed", "on:click": qwik_js_1.QRL `ui:/Footer_archive` }, "Clear completed")) : null)) : null));
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRm9vdGVyX3RlbXBsYXRlLmpzIiwic291cmNlUm9vdCI6Ii4vIiwic291cmNlcyI6WyJzcmMvdWkvRm9vdGVyX3RlbXBsYXRlLnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7OztHQU1HOzs7QUFHSCx3Q0FTb0I7QUFFUCxRQUFBLGVBQWUsR0FBRyxvQkFBVSxDQUFDLENBQUMsd0RBQXdEO0FBQ25HLGtCQUFlLHdCQUFjLENBQzNCLDRCQUFrQixDQUNoQiw4QkFBb0IsQ0FBQyxRQUFRLENBQTJDLENBQ3pFLEVBQUUsdUJBQXVCO0FBQzFCLFNBQVMsY0FBYyxDQUFDLEtBQVc7SUFDakMsTUFBTSxTQUFTLEdBQUcsS0FBSyxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDLFNBQVMsQ0FBQztJQUN2RCxTQUFTLFdBQVcsQ0FBQyxJQUFvQztRQUN2RCxNQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDakMsT0FBTyxDQUNMO1lBQ0UsNEJBQ0UsS0FBSyxFQUFFLEVBQUUsUUFBUSxFQUFFLEtBQUssQ0FBQyxNQUFNLElBQUksS0FBSyxFQUFFLGNBQ2hDLGFBQUcsQ0FBQSxpREFBaUQsS0FBSyxFQUFFLElBRXBFLElBQUksQ0FDSCxDQUNELENBQ04sQ0FBQztJQUNKLENBQUM7SUFDRCxPQUFPLENBQ0wscUJBQUMsY0FBSSxJQUFDLEtBQUssRUFBQyxRQUFRLHFCQUFrQixhQUFHLENBQUEseUJBQXlCLElBQy9ELEtBQUssQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FDeEI7UUFDRSwrQkFBTSxLQUFLLEVBQUMsWUFBWTtZQUN0QixxQ0FBUyxTQUFTLENBQVU7WUFDM0IsU0FBUyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxRQUFRO29CQUMvQjtRQUNQLDZCQUFJLEtBQUssRUFBQyxTQUFTO1lBQ2hCLFdBQVcsQ0FBQyxLQUFLLENBQUM7WUFDbEIsV0FBVyxDQUFDLFFBQVEsQ0FBQztZQUNyQixXQUFXLENBQUMsV0FBVyxDQUFDLENBQ3RCO1FBQ0osS0FBSyxDQUFDLFNBQVMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQ3JCLGlDQUFRLEtBQUssRUFBQyxpQkFBaUIsY0FBVyxhQUFHLENBQUEsb0JBQW9CLHNCQUV4RCxDQUNWLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FDUCxDQUNKLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FDSCxDQUNSLENBQUM7QUFDSixDQUFDLENBQ0YsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBCdWlsZGVySU8gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2dpdGh1Yi5jb20vQnVpbGRlcklPL3F3aWsvYmxvYi9tYWluL0xJQ0VOU0VcbiAqL1xuXG5pbXBvcnQgeyBUb2RvLCBUb2RvRW50aXR5IH0gZnJvbSAnLi4vZGF0YS9Ub2RvLmpzJztcbmltcG9ydCB7XG4gIFFSTCxcbiAgaW5qZWN0RnVuY3Rpb24sXG4gIGpzeEZhY3RvcnksXG4gIHByb3ZpZGVDb21wb25lbnRQcm9wLFxuICBwcm92aWRlRW50aXR5U3RhdGUsXG4gIFByb3ZpZGVyLFxuICBFbnRpdHlLZXksXG4gIEhvc3QsXG59IGZyb20gJy4uL3F3aWsuanMnO1xuXG5leHBvcnQgY29uc3QgX25lZWRlZF9ieV9KU1hfID0ganN4RmFjdG9yeTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tdW51c2VkLXZhcnNcbmV4cG9ydCBkZWZhdWx0IGluamVjdEZ1bmN0aW9uKFxuICBwcm92aWRlRW50aXR5U3RhdGU8VG9kb0VudGl0eT4oXG4gICAgcHJvdmlkZUNvbXBvbmVudFByb3AoJyR0b2RvcycpIGFzIGFueSBhcyBQcm92aWRlcjxFbnRpdHlLZXk8VG9kb0VudGl0eT4+XG4gICksIC8vIFRPRE8odHlwZSk6IGZpeCBjYXN0XG4gIGZ1bmN0aW9uIEZvb3RlclRlbXBsYXRlKHRvZG9zOiBUb2RvKSB7XG4gICAgY29uc3QgcmVtYWluaW5nID0gdG9kb3MuaXRlbXMubGVuZ3RoIC0gdG9kb3MuY29tcGxldGVkO1xuICAgIGZ1bmN0aW9uIGZpbHRlckNsaWNrKG1vZGU6ICdBbGwnIHwgJ0FjdGl2ZScgfCAnQ29tcGxldGVkJykge1xuICAgICAgY29uc3QgbE1vZGUgPSBtb2RlLnRvTG93ZXJDYXNlKCk7XG4gICAgICByZXR1cm4gKFxuICAgICAgICA8bGk+XG4gICAgICAgICAgPGFcbiAgICAgICAgICAgIGNsYXNzPXt7IHNlbGVjdGVkOiB0b2Rvcy5maWx0ZXIgPT0gbE1vZGUgfX1cbiAgICAgICAgICAgIG9uOmNsaWNrPXtRUkxgYmFzZTpxd2lrI2VtaXRFdmVudD8kdHlwZT1zZWxlY3RGaWx0ZXImZmlsdGVyPSR7bE1vZGV9YH1cbiAgICAgICAgICA+XG4gICAgICAgICAgICB7bW9kZX1cbiAgICAgICAgICA8L2E+XG4gICAgICAgIDwvbGk+XG4gICAgICApO1xuICAgIH1cbiAgICByZXR1cm4gKFxuICAgICAgPEhvc3QgY2xhc3M9XCJmb290ZXJcIiBvbjpzZWxlY3RGaWx0ZXI9e1FSTGB1aTovRm9vdGVyX3NlbGVjdEZpbHRlcmB9PlxuICAgICAgICB7dG9kb3MuaXRlbXMubGVuZ3RoID4gMCA/IChcbiAgICAgICAgICA8PlxuICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJ0b2RvLWNvdW50XCI+XG4gICAgICAgICAgICAgIDxzdHJvbmc+e3JlbWFpbmluZ308L3N0cm9uZz5cbiAgICAgICAgICAgICAge3JlbWFpbmluZyA9PSAxID8gJyBpdGVtJyA6ICcgaXRlbXMnfSBsZWZ0XG4gICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICA8dWwgY2xhc3M9XCJmaWx0ZXJzXCI+XG4gICAgICAgICAgICAgIHtmaWx0ZXJDbGljaygnQWxsJyl9XG4gICAgICAgICAgICAgIHtmaWx0ZXJDbGljaygnQWN0aXZlJyl9XG4gICAgICAgICAgICAgIHtmaWx0ZXJDbGljaygnQ29tcGxldGVkJyl9XG4gICAgICAgICAgICA8L3VsPlxuICAgICAgICAgICAge3RvZG9zLmNvbXBsZXRlZCA+IDAgPyAoXG4gICAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJjbGVhci1jb21wbGV0ZWRcIiBvbjpjbGljaz17UVJMYHVpOi9Gb290ZXJfYXJjaGl2ZWB9PlxuICAgICAgICAgICAgICAgIENsZWFyIGNvbXBsZXRlZFxuICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICkgOiBudWxsfVxuICAgICAgICAgIDwvPlxuICAgICAgICApIDogbnVsbH1cbiAgICAgIDwvSG9zdD5cbiAgICApO1xuICB9XG4pO1xuIl19