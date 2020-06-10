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

var Scale = (_temp = _class = function (_React$PureComponent) {
  (0, _inherits3.default)(Scale, _React$PureComponent);

  function Scale(props) {
    (0, _classCallCheck3.default)(this, Scale);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Scale.__proto__ || (0, _getPrototypeOf2.default)(Scale)).call(this, props));

    if (typeof window !== 'undefined') {
      if (!props.map) {
        console.warn('没有地图实例；组件必须作为 Map 的子组件使用');
      } else {
        _this.map = props.map;
        _this.element = _this.map.getContainer();
        setTimeout(function () {
          _this.createScale(props);
        }, 13);
      }
    }
    return _this;
  }

  (0, _createClass3.default)(Scale, [{
    key: 'createScale',
    value: function createScale(props) {
      var _this2 = this;

      var option = props.option;

      AMap.plugin(['AMap.Scale'], function () {
        _this2.map.addControl(new AMap.Scale(option));
      });
    }
  }, {
    key: 'render',
    value: function render() {
      return null;
    }
  }]);
  return Scale;
}(_react2.default.PureComponent), _class.propTypes = {
  option: _propTypes2.default.shape({
    show: _propTypes2.default.func,
    hide: _propTypes2.default.func,
    offset: _propTypes2.default.object,
    position: _propTypes2.default.string
  })
}, _class.defaultProps = {
  option: {}
}, _temp);
exports.default = Scale;