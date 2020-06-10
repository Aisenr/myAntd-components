'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DEFAULT_CONFIG = {
  v: '1.4.6',
  hostAndPath: 'webapi.amap.com/maps',
  key: '8af8372cd8cf352d0862abf8f97050e7',
  callback: '__amap_init_callback',
  useAMapUI: false
};

var mainPromise = null;
var amapuiPromise = null;
var amapuiInited = false;

var APILoader = function () {
  function APILoader(_ref) {
    var key = _ref.key,
        useAMapUI = _ref.useAMapUI,
        version = _ref.version,
        protocol = _ref.protocol;
    (0, _classCallCheck3.default)(this, APILoader);

    this.config = (0, _extends3.default)({}, DEFAULT_CONFIG, { useAMapUI: useAMapUI, protocol: protocol });
    if (typeof window !== 'undefined') {
      if (key) {
        this.config.key = key;
      } else if ('amapkey' in window) {
        this.config.key = window.amapkey;
      }
    }
    if (version) {
      this.config.v = version;
    }
    this.protocol = protocol || window.location.protocol;
    if (this.protocol.indexOf(':') === -1) {
      this.protocol += ':';
    }
  }

  (0, _createClass3.default)(APILoader, [{
    key: 'getScriptSrc',
    value: function getScriptSrc(cfg) {
      return this.protocol + '//' + cfg.hostAndPath + '?v=' + cfg.v + '&key=' + cfg.key + '&callback=' + cfg.callback;
    }
  }, {
    key: 'buildScriptTag',
    value: function buildScriptTag(src) {
      var script = document.createElement('script');
      script.type = 'text/javascript';
      script.async = true;
      script.defer = true;
      script.src = src;
      return script;
    }
  }, {
    key: 'getAmapuiPromise',
    value: function getAmapuiPromise() {
      var script = this.buildScriptTag(this.protocol + '//webapi.amap.com/ui/1.0/main-async.js');
      var p = new _promise2.default(function (resolve) {
        script.onload = function () {
          resolve();
        };
      });
      document.body.appendChild(script);
      return p;
    }
  }, {
    key: 'getMainPromise',
    value: function getMainPromise() {
      var _this = this;

      var script = this.buildScriptTag(this.getScriptSrc(this.config));
      var p = new _promise2.default(function (resolve) {
        window[_this.config.callback] = function () {
          resolve();
          delete window[_this.config.callback];
        };
      });
      document.body.appendChild(script);
      return p;
    }
  }, {
    key: 'load',
    value: function load() {
      if (typeof window === 'undefined') {
        return null;
      }
      var useAMapUI = this.config.useAMapUI;

      mainPromise = mainPromise || this.getMainPromise();
      if (useAMapUI) {
        amapuiPromise = amapuiPromise || this.getAmapuiPromise();
      }
      return new _promise2.default(function (resolve) {
        mainPromise.then(function () {
          if (useAMapUI && amapuiPromise) {
            amapuiPromise.then(function () {
              if (window.initAMapUI && !amapuiInited) {
                window.initAMapUI();
                if (typeof useAMapUI === 'function') {
                  useAMapUI();
                }
                amapuiInited = true;
              }
              resolve();
            });
          } else {
            resolve();
          }
        });
      });
    }
  }]);
  return APILoader;
}();

exports.default = APILoader;