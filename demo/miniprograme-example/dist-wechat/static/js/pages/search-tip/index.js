/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/ 		var executeModules = data[2];
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 		// add entry modules from loaded chunk to deferred list
/******/ 		deferredModules.push.apply(deferredModules, executeModules || []);
/******/
/******/ 		// run deferred modules when all chunks ready
/******/ 		return checkDeferredModules();
/******/ 	};
/******/ 	function checkDeferredModules() {
/******/ 		var result;
/******/ 		for(var i = 0; i < deferredModules.length; i++) {
/******/ 			var deferredModule = deferredModules[i];
/******/ 			var fulfilled = true;
/******/ 			for(var j = 1; j < deferredModule.length; j++) {
/******/ 				var depId = deferredModule[j];
/******/ 				if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 			}
/******/ 			if(fulfilled) {
/******/ 				deferredModules.splice(i--, 1);
/******/ 				result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 			}
/******/ 		}
/******/ 		return result;
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		"pages/search-tip/index": 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
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
/******/ 	var jsonpArray = global["webpackJsonp"] = global["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// add entry module to deferred list
/******/ 	deferredModules.push(["./src/pages/search-tip/index.js","vendor"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/@megalo/target/lib/loaders/template.js?!./node_modules/vue-loader/lib/index.js?!./src/pages/search-tip/index.vue?vue&type=template&id=e9c6cf06&":
/*!***************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@megalo/target/lib/loaders/template.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/pages/search-tip/index.vue?vue&type=template&id=e9c6cf06& ***!
  \***************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("view", { attrs: { _hid: 0 } }, [
    _c("input", {
      directives: [
        {
          name: "model",
          rawName: "v-model",
          value: _vm.searchKey,
          expression: "searchKey"
        }
      ],
      staticClass: "search",
      attrs: { type: "search", placeholder: "淘宝一下，你就知道", _hid: 1 },
      domProps: { value: _vm.searchKey },
      on: {
        input: function($event) {
          if ($event.target.composing) {
            return
          }
          _vm.searchKey = $event.target.value
        }
      }
    }),
    _c(
      "view",
      { staticClass: "linklist", attrs: { _hid: 3 } },
      _vm._l(
        _vm.searchLinkResult,
        function(linkItem, linkItem_i1, linkItem_i2) {
          return _c(
            "view",
            {
              key: linkItem[1],
              staticClass: "link-item",
              attrs: {
                _hid:
                  4 +
                  "-" +
                  (linkItem_i2 !== undefined ? linkItem_i2 : linkItem_i1),
                _fk: "linkItem[1]"
              }
            },
            [
              _vm._v(
                _vm._s(linkItem[0]),
                5 +
                  "-" +
                  (linkItem_i2 !== undefined ? linkItem_i2 : linkItem_i1)
              )
            ]
          )
        },
        4,
        _vm._self
      )
    )
  ])
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js!./node_modules/@megalo/target/lib/loaders/script.js!./node_modules/vue-loader/lib/index.js?!./src/pages/search-tip/index.vue?vue&type=script&lang=js&":
/*!*******************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/@megalo/target/lib/loaders/script.js!./node_modules/vue-loader/lib??vue-loader-options!./src/pages/search-tip/index.vue?vue&type=script&lang=js& ***!
  \*******************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _axios = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");

var _axios2 = _interopRequireDefault(_axios);

var _axiosMiniprogramAdapter = __webpack_require__(/*! axios-miniprogram-adapter */ "./node_modules/axios-miniprogram-adapter/dist/index.esm.js");

var _axiosMiniprogramAdapter2 = _interopRequireDefault(_axiosMiniprogramAdapter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//
//
//
//
//
//
//
//
//

_axios2.default.defaults.adapter = _axiosMiniprogramAdapter2.default;
var CancelToken = _axios2.default.CancelToken;
exports.default = {
  mpType: 'page',
  data: function data() {
    return {
      searchKey: '', // 搜索关键词
      searchLinkResult: [], // 搜索联想结果
      cancel: undefined // 取消函数
    };
  },

  watch: {
    searchKey: function searchKey(newWords) {
      // TODO 这里还可以做函数节流优化，减少发起请求的频次
      this.searchAPI(newWords);
    }
  },
  methods: {
    searchAPI: function searchAPI(keyWords) {
      var _this = this;

      if (this.cancel) {
        // 当用户打字速度太快时，我们每敲一个字符就调用一次搜索，没有必要，客户端也来不及渲染旧的数据又被新的数据覆盖了；
        // 所以在这里做一次优化，如果上一次搜索的请求还没收到响应，又要开始新的请求了，那么就主动取消上一次的搜索请求，重新发起新的请求
        this.cancel('主动取消上一个搜索接口的调用');
      }
      _axios2.default.get('https://suggest.taobao.com/sug', {
        cancelToken: new CancelToken(function (c) {
          return _this.cancel = c;
        }),
        params: {
          q: keyWords,
          code: 'utf-8',
          area: 'c2c'
        }
      }).then(function (res) {
        _this.searchLinkResult = res.data.result;
        // console.log('请求结果', res)
      }).catch(function (error) {
        if (_axios2.default.isCancel(error)) {
          console.log('主动取消了请求原因：', error);
          return;
        }
        console.log('其他错误', error);
      });
    }
  }
};

/***/ }),

/***/ "./node_modules/mini-css-extract-plugin/dist/loader.js!./node_modules/css-loader/index.js!./node_modules/@megalo/target/lib/loaders/style.js!./node_modules/vue-loader/lib/index.js?!./src/pages/search-tip/index.vue?vue&type=style&index=0&lang=css&":
/*!**************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js!./node_modules/css-loader!./node_modules/@megalo/target/lib/loaders/style.js!./node_modules/vue-loader/lib??vue-loader-options!./src/pages/search-tip/index.vue?vue&type=style&index=0&lang=css& ***!
  \**************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./src/pages/search-tip/index.js":
/*!***************************************!*\
  !*** ./src/pages/search-tip/index.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _index = __webpack_require__(/*! ./index */ "./src/pages/search-tip/index.vue");

var _index2 = _interopRequireDefault(_index);

var _vue = __webpack_require__(/*! vue */ "./node_modules/megalo/dist/megalo.mp.esm.js");

var _vue2 = _interopRequireDefault(_vue);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = new _vue2.default(_index2.default);

app.$mount();

/***/ }),

/***/ "./src/pages/search-tip/index.vue":
/*!****************************************!*\
  !*** ./src/pages/search-tip/index.vue ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _index_vue_vue_type_template_id_e9c6cf06___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index.vue?vue&type=template&id=e9c6cf06& */ "./src/pages/search-tip/index.vue?vue&type=template&id=e9c6cf06&");
/* harmony import */ var _index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./index.vue?vue&type=script&lang=js& */ "./src/pages/search-tip/index.vue?vue&type=script&lang=js&");
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _index_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./index.vue?vue&type=style&index=0&lang=css& */ "./src/pages/search-tip/index.vue?vue&type=style&index=0&lang=css&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _index_vue_vue_type_template_id_e9c6cf06___WEBPACK_IMPORTED_MODULE_0__["render"],
  _index_vue_vue_type_template_id_e9c6cf06___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "src/pages/search-tip/index.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./src/pages/search-tip/index.vue?vue&type=script&lang=js&":
/*!*****************************************************************!*\
  !*** ./src/pages/search-tip/index.vue?vue&type=script&lang=js& ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_megalo_target_lib_loaders_script_js_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib!../../../node_modules/@megalo/target/lib/loaders/script.js!../../../node_modules/vue-loader/lib??vue-loader-options!./index.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js!./node_modules/@megalo/target/lib/loaders/script.js!./node_modules/vue-loader/lib/index.js?!./src/pages/search-tip/index.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_megalo_target_lib_loaders_script_js_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_babel_loader_lib_index_js_node_modules_megalo_target_lib_loaders_script_js_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_babel_loader_lib_index_js_node_modules_megalo_target_lib_loaders_script_js_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_babel_loader_lib_index_js_node_modules_megalo_target_lib_loaders_script_js_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_node_modules_megalo_target_lib_loaders_script_js_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./src/pages/search-tip/index.vue?vue&type=style&index=0&lang=css&":
/*!*************************************************************************!*\
  !*** ./src/pages/search-tip/index.vue?vue&type=style&index=0&lang=css& ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_index_js_node_modules_megalo_target_lib_loaders_style_js_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/mini-css-extract-plugin/dist/loader.js!../../../node_modules/css-loader!../../../node_modules/@megalo/target/lib/loaders/style.js!../../../node_modules/vue-loader/lib??vue-loader-options!./index.vue?vue&type=style&index=0&lang=css& */ "./node_modules/mini-css-extract-plugin/dist/loader.js!./node_modules/css-loader/index.js!./node_modules/@megalo/target/lib/loaders/style.js!./node_modules/vue-loader/lib/index.js?!./src/pages/search-tip/index.vue?vue&type=style&index=0&lang=css&");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_index_js_node_modules_megalo_target_lib_loaders_style_js_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_index_js_node_modules_megalo_target_lib_loaders_style_js_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_index_js_node_modules_megalo_target_lib_loaders_style_js_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_index_js_node_modules_megalo_target_lib_loaders_style_js_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_index_js_node_modules_megalo_target_lib_loaders_style_js_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./src/pages/search-tip/index.vue?vue&type=template&id=e9c6cf06&":
/*!***********************************************************************!*\
  !*** ./src/pages/search-tip/index.vue?vue&type=template&id=e9c6cf06& ***!
  \***********************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_megalo_target_lib_loaders_template_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_template_id_e9c6cf06___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/@megalo/target/lib/loaders/template.js??vue-loader-options!../../../node_modules/vue-loader/lib??vue-loader-options!./index.vue?vue&type=template&id=e9c6cf06& */ "./node_modules/@megalo/target/lib/loaders/template.js?!./node_modules/vue-loader/lib/index.js?!./src/pages/search-tip/index.vue?vue&type=template&id=e9c6cf06&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_megalo_target_lib_loaders_template_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_template_id_e9c6cf06___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_megalo_target_lib_loaders_template_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_template_id_e9c6cf06___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

/******/ });