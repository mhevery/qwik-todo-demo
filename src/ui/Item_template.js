"use strict";
/**
 * @license
 * Copyright BuilderIO All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/BuilderIO/qwik/blob/main/LICENSE
 */
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports._needed_by_JSX_ = void 0;
var qwik_js_1 = require("../qwik.js");
var Item_component_js_1 = require("./Item_component.js");
// TODO: remove this by changing jsxFactory over to import
exports._needed_by_JSX_ = qwik_js_1.jsxFactory; // eslint-disable-line @typescript-eslint/no-unused-vars
exports.default = qwik_js_1.injectMethod(Item_component_js_1.ItemComponent, qwik_js_1.provideEntityState(qwik_js_1.provideComponentProp('$item') // TODO(type)
), qwik_js_1.provideComponentProp('$item'), function (item, itemKey) {
    return (<qwik_js_1.Host class={{ completed: item.completed, editing: this.editing }}>
        <div class="view">
          <input class="toggle" type="checkbox" checked={item.completed} on:click={qwik_js_1.QRL(templateObject_1 || (templateObject_1 = __makeTemplateObject(["ui:/Item_toggle#?toggleState=.target.checked"], ["ui:/Item_toggle#?toggleState=.target.checked"])))}/>
          <label on:dblclick={qwik_js_1.QRL(templateObject_2 || (templateObject_2 = __makeTemplateObject(["ui:/Item_edit#begin"], ["ui:/Item_edit#begin"])))}>{item.title}</label>
          <button class="destroy" on:click={qwik_js_1.QRL(templateObject_3 || (templateObject_3 = __makeTemplateObject(["ui:/Item_remove#?itemKey=", ""], ["ui:/Item_remove#?itemKey=", ""])), itemKey)}></button>
        </div>
        {this.editing ? (<input class="edit" value={item.title} on:blur={qwik_js_1.QRL(templateObject_4 || (templateObject_4 = __makeTemplateObject(["ui:/Item_edit#end"], ["ui:/Item_edit#end"])))} // TODO: investigate why this sometimes does not fire
         on:keyup={qwik_js_1.QRL(templateObject_5 || (templateObject_5 = __makeTemplateObject(["ui:/Item_edit#change?value=.target.value&code=.code&itemKey=", ""], ["ui:/Item_edit#change?value=.target.value&code=.code&itemKey=", ""])), itemKey)}/>) : null}
      </qwik_js_1.Host>);
});
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5;
