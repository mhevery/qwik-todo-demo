"use strict";
/**
 * @license
 * Copyright BuilderIO All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/BuilderIO/qwik/blob/main/LICENSE
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ItemComponent = void 0;
const qwik_js_1 = require("../qwik.js");
class ItemComponent extends qwik_js_1.Component {
    constructor() {
        super(...arguments);
        this.editing = false;
    }
    $newState() {
        return {};
    }
}
exports.ItemComponent = ItemComponent;
ItemComponent.$templateQRL = qwik_js_1.QRL `ui:/Item_template`;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSXRlbV9jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiLi8iLCJzb3VyY2VzIjpbInNyYy91aS9JdGVtX2NvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7OztHQU1HOzs7QUFFSCx3Q0FBNEM7QUFLNUMsTUFBYSxhQUFjLFNBQVEsbUJBQStCO0lBQWxFOztRQUdFLFlBQU8sR0FBRyxLQUFLLENBQUM7SUFJbEIsQ0FBQztJQUhDLFNBQVM7UUFDUCxPQUFPLEVBQUUsQ0FBQztJQUNaLENBQUM7O0FBTkgsc0NBT0M7QUFOUSwwQkFBWSxHQUFHLGFBQUcsQ0FBQSxtQkFBbUIsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBCdWlsZGVySU8gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2dpdGh1Yi5jb20vQnVpbGRlcklPL3F3aWsvYmxvYi9tYWluL0xJQ0VOU0VcbiAqL1xuXG5pbXBvcnQgeyBDb21wb25lbnQsIFFSTCB9IGZyb20gJy4uL3F3aWsuanMnO1xuaW1wb3J0IHsgSXRlbVByb3BzIH0gZnJvbSAnLi9JdGVtLmpzJztcblxuaW50ZXJmYWNlIEl0ZW1TdGF0ZSB7fVxuXG5leHBvcnQgY2xhc3MgSXRlbUNvbXBvbmVudCBleHRlbmRzIENvbXBvbmVudDxJdGVtUHJvcHMsIEl0ZW1TdGF0ZT4ge1xuICBzdGF0aWMgJHRlbXBsYXRlUVJMID0gUVJMYHVpOi9JdGVtX3RlbXBsYXRlYDtcblxuICBlZGl0aW5nID0gZmFsc2U7XG4gICRuZXdTdGF0ZSgpIHtcbiAgICByZXR1cm4ge307XG4gIH1cbn1cbiJdfQ==