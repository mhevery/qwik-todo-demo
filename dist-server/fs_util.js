"use strict";
/**
 * @license
 * Copyright BuilderIO All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/BuilderIO/qwik/blob/main/LICENSE
 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findFiles = void 0;
const fs = __importStar(require("fs"));
const path_1 = require("path");
function findFiles(baseDir, pattern, fn, relativeDir = '') {
    const fullPathDir = path_1.join(baseDir, relativeDir);
    fs.readdirSync(fullPathDir).forEach(name => {
        const fullPathFile = path_1.join(fullPathDir, name);
        if (pattern instanceof RegExp ? pattern.exec(name) : pattern === name) {
            fn(fullPathFile, name, relativeDir);
        }
        if (fs.statSync(fullPathFile).isDirectory()) {
            findFiles(baseDir, pattern, fn, path_1.join(relativeDir, name));
        }
    });
}
exports.findFiles = findFiles;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnNfdXRpbC5qcyIsInNvdXJjZVJvb3QiOiIuLyIsInNvdXJjZXMiOlsiZnNfdXRpbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7OztHQU1HOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBRUgsdUNBQXlCO0FBQ3pCLCtCQUE0QjtBQUU1QixTQUFnQixTQUFTLENBQ3ZCLE9BQWUsRUFDZixPQUF3QixFQUN4QixFQUFzRSxFQUN0RSxjQUFzQixFQUFFO0lBRXhCLE1BQU0sV0FBVyxHQUFHLFdBQUksQ0FBQyxPQUFPLEVBQUUsV0FBVyxDQUFDLENBQUM7SUFDL0MsRUFBRSxDQUFDLFdBQVcsQ0FBQyxXQUFXLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUU7UUFDekMsTUFBTSxZQUFZLEdBQUcsV0FBSSxDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUM3QyxJQUFJLE9BQU8sWUFBWSxNQUFNLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sS0FBSyxJQUFJLEVBQUU7WUFDckUsRUFBRSxDQUFDLFlBQVksRUFBRSxJQUFJLEVBQUUsV0FBVyxDQUFDLENBQUM7U0FDckM7UUFDRCxJQUFJLEVBQUUsQ0FBQyxRQUFRLENBQUMsWUFBWSxDQUFDLENBQUMsV0FBVyxFQUFFLEVBQUU7WUFDM0MsU0FBUyxDQUFDLE9BQU8sRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFLFdBQUksQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQztTQUMxRDtJQUNILENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQztBQWhCRCw4QkFnQkMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgQnVpbGRlcklPIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9naXRodWIuY29tL0J1aWxkZXJJTy9xd2lrL2Jsb2IvbWFpbi9MSUNFTlNFXG4gKi9cblxuaW1wb3J0ICogYXMgZnMgZnJvbSAnZnMnO1xuaW1wb3J0IHsgam9pbiB9IGZyb20gJ3BhdGgnO1xuXG5leHBvcnQgZnVuY3Rpb24gZmluZEZpbGVzKFxuICBiYXNlRGlyOiBzdHJpbmcsXG4gIHBhdHRlcm46IHN0cmluZyB8IFJlZ0V4cCxcbiAgZm46IChmdWxsUGF0aDogc3RyaW5nLCBmaWxlbmFtZTogc3RyaW5nLCByZWxhdGl2ZVBhdGg6IHN0cmluZykgPT4gdm9pZCxcbiAgcmVsYXRpdmVEaXI6IHN0cmluZyA9ICcnXG4pIHtcbiAgY29uc3QgZnVsbFBhdGhEaXIgPSBqb2luKGJhc2VEaXIsIHJlbGF0aXZlRGlyKTtcbiAgZnMucmVhZGRpclN5bmMoZnVsbFBhdGhEaXIpLmZvckVhY2gobmFtZSA9PiB7XG4gICAgY29uc3QgZnVsbFBhdGhGaWxlID0gam9pbihmdWxsUGF0aERpciwgbmFtZSk7XG4gICAgaWYgKHBhdHRlcm4gaW5zdGFuY2VvZiBSZWdFeHAgPyBwYXR0ZXJuLmV4ZWMobmFtZSkgOiBwYXR0ZXJuID09PSBuYW1lKSB7XG4gICAgICBmbihmdWxsUGF0aEZpbGUsIG5hbWUsIHJlbGF0aXZlRGlyKTtcbiAgICB9XG4gICAgaWYgKGZzLnN0YXRTeW5jKGZ1bGxQYXRoRmlsZSkuaXNEaXJlY3RvcnkoKSkge1xuICAgICAgZmluZEZpbGVzKGJhc2VEaXIsIHBhdHRlcm4sIGZuLCBqb2luKHJlbGF0aXZlRGlyLCBuYW1lKSk7XG4gICAgfVxuICB9KTtcbn1cbiJdfQ==