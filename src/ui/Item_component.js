"use strict";
/**
 * @license
 * Copyright BuilderIO All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/BuilderIO/qwik/blob/main/LICENSE
 */
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ItemComponent = void 0;
var qwik_js_1 = require("../qwik.js");
var ItemComponent = /** @class */ (function (_super) {
    __extends(ItemComponent, _super);
    function ItemComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.editing = false;
        return _this;
    }
    ItemComponent.prototype.$newState = function () {
        return {};
    };
    ItemComponent.$templateQRL = qwik_js_1.QRL(templateObject_1 || (templateObject_1 = __makeTemplateObject(["ui:/Item_template"], ["ui:/Item_template"])));
    return ItemComponent;
}(qwik_js_1.Component));
exports.ItemComponent = ItemComponent;
var templateObject_1;
