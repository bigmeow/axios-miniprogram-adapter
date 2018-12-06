(my["webpackJsonp"] = my["webpackJsonp"] || []).push([["pages/index/index"],{

/***/ "./node_modules/@megalo/target/lib/frameworks/vue/loader/template.js?!./node_modules/vue-loader/lib/index.js?!./src/pages/index/index.vue?vue&type=template&id=1badc801&scoped=true&":
/*!************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@megalo/target/lib/frameworks/vue/loader/template.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/pages/index/index.vue?vue&type=template&id=1badc801&scoped=true& ***!
  \************************************************************************************************************************************************************************************************************************/
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
  return _c(
    "view",
    { attrs: { _hid: 0 } },
    [
      _c("button", { attrs: { _hid: 1 }, on: { tap: _vm.handleBase } }, []),
      _c("button", { attrs: { _hid: 4 }, on: { tap: _vm.all } }, []),
      _c("button", { attrs: { _hid: 7 }, on: { tap: _vm.catchError } }, []),
      _c(
        "button",
        { attrs: { _hid: 10 }, on: { tap: _vm.transformResponseData } },
        []
      ),
      _c("button", { attrs: { _hid: 13 }, on: { tap: _vm.interceptors } }, []),
      _c("button", { attrs: { _hid: 16 }, on: { tap: _vm.requestCancel } }, []),
      _c("button", { attrs: { _hid: 19 }, on: { tap: _vm.handleJump } }, [])
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js!./node_modules/@megalo/target/lib/frameworks/vue/loader/script.js!./node_modules/vue-loader/lib/index.js?!./src/pages/index/index.vue?vue&type=script&lang=js&":
/*!****************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/@megalo/target/lib/frameworks/vue/loader/script.js!./node_modules/vue-loader/lib??vue-loader-options!./src/pages/index/index.vue?vue&type=script&lang=js& ***!
  \****************************************************************************************************************************************************************************************************************/
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
//
//
//
//



axios__WEBPACK_IMPORTED_MODULE_0___default.a.defaults.adapter = axios_miniprogram_adapter__WEBPACK_IMPORTED_MODULE_1__["default"];
/* harmony default export */ __webpack_exports__["default"] = ({
  mpType: 'page',
  data() {
    return {
      responseText: ''
    };
  },
  methods: {
    // 基本请求调用
    handleBase() {
      // 创建实例 设置baseURL
      const instance = axios__WEBPACK_IMPORTED_MODULE_0___default.a.create({
        baseURL: 'https://easy-mock.com'
      });
      // 设置token
      instance.defaults.headers.common['Authorization'] = 'I am a token';
      instance.get('/mock/5be12b95f7aed41684f2daea/axiosTest/getPersonByGet').then(resp => {
        console.log('GET请求成功:', resp);
      });

      instance.post('/mock/5be12b95f7aed41684f2daea/axiosTest/getPersonByPost').then(resp => {
        console.log('Post请求成功:', resp);
      });

      instance.request({
        url: 'https://easy-mock.com/mock/5be12b95f7aed41684f2daea/axiosTest/getPersonByGet',
        params: {
          name: '帅锅get Params',
          age: '18'
        }
      }).then(resp => {
        console.log('axios.request GET请求带参数成功:', resp);
      });

      instance.request({
        url: 'https://easy-mock.com/mock/5be12b95f7aed41684f2daea/axiosTest/getPersonByPost',
        method: 'POST',
        data: {
          name: '帅锅post Data',
          age: '18'
        }
      }).then(resp => {
        console.log('axios.request POST请求带参数成功:', resp);
      });
    },
    // 多个接口迸发调用后统一处理数据
    all() {
      axios__WEBPACK_IMPORTED_MODULE_0___default.a.all([axios__WEBPACK_IMPORTED_MODULE_0___default.a.get('https://api.github.com/users/mzabriskie'), axios__WEBPACK_IMPORTED_MODULE_0___default.a.get('https://api.github.com/users/mzabriskie/orgs')]).then(axios__WEBPACK_IMPORTED_MODULE_0___default.a.spread(function (user, orgs) {
        console.log('接口1数据:', user.data.avatar_url, user.data.name);
        console.log('接口2数据:', orgs.data);
      }));
    },
    // 错误捕获
    catchError() {
      axios__WEBPACK_IMPORTED_MODULE_0___default.a.post('https://easy-mock.com/mock/5be12b95f7aed41684f2daea/axiosTest/getPersonByPost22').then(resp => {
        console.log('Post请求成功:', resp);
      }).catch(error => {
        console.log('捕获到了异常：', JSON.stringify(error));
      });
    },
    // 数据拦截替换
    transformResponseData() {
      var ISO_8601 = /(\d{4}-\d{2}-\d{2})T(\d{2}:\d{2}:\d{2})Z/;
      function formatDate(d) {
        return d.getMonth() + 1 + '/' + d.getDate() + '/' + d.getFullYear();
      }

      axios__WEBPACK_IMPORTED_MODULE_0___default.a.get('https://api.github.com/users/mzabriskie', {
        transformResponse: axios__WEBPACK_IMPORTED_MODULE_0___default.a.defaults.transformResponse.concat(function (data, headers) {
          Object.keys(data).forEach(function (k) {
            if (ISO_8601.test(data[k])) {
              console.log(`字段${k}转换前：`, data[k]);
              data[k] = new Date(Date.parse(data[k]));
              console.log(`字段${k}转换后：`, data[k]);
            }
          });
          return data;
        })
      }).then(function (res) {
        console.log('useravatar', res.data.avatar_url);
        console.log('username', res.data.name);
        console.log('created', formatDate(res.data.created_at));
        console.log('updated', formatDate(res.data.updated_at));
      });
    },
    // 拦截器测试
    interceptors() {
      const instance = axios__WEBPACK_IMPORTED_MODULE_0___default.a.create({
        baseURL: 'https://easy-mock.com'
      });
      // 请求拦截器
      instance.interceptors.request.use(function (config) {
        // 发送请求之前你可以在这里对config做一些羞羞的事情
        console.log('请求被拦截到了，加点料', config);
        config.headers['Authorization'] = '123ba';
        return config;
      }, function (error) {
        // Do something with request error
        return Promise.reject(error);
      });

      // 添加一个响应拦截器
      instance.interceptors.response.use(function (response) {
        console.log('拦截到响应数据了，我过滤下,过滤前的数据：', response);
        // Do something with response data
        return response.data;
      }, function (error) {
        // Do something with response error
        return Promise.reject(error);
      });

      instance.get('/mock/5be12b95f7aed41684f2daea/axiosTest/getPersonByGet').then(resp => {
        console.log('经过拦截器后收到的数据:', resp);
      });
    },
    // 请求取消
    requestCancel() {
      var CancelToken = axios__WEBPACK_IMPORTED_MODULE_0___default.a.CancelToken;
      var cancel;

      axios__WEBPACK_IMPORTED_MODULE_0___default.a.get('https://easy-mock.com/mock/5be12b95f7aed41684f2daea/axiosTest/getPersonByGet', {
        cancelToken: new CancelToken(function executor(c) {
          // An executor function receives a cancel function as a parameter
          cancel = c;
        })
      }).catch(error => {
        if (axios__WEBPACK_IMPORTED_MODULE_0___default.a.isCancel(error)) {
          console.log('自己取消了请求', error);
        }
      });

      // cancel the request
      cancel('取消请求');
    },

    handleJump() {
      wx.navigateTo({
        url: '../search-tip/index'
      });
    }
  }
});

/***/ }),

/***/ "./node_modules/mini-css-extract-plugin/dist/loader.js!./node_modules/css-loader/index.js!./node_modules/@megalo/target/lib/frameworks/vue/loader/style.js!./node_modules/less-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js?!./src/pages/index/index.vue?vue&type=style&index=0&id=1badc801&lang=less&scoped=true&":
/*!***************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js!./node_modules/css-loader!./node_modules/@megalo/target/lib/frameworks/vue/loader/style.js!./node_modules/less-loader/dist/cjs.js!./node_modules/vue-loader/lib??vue-loader-options!./src/pages/index/index.vue?vue&type=style&index=0&id=1badc801&lang=less&scoped=true& ***!
  \***************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./src/pages/index/index.js":
/*!**********************************!*\
  !*** ./src/pages/index/index.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _index = _interopRequireDefault(__webpack_require__(/*! ./index */ "./src/pages/index/index.vue"));

var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ "./node_modules/megalo/dist/megalo.mp.esm.js"));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

_index.default.mpType = "page";
var app = new _vue.default(_index.default);
app.$mount();

/***/ }),

/***/ "./src/pages/index/index.vue":
/*!***********************************!*\
  !*** ./src/pages/index/index.vue ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _index_vue_vue_type_template_id_1badc801_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index.vue?vue&type=template&id=1badc801&scoped=true& */ "./src/pages/index/index.vue?vue&type=template&id=1badc801&scoped=true&");
/* harmony import */ var _index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./index.vue?vue&type=script&lang=js& */ "./src/pages/index/index.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _index_vue_vue_type_style_index_0_id_1badc801_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./index.vue?vue&type=style&index=0&id=1badc801&lang=less&scoped=true& */ "./src/pages/index/index.vue?vue&type=style&index=0&id=1badc801&lang=less&scoped=true&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _index_vue_vue_type_template_id_1badc801_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _index_vue_vue_type_template_id_1badc801_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "1badc801",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "src/pages/index/index.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./src/pages/index/index.vue?vue&type=script&lang=js&":
/*!************************************************************!*\
  !*** ./src/pages/index/index.vue?vue&type=script&lang=js& ***!
  \************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_megalo_target_lib_frameworks_vue_loader_script_js_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib!../../../node_modules/@megalo/target/lib/frameworks/vue/loader/script.js!../../../node_modules/vue-loader/lib??vue-loader-options!./index.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js!./node_modules/@megalo/target/lib/frameworks/vue/loader/script.js!./node_modules/vue-loader/lib/index.js?!./src/pages/index/index.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_node_modules_megalo_target_lib_frameworks_vue_loader_script_js_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./src/pages/index/index.vue?vue&type=style&index=0&id=1badc801&lang=less&scoped=true&":
/*!*********************************************************************************************!*\
  !*** ./src/pages/index/index.vue?vue&type=style&index=0&id=1badc801&lang=less&scoped=true& ***!
  \*********************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_index_js_node_modules_megalo_target_lib_frameworks_vue_loader_style_js_node_modules_less_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_1badc801_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/mini-css-extract-plugin/dist/loader.js!../../../node_modules/css-loader!../../../node_modules/@megalo/target/lib/frameworks/vue/loader/style.js!../../../node_modules/less-loader/dist/cjs.js!../../../node_modules/vue-loader/lib??vue-loader-options!./index.vue?vue&type=style&index=0&id=1badc801&lang=less&scoped=true& */ "./node_modules/mini-css-extract-plugin/dist/loader.js!./node_modules/css-loader/index.js!./node_modules/@megalo/target/lib/frameworks/vue/loader/style.js!./node_modules/less-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js?!./src/pages/index/index.vue?vue&type=style&index=0&id=1badc801&lang=less&scoped=true&");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_index_js_node_modules_megalo_target_lib_frameworks_vue_loader_style_js_node_modules_less_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_1badc801_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_index_js_node_modules_megalo_target_lib_frameworks_vue_loader_style_js_node_modules_less_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_1badc801_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_index_js_node_modules_megalo_target_lib_frameworks_vue_loader_style_js_node_modules_less_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_1badc801_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_index_js_node_modules_megalo_target_lib_frameworks_vue_loader_style_js_node_modules_less_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_1badc801_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_index_js_node_modules_megalo_target_lib_frameworks_vue_loader_style_js_node_modules_less_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_1badc801_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./src/pages/index/index.vue?vue&type=template&id=1badc801&scoped=true&":
/*!******************************************************************************!*\
  !*** ./src/pages/index/index.vue?vue&type=template&id=1badc801&scoped=true& ***!
  \******************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_megalo_target_lib_frameworks_vue_loader_template_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_template_id_1badc801_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/@megalo/target/lib/frameworks/vue/loader/template.js??vue-loader-options!../../../node_modules/vue-loader/lib??vue-loader-options!./index.vue?vue&type=template&id=1badc801&scoped=true& */ "./node_modules/@megalo/target/lib/frameworks/vue/loader/template.js?!./node_modules/vue-loader/lib/index.js?!./src/pages/index/index.vue?vue&type=template&id=1badc801&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_megalo_target_lib_frameworks_vue_loader_template_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_template_id_1badc801_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_megalo_target_lib_frameworks_vue_loader_template_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_template_id_1badc801_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

},[["./src/pages/index/index.js","runtime","vendor"]]]);