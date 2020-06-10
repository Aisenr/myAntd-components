'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _DateFormat = require('./DateFormat');

var _DateFormat2 = _interopRequireDefault(_DateFormat);

var _RangeFormat = require('./RangeFormat');

var _RangeFormat2 = _interopRequireDefault(_RangeFormat);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_DateFormat2.default.RangeFormat = _RangeFormat2.default;
_DateFormat2.default.format = function (value, formatter) {
  var newFormatter = formatter || 'YYYY-MM-DD HH:mm:ss';
  return (0, _moment2.default)(new Date(value)).format(newFormatter);
};

exports.default = _DateFormat2.default;