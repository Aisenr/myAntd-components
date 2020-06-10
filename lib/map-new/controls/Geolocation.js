'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _class, _temp;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Geolocation = (_temp = _class = function (_React$PureComponent) {
  (0, _inherits3.default)(Geolocation, _React$PureComponent);

  function Geolocation(props) {
    (0, _classCallCheck3.default)(this, Geolocation);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Geolocation.__proto__ || (0, _getPrototypeOf2.default)(Geolocation)).call(this, props));

    if (typeof window !== 'undefined') {
      if (!props.map) {
        console.warn('没有地图实例；组件必须作为 Map 的子组件使用');
      } else {
        _this.map = props.map;
        _this.element = _this.map.getContainer();
        setTimeout(function () {
          _this.createGeolocation(props);
        }, 13);
      }
    }
    return _this;
  }

  (0, _createClass3.default)(Geolocation, [{
    key: 'createGeolocation',
    value: function createGeolocation(props) {
      var _this2 = this;

      var option = props.option;

      AMap.plugin(['AMap.Geolocation'], function () {
        _this2.map.addControl(new AMap.Geolocation(option));
      });
    }
  }, {
    key: 'render',
    value: function render() {
      return null;
    }
  }]);
  return Geolocation;
}(_react2.default.PureComponent), _class.propTypes = {
  option: _propTypes2.default.object
}, _class.defaultProps = {
  option: {}
}, _temp);
exports.default = Geolocation;