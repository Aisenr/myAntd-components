'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * 数字格式化方法
 * @description 给数字添加逗号分隔符
 * @export  numberFormat
 * @date    2017-09-21
 * @author  zbs
 */
var NumberFormat = function NumberFormat(_ref) {
  var value = _ref.value,
      decimalPlaces = _ref.decimalPlaces;

  if (!value && value !== 0) return '';
  var strValue = value.toString();
  if (decimalPlaces) {
    var newValue = value.toFixed(parseInt(decimalPlaces) + 1);
    strValue = newValue.substring(0, newValue.toString().lastIndexOf('.') + parseInt(decimalPlaces) + 1);
  }
  var pointPlace = strValue.indexOf('.');
  if (pointPlace !== -1) {
    var intValue = strValue.substring(0, pointPlace);
    return _react2.default.createElement(
      'span',
      null,
      intValue.replace(/\B(?=(\d{3})+(?!\d))/g, ',') + '.' + strValue.substring(strValue.indexOf('.') + 1)
    );
  } else {
    return _react2.default.createElement(
      'span',
      null,
      strValue.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    );
  }
};

exports.default = NumberFormat;