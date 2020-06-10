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

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * 日期、时间格式化
 * @description 日期、时间格式化
 * @export  DateFormat
 * @date    2017-09-21
 * @author  zbs
 */
var DateFormat = (_temp = _class = function (_React$PureComponent) {
  (0, _inherits3.default)(DateFormat, _React$PureComponent);

  function DateFormat() {
    (0, _classCallCheck3.default)(this, DateFormat);
    return (0, _possibleConstructorReturn3.default)(this, (DateFormat.__proto__ || (0, _getPrototypeOf2.default)(DateFormat)).apply(this, arguments));
  }

  (0, _createClass3.default)(DateFormat, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          value = _props.value,
          _props$format = _props.format,
          format = _props$format === undefined ? 'YYYY-MM-DD HH:mm:ss' : _props$format;

      if (!(0, _moment2.default)(value).isValid()) {
        console.warn('Invalid date ');
        return '';
      }
      return (0, _moment2.default)(new Date(value)).format(format);
    }
  }]);
  return DateFormat;
}(_react2.default.PureComponent), _class.defaultProps = {
  value: '',
  format: 'YYYY-MM-DD HH:mm:ss'
}, _class.propTypes = {
  value: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number]),
  format: _propTypes2.default.string
}, _temp);
exports.default = DateFormat;