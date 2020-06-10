'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _radio = require('antd/lib/radio');

var _radio2 = _interopRequireDefault(_radio);

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

require('antd/lib/radio/style');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * 单选组件
 * @description 单选
 * @export  RadioButtonGroup
 * @date    2017-09-21
 * @author  zbs
 */
var RadioButtonGroup = (_temp = _class = function (_React$PureComponent) {
  (0, _inherits3.default)(RadioButtonGroup, _React$PureComponent);

  function RadioButtonGroup() {
    (0, _classCallCheck3.default)(this, RadioButtonGroup);
    return (0, _possibleConstructorReturn3.default)(this, (RadioButtonGroup.__proto__ || (0, _getPrototypeOf2.default)(RadioButtonGroup)).apply(this, arguments));
  }

  (0, _createClass3.default)(RadioButtonGroup, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { style: this.props.style, className: this.props.className },
        _react2.default.createElement(
          _radio2.default.Group,
          { onChange: this.props.onChange, value: this.props.value },
          this.props.options.map(function (item) {
            var _ref = typeof item === 'string' ? { label: item, value: item } : item,
                label = _ref.label,
                value = _ref.value;

            return _react2.default.createElement(
              _radio2.default.Button,
              { key: value, value: value },
              label
            );
          })
        )
      );
    }
  }]);
  return RadioButtonGroup;
}(_react2.default.PureComponent), _class.propTypes = {
  value: _propTypes2.default.any,
  options: _propTypes2.default.array,
  onChange: _propTypes2.default.func
}, _class.defaultProps = {
  options: []
}, _temp);
exports.default = RadioButtonGroup;