'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * 行尾省略号组件
 * @description 当一行内容过多时，行尾显示省略号
 * @export  Ellipsis
 * @date    2017-09-21
 * @author  zbs
 */
var Ellipsis = function Ellipsis(_ref) {
  var value = _ref.value;

  var prefixCls = 'bis-ellipsis';
  return _react2.default.createElement(
    'span',
    { className: prefixCls, title: value },
    value
  );
};

exports.default = Ellipsis;