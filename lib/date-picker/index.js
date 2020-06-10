'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _DatePicker = require('./DatePicker');

var _DatePicker2 = _interopRequireDefault(_DatePicker);

var _RangePicker = require('./RangePicker');

var _RangePicker2 = _interopRequireDefault(_RangePicker);

var _MonthPicker = require('./MonthPicker');

var _MonthPicker2 = _interopRequireDefault(_MonthPicker);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_DatePicker2.default.RangePicker = _RangePicker2.default;
_DatePicker2.default.MonthPicker = _MonthPicker2.default;

exports.default = _DatePicker2.default;