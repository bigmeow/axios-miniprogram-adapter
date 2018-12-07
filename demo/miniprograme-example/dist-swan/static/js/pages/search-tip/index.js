(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["pages/search-tip/index"],{

/***/ "./node_modules/@megalo/target/lib/frameworks/vue/loader/template.js?!./node_modules/vue-loader/lib/index.js?!./src/pages/search-tip/index.vue?vue&type=template&id=e9c6cf06&":
/*!*****************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@megalo/target/lib/frameworks/vue/loader/template.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/pages/search-tip/index.vue?vue&type=template&id=e9c6cf06& ***!
  \*****************************************************************************************************************************************************************************************************************/
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
          var _fid = linkItem_i2 !== undefined ? linkItem_i2 : linkItem_i1
          return _vm._ri(
            !!_vm.searchLinkResult,
            4,
            linkItem_i2 !== undefined ? linkItem_i2 : linkItem_i1
          )
            ? _c(
                "view",
                {
                  key: linkItem[1],
                  staticClass: "link-item",
                  attrs: { _hid: 4, _fid: _fid, _fk: "linkItem[1]" }
                },
                [_vm._v(_vm._s(linkItem[0]), 5, _fid)]
              )
            : _vm._e()
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

/***/ "./node_modules/babel-loader/lib/index.js!./node_modules/@megalo/target/lib/frameworks/vue/loader/script.js!./node_modules/vue-loader/lib/index.js?!./src/pages/search-tip/index.vue?vue&type=script&lang=js&":
/*!*********************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/@megalo/target/lib/frameworks/vue/loader/script.js!./node_modules/vue-loader/lib??vue-loader-options!./src/pages/search-tip/index.vue?vue&type=script&lang=js& ***!
  \*********************************************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var axios_miniprogram_adapter__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! axios-miniprogram-adapter */ "./node_modules/axios-miniprogram-adapter/dist/index.esm.js");
//
//
//
//
//
//
//
//
//


axios__WEBPACK_IMPORTED_MODULE_0___default.a.defaults.adapter = axios_miniprogram_adapter__WEBPACK_IMPORTED_MODULE_1__["default"];
var CancelToken = axios__WEBPACK_IMPORTED_MODULE_0___default.a.CancelToken;
/* harmony default export */ __webpack_exports__["default"] = ({
  mpType: 'page',
  data: function data() {
    return {
      searchKey: '',
      // 搜索关键词
      searchLinkResult: [],
      // 搜索联想结果 搜索结果的数据结构： [  ["123沙发", "63159"], ["123童装", "2370592"]   ]
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

      axios__WEBPACK_IMPORTED_MODULE_0___default.a.get('https://suggest.taobao.com/sug', {
        cancelToken: new CancelToken(function (c) {
          return _this.cancel = c;
        }),
        params: {
          q: keyWords,
          code: 'utf-8',
          area: 'c2c'
        }
      }).then(function (res) {
        _this.searchLinkResult = res.data.result; // console.log('请求结果', res)
      }).catch(function (error) {
        if (axios__WEBPACK_IMPORTED_MODULE_0___default.a.isCancel(error)) {
          console.log('主动取消了请求原因：', error);
          return;
        }

        console.log('其他错误', error);
      });
    }
  }
});

/***/ }),

/***/ "./node_modules/mini-css-extract-plugin/dist/loader.js!./node_modules/css-loader/index.js!./node_modules/@megalo/target/lib/frameworks/vue/loader/style.js!./node_modules/vue-loader/lib/index.js?!./src/pages/search-tip/index.vue?vue&type=style&index=0&lang=css&":
/*!****************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js!./node_modules/css-loader!./node_modules/@megalo/target/lib/frameworks/vue/loader/style.js!./node_modules/vue-loader/lib??vue-loader-options!./src/pages/search-tip/index.vue?vue&type=style&index=0&lang=css& ***!
  \****************************************************************************************************************************************************************************************************************************************************************************/
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


var _index = _interopRequireDefault(__webpack_require__(/*! ./index */ "./src/pages/search-tip/index.vue"));

var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ "./node_modules/megalo/dist/megalo.mp.esm.js"));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}

_index.default.mpType = "page";
var app = new _vue.default(_index.default);
app.$mount();

/***/ }),

/***/ "./src/pages/search-tip/index.vue":
/*!****************************************!*\
  !*** ./src/pages/search-tip/index.vue ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _index_vue_vue_type_template_id_e9c6cf06___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index.vue?vue&type=template&id=e9c6cf06& */ "./src/pages/search-tip/index.vue?vue&type=template&id=e9c6cf06&");
/* harmony import */ var _index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./index.vue?vue&type=script&lang=js& */ "./src/pages/search-tip/index.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _index_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./index.vue?vue&type=style&index=0&lang=css& */ "./src/pages/search-tip/index.vue?vue&type=style&index=0&lang=css&");
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
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_megalo_target_lib_frameworks_vue_loader_script_js_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib!../../../node_modules/@megalo/target/lib/frameworks/vue/loader/script.js!../../../node_modules/vue-loader/lib??vue-loader-options!./index.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js!./node_modules/@megalo/target/lib/frameworks/vue/loader/script.js!./node_modules/vue-loader/lib/index.js?!./src/pages/search-tip/index.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_node_modules_megalo_target_lib_frameworks_vue_loader_script_js_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./src/pages/search-tip/index.vue?vue&type=style&index=0&lang=css&":
/*!*************************************************************************!*\
  !*** ./src/pages/search-tip/index.vue?vue&type=style&index=0&lang=css& ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_index_js_node_modules_megalo_target_lib_frameworks_vue_loader_style_js_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/mini-css-extract-plugin/dist/loader.js!../../../node_modules/css-loader!../../../node_modules/@megalo/target/lib/frameworks/vue/loader/style.js!../../../node_modules/vue-loader/lib??vue-loader-options!./index.vue?vue&type=style&index=0&lang=css& */ "./node_modules/mini-css-extract-plugin/dist/loader.js!./node_modules/css-loader/index.js!./node_modules/@megalo/target/lib/frameworks/vue/loader/style.js!./node_modules/vue-loader/lib/index.js?!./src/pages/search-tip/index.vue?vue&type=style&index=0&lang=css&");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_index_js_node_modules_megalo_target_lib_frameworks_vue_loader_style_js_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_index_js_node_modules_megalo_target_lib_frameworks_vue_loader_style_js_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_index_js_node_modules_megalo_target_lib_frameworks_vue_loader_style_js_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_index_js_node_modules_megalo_target_lib_frameworks_vue_loader_style_js_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_index_js_node_modules_megalo_target_lib_frameworks_vue_loader_style_js_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./src/pages/search-tip/index.vue?vue&type=template&id=e9c6cf06&":
/*!***********************************************************************!*\
  !*** ./src/pages/search-tip/index.vue?vue&type=template&id=e9c6cf06& ***!
  \***********************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_megalo_target_lib_frameworks_vue_loader_template_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_template_id_e9c6cf06___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/@megalo/target/lib/frameworks/vue/loader/template.js??vue-loader-options!../../../node_modules/vue-loader/lib??vue-loader-options!./index.vue?vue&type=template&id=e9c6cf06& */ "./node_modules/@megalo/target/lib/frameworks/vue/loader/template.js?!./node_modules/vue-loader/lib/index.js?!./src/pages/search-tip/index.vue?vue&type=template&id=e9c6cf06&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_megalo_target_lib_frameworks_vue_loader_template_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_template_id_e9c6cf06___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_megalo_target_lib_frameworks_vue_loader_template_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_template_id_e9c6cf06___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

},[["./src/pages/search-tip/index.js","runtime","vendor"]]]);