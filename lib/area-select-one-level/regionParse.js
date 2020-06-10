'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = regionParse;

var _parseCode = require('../parse-code');

var _parseCode2 = _interopRequireDefault(_parseCode);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function regionParse() {
  var regionCodes = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

  return regionCodes.map(function (item) {
    var regionObj = _parseCode2.default.getObj(item.toString());
    if (regionObj.label === '市辖区') {
      regionObj = _parseCode2.default.getObj(item.toString().substr(0, 2));
    }
    return regionObj;
  });
}