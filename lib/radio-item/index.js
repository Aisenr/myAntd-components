'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

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

var _radio = require('antd/lib/radio');

var _radio2 = _interopRequireDefault(_radio);

require('antd/lib/radio/style');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var RadioGroup = _radio2.default.Group;

/**
 * 单选框
 * @description 表单元素
 * @export  RadioItem
 * @date    2017-09-28
 * @author  zbs
 */

var RadioItem = function (_React$Component) {
  (0, _inherits3.default)(RadioItem, _React$Component);

  function RadioItem() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, RadioItem);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = RadioItem.__proto__ || (0, _getPrototypeOf2.default)(RadioItem)).call.apply(_ref, [this].concat(args))), _this), _this.onChange = function (e) {
      _this.setState({
        value: e.target.value
      });
      _this.props.onChange(e);
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(RadioItem, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        RadioGroup,
        (0, _extends3.default)({}, this.props, { onchange: this.onchange }),
        this.props.items && this.props.items.map(function (item, index) {
          return _react2.default.createElement(
            _radio2.default,
            { key: item.key || index, value: item.value },
            item.text
          );
        })
      );
    }
  }]);
  return RadioItem;
}(_react2.default.Component);

exports.default = RadioItem;