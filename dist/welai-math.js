(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["welai-math"] = factory();
	else
		root["welai-math"] = factory();
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./test/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/Glyph.ts":
/*!**********************!*\
  !*** ./src/Glyph.ts ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __importStar = (this && this.__importStar) || function (mod) {\n    if (mod && mod.__esModule) return mod;\n    var result = {};\n    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];\n    result[\"default\"] = mod;\n    return result;\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar caryll_1 = __webpack_require__(/*! ./caryll */ \"./src/caryll.ts\");\nvar Premitives = __importStar(__webpack_require__(/*! ./premitives */ \"./src/premitives.ts\"));\nvar Glyph = (function () {\n    function Glyph(paths) {\n        if (!paths)\n            this.paths = [];\n        else {\n            this.paths = paths.map(function (path) { return path.filter(function (segment) { return segment.length != 0; }).map(function (segment) {\n                var seg = segment.slice();\n                while (seg.length < 3)\n                    seg.push(seg[seg.length - 1]);\n                while (seg.length > 3)\n                    seg.pop();\n                return Premitives.Segment(seg.map(function (pair) { return Premitives.Point(pair); }));\n            }); });\n        }\n    }\n    Glyph.fromCubicCaryll = function (caryllPaths) {\n        var result = new Glyph();\n        result.paths = caryll_1.cubic2welai(caryllPaths);\n        return result;\n    };\n    Glyph.prototype.toCubicCaryll = function () {\n        return caryll_1.welai2cubic(this.paths);\n    };\n    return Glyph;\n}());\nexports.default = Glyph;\n\n\n//# sourceURL=webpack://welai-math/./src/Glyph.ts?");

/***/ }),

/***/ "./src/caryll.ts":
/*!***********************!*\
  !*** ./src/caryll.ts ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __importStar = (this && this.__importStar) || function (mod) {\n    if (mod && mod.__esModule) return mod;\n    var result = {};\n    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];\n    result[\"default\"] = mod;\n    return result;\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar Premitives = __importStar(__webpack_require__(/*! ./premitives */ \"./src/premitives.ts\"));\nfunction cubic2welai(caryllPaths) {\n    function pathConversion(caryllPath) {\n        var path = caryllPath.slice();\n        var result = [];\n        while (path.length > 0) {\n            var head = path[0];\n            if (head.on) {\n                if (result[result.length - 1] && !result[result.length - 1].op) {\n                    result[result.length - 1].op = Premitives.Point(head.x, head.y);\n                }\n                else {\n                    result.push(Premitives.Segment(null, Premitives.Point(head.x, head.y), null));\n                }\n                path.splice(0, 1);\n            }\n            else {\n                if (result[result.length - 1] && !result[result.length - 1].cp2) {\n                    result[result.length - 1].cp2 = Premitives.Point(head.x, head.y);\n                }\n                else {\n                    result.push(Premitives.Segment(Premitives.Point(head.x, head.y), null, null));\n                }\n                path.splice(0, 1);\n            }\n        }\n        var offEndFlag = false;\n        for (var _i = 0, result_1 = result; _i < result_1.length; _i++) {\n            var segment = result_1[_i];\n            if (!segment.cp1)\n                segment.cp1 = segment.op;\n            if (!segment.cp2)\n                segment.cp2 = segment.op;\n            if (!segment.op)\n                offEndFlag = true;\n        }\n        if (offEndFlag) {\n            var last = result.pop();\n            result[0].cp1 = last.cp1;\n        }\n        return result;\n    }\n    return caryllPaths.map(function (path) { return pathConversion(path); });\n}\nexports.cubic2welai = cubic2welai;\nfunction welai2cubic(welaiPaths) {\n    var paths = welaiPaths.map(function (path) { return path.map(function (segment) {\n        var flag1 = true, flag2 = true;\n        if (segment.cp1.equals(segment.op))\n            flag1 = false;\n        if (segment.cp2.equals(segment.op))\n            flag2 = false;\n        return Premitives.Segment(flag1 ? Premitives.Point(segment.cp1) : null, Premitives.Point(segment.op), flag2 ? Premitives.Point(segment.cp2) : null);\n    }); });\n    var result = paths.map(function (path) {\n        var result = [];\n        if (path.length != 0) {\n            result.push({ x: path[0].op.x, y: path[0].op.y, on: true });\n            if (path[0].cp2)\n                result.push({ x: path[0].cp2.x, y: path[0].cp2.y, on: false });\n            for (var i = 1; i < path.length; i++) {\n                var segment = path[i];\n                if (segment.cp1)\n                    result.push({ x: segment.cp1.x, y: segment.cp1.y, on: false });\n                if (segment.op)\n                    result.push({ x: segment.op.x, y: segment.op.y, on: true });\n                if (segment.cp2)\n                    result.push({ x: segment.cp2.x, y: segment.cp2.y, on: false });\n            }\n            if (path[0].cp1)\n                result.push({ x: path[0].cp1.x, y: path[0].cp1.y, on: false });\n        }\n        return result;\n    });\n    return result;\n}\nexports.welai2cubic = welai2cubic;\n\n\n//# sourceURL=webpack://welai-math/./src/caryll.ts?");

/***/ }),

/***/ "./src/premitives.ts":
/*!***************************!*\
  !*** ./src/premitives.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nfunction Point() {\n    var args = [];\n    for (var _i = 0; _i < arguments.length; _i++) {\n        args[_i] = arguments[_i];\n    }\n    if (args && args.length === 2) {\n        var a = args.slice();\n    }\n    else if (args[0]) {\n        var a = args[0].slice();\n        if (a.length < 2)\n            throw Error(a + \" is not a valid point.\");\n    }\n    else if (args[0]) {\n        var a = args[0].slice();\n    }\n    else {\n        throw Error(\"Incompatible arguments \" + args);\n    }\n    Object.defineProperty(a, 'x', {\n        get: function () { return a[0]; },\n        set: function (newVal) { a[0] = newVal; }\n    });\n    Object.defineProperty(a, 'y', {\n        get: function () { return a[1]; },\n        set: function (newVal) { a[1] = newVal; }\n    });\n    a.equals = function (p) {\n        return p[0] === a[0] && p[1] === a[1] && p[2] === a[2];\n    };\n    return a;\n}\nexports.Point = Point;\nfunction Segment() {\n    var args = [];\n    for (var _i = 0; _i < arguments.length; _i++) {\n        args[_i] = arguments[_i];\n    }\n    if (args && args.length === 3) {\n        var a = args.slice();\n    }\n    else if (args[0]) {\n        var a = args[0].slice();\n        if (a.length < 3)\n            throw Error(a + \" is not a valid segment.\");\n    }\n    else {\n        throw Error(\"Incompatible arguments \" + args);\n    }\n    Object.defineProperty(a, 'cp1', {\n        get: function () { return a[0]; },\n        set: function (newVal) { a[0] = newVal; }\n    });\n    Object.defineProperty(a, 'op', {\n        get: function () { return a[1]; },\n        set: function (newVal) { a[1] = newVal; }\n    });\n    Object.defineProperty(a, 'cp2', {\n        get: function () { return a[2]; },\n        set: function (newVal) { a[2] = newVal; }\n    });\n    return a;\n}\nexports.Segment = Segment;\n\n\n//# sourceURL=webpack://welai-math/./src/premitives.ts?");

/***/ }),

/***/ "./test/index.ts":
/*!***********************!*\
  !*** ./test/index.ts ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar Glyph_1 = __importDefault(__webpack_require__(/*! ../src/Glyph */ \"./src/Glyph.ts\"));\nvar data = [[{ \"x\": 553, \"y\": 348, \"on\": true }, { \"x\": 553, \"y\": 634, \"on\": false }, { \"x\": 392, \"y\": 689, \"on\": false }, { \"x\": 230, \"y\": 689, \"on\": true }, { \"x\": 83, \"y\": 689, \"on\": true }, { \"x\": 83, \"y\": 0, \"on\": true }, { \"x\": 241, \"y\": 0, \"on\": true }, { \"x\": 384, \"y\": 0, \"on\": false }, { \"x\": 553, \"y\": 59, \"on\": false }], [{ \"x\": 460, \"y\": 348, \"on\": true }, { \"x\": 460, \"y\": 120, \"on\": false }, { \"x\": 351, \"y\": 70, \"on\": false }, { \"x\": 252, \"y\": 70, \"on\": true }, { \"x\": 170, \"y\": 70, \"on\": true }, { \"x\": 170, \"y\": 618, \"on\": true }, { \"x\": 251, \"y\": 618, \"on\": true }, { \"x\": 346, \"y\": 618, \"on\": false }, { \"x\": 460, \"y\": 588, \"on\": false }]];\nvar glyph = Glyph_1.default.fromCubicCaryll(data);\nconsole.log(data);\nconsole.log(glyph.toCubicCaryll());\n\n\n//# sourceURL=webpack://welai-math/./test/index.ts?");

/***/ })

/******/ });
});