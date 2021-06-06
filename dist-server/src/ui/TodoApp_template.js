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
const Item_js_1 = require("../data/Item.js");
const Todo_js_1 = require("../data/Todo.js");
const qwik_js_1 = require("../qwik.js");
const Footer_js_1 = require("./Footer.js");
const Header_js_1 = require("./Header.js");
const Main_js_1 = require("./Main.js");
exports._needed_by_JSX_ = qwik_js_1.jsxFactory; // eslint-disable-line @typescript-eslint/no-unused-vars
exports.default = qwik_js_1.injectFunction(function () {
    return (qwik_js_1.jsxFactory("section", { class: "todoapp", "decl:entity": [Todo_js_1.TodoEntity, Item_js_1.ItemEntity] },
        qwik_js_1.jsxFactory(Header_js_1.Header, null),
        qwik_js_1.jsxFactory(Main_js_1.Main, { "$todos": Todo_js_1.TodoEntity.MOCK_USER }),
        qwik_js_1.jsxFactory(Footer_js_1.Footer, { "$todos": Todo_js_1.TodoEntity.MOCK_USER })));
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVG9kb0FwcF90ZW1wbGF0ZS5qcyIsInNvdXJjZVJvb3QiOiIuLyIsInNvdXJjZXMiOlsic3JjL3VpL1RvZG9BcHBfdGVtcGxhdGUudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7Ozs7O0dBTUc7OztBQUVILDZDQUE2QztBQUM3Qyw2Q0FBNkM7QUFDN0Msd0NBQXdEO0FBQ3hELDJDQUFxQztBQUNyQywyQ0FBcUM7QUFDckMsdUNBQWlDO0FBRXBCLFFBQUEsZUFBZSxHQUFHLG9CQUFVLENBQUMsQ0FBQyx3REFBd0Q7QUFDbkcsa0JBQWUsd0JBQWMsQ0FBQztJQUM1QixPQUFPLENBQ0wsa0NBQVMsS0FBSyxFQUFDLFNBQVMsaUJBQWMsQ0FBQyxvQkFBVSxFQUFFLG9CQUFVLENBQUM7UUFDNUQscUJBQUMsa0JBQU0sT0FBRztRQUNWLHFCQUFDLGNBQUksY0FBUyxvQkFBVSxDQUFDLFNBQVMsR0FBSTtRQUN0QyxxQkFBQyxrQkFBTSxjQUFTLG9CQUFVLENBQUMsU0FBUyxHQUFJLENBQ2hDLENBQ1gsQ0FBQztBQUNKLENBQUMsQ0FBQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEJ1aWxkZXJJTyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vZ2l0aHViLmNvbS9CdWlsZGVySU8vcXdpay9ibG9iL21haW4vTElDRU5TRVxuICovXG5cbmltcG9ydCB7IEl0ZW1FbnRpdHkgfSBmcm9tICcuLi9kYXRhL0l0ZW0uanMnO1xuaW1wb3J0IHsgVG9kb0VudGl0eSB9IGZyb20gJy4uL2RhdGEvVG9kby5qcyc7XG5pbXBvcnQgeyBpbmplY3RGdW5jdGlvbiwganN4RmFjdG9yeSB9IGZyb20gJy4uL3F3aWsuanMnO1xuaW1wb3J0IHsgRm9vdGVyIH0gZnJvbSAnLi9Gb290ZXIuanMnO1xuaW1wb3J0IHsgSGVhZGVyIH0gZnJvbSAnLi9IZWFkZXIuanMnO1xuaW1wb3J0IHsgTWFpbiB9IGZyb20gJy4vTWFpbi5qcyc7XG5cbmV4cG9ydCBjb25zdCBfbmVlZGVkX2J5X0pTWF8gPSBqc3hGYWN0b3J5OyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby11bnVzZWQtdmFyc1xuZXhwb3J0IGRlZmF1bHQgaW5qZWN0RnVuY3Rpb24oZnVuY3Rpb24gKCkge1xuICByZXR1cm4gKFxuICAgIDxzZWN0aW9uIGNsYXNzPVwidG9kb2FwcFwiIGRlY2w6ZW50aXR5PXtbVG9kb0VudGl0eSwgSXRlbUVudGl0eV19PlxuICAgICAgPEhlYWRlciAvPlxuICAgICAgPE1haW4gJHRvZG9zPXtUb2RvRW50aXR5Lk1PQ0tfVVNFUn0gLz5cbiAgICAgIDxGb290ZXIgJHRvZG9zPXtUb2RvRW50aXR5Lk1PQ0tfVVNFUn0gLz5cbiAgICA8L3NlY3Rpb24+XG4gICk7XG59KTtcbiJdfQ==