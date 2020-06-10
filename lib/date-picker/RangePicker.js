'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _datePicker = require('antd/lib/date-picker');

var _datePicker2 = _interopRequireDefault(_datePicker);

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

var _class, _temp2;

require('antd/lib/date-picker/style');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var RangePicker = (_temp2 = _class = function (_React$PureComponent) {
  (0, _inherits3.default)(RangePicker, _React$PureComponent);

  function RangePicker() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, RangePicker);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = RangePicker.__proto__ || (0, _getPrototypeOf2.default)(RangePicker)).call.apply(_ref, [this].concat(args))), _this), _this.handleChange = function (dateValue) {
      var showTime = _this.props.showTime;

      var value = !showTime ? dateValue && dateValue.map(function (item) {
        return item.millisecond(0).second(0).minute(0).hour(0).valueOf();
      }) : dateValue && dateValue.map(function (item) {
        return item.valueOf();
      });
      _this.props.onChange(value);
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(RangePicker, [{
    key: 'render',
    value: function render() {
      var value = this.props.value;

      var dateValue = value && value.map(function (item) {
        return item && (0, _moment2.default)(item);
      });
      return _react2.default.createElement(_datePicker2.default.RangePicker, (0, _extends3.default)({}, this.props, { value: dateValue, onChange: this.handleChange }));
    }
  }]);
  return RangePicker;
}(_react2.default.PureComponent), _class.propTypes = _datePicker2.default.RangePicker.propTypes, _class.defaultProps = {
  onChange: function onChange() {}
}, _temp2);
exports.default = RangePicker;