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

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var RangeFormat = (_temp = _class = function (_React$PureComponent) {
  (0, _inherits3.default)(RangeFormat, _React$PureComponent);

  function RangeFormat() {
    (0, _classCallCheck3.default)(this, RangeFormat);
    return (0, _possibleConstructorReturn3.default)(this, (RangeFormat.__proto__ || (0, _getPrototypeOf2.default)(RangeFormat)).apply(this, arguments));
  }

  (0, _createClass3.default)(RangeFormat, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          _props$prefixCls = _props.prefixCls,
          prefixCls = _props$prefixCls === undefined ? 'bis-date-format' : _props$prefixCls,
          className = _props.className,
          style = _props.style,
          value = _props.value,
          format = _props.format;

      if (value.length <= 0) {
        return '';
      }
      return _react2.default.createElement(
        'span',
        { className: (0, _classnames2.default)(prefixCls, className), style: style },
        (0, _moment2.default)(new Date(value[0])).format(format),
        _react2.default.createElement(
          'span',
          { className: prefixCls + '-interval' },
          '\u81F3'
        ),
        (0, _moment2.default)(new Date(value[1])).format(format)
      );
    }
  }]);
  return RangeFormat;
}(_react2.default.PureComponent), _class.defaultProps = {
  value: [],
  format: 'YYYY-MM-DD'
}, _temp);
exports.default = RangeFormat;