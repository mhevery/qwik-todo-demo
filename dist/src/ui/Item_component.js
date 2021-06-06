/**
 * @license
 * Copyright BuilderIO All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/BuilderIO/qwik/blob/main/LICENSE
 */
import { Component, QRL } from '../qwik.js';
export class ItemComponent extends Component {
    constructor() {
        super(...arguments);
        this.editing = false;
    }
    $newState() {
        return {};
    }
}
ItemComponent.$templateQRL = QRL `ui:/Item_template`;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSXRlbV9jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiLi8iLCJzb3VyY2VzIjpbInNyYy91aS9JdGVtX2NvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFFSCxPQUFPLEVBQUUsU0FBUyxFQUFFLEdBQUcsRUFBRSxNQUFNLFlBQVksQ0FBQztBQUs1QyxNQUFNLE9BQU8sYUFBYyxTQUFRLFNBQStCO0lBQWxFOztRQUdFLFlBQU8sR0FBRyxLQUFLLENBQUM7SUFJbEIsQ0FBQztJQUhDLFNBQVM7UUFDUCxPQUFPLEVBQUUsQ0FBQztJQUNaLENBQUM7O0FBTE0sMEJBQVksR0FBRyxHQUFHLENBQUEsbUJBQW1CLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgQnVpbGRlcklPIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9naXRodWIuY29tL0J1aWxkZXJJTy9xd2lrL2Jsb2IvbWFpbi9MSUNFTlNFXG4gKi9cblxuaW1wb3J0IHsgQ29tcG9uZW50LCBRUkwgfSBmcm9tICcuLi9xd2lrLmpzJztcbmltcG9ydCB7IEl0ZW1Qcm9wcyB9IGZyb20gJy4vSXRlbS5qcyc7XG5cbmludGVyZmFjZSBJdGVtU3RhdGUge31cblxuZXhwb3J0IGNsYXNzIEl0ZW1Db21wb25lbnQgZXh0ZW5kcyBDb21wb25lbnQ8SXRlbVByb3BzLCBJdGVtU3RhdGU+IHtcbiAgc3RhdGljICR0ZW1wbGF0ZVFSTCA9IFFSTGB1aTovSXRlbV90ZW1wbGF0ZWA7XG5cbiAgZWRpdGluZyA9IGZhbHNlO1xuICAkbmV3U3RhdGUoKSB7XG4gICAgcmV0dXJuIHt9O1xuICB9XG59XG4iXX0=