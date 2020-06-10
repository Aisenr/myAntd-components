'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

exports.default = regionParse;

var _parseCode = require('../parse-code');

var _parseCode2 = _interopRequireDefault(_parseCode);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function regionParse() {
  var regionCodes = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

  var provinces = [];
  var provinceCodes = [];
  var cities = [];
  var cityCodes = [];
  var areas = [];
  var areaCodes = [];
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = (0, _getIterator3.default)(regionCodes), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var code = _step.value;

      var codeString = code.toString();
      var obj = _parseCode2.default.getObj(codeString);
      var codeLength = codeString.length;
      if (codeLength === 2 && !provinceCodes.includes(codeString)) {
        provinceCodes.push(codeString);
        provinces.push(obj);
      } else if (codeLength === 4 && !cityCodes.includes(codeString)) {
        cityCodes.push(codeString);
        cities.push(obj);
        if (!provinceCodes.includes(codeString.substr(0, 2))) {
          provinceCodes.push(codeString.substr(0, 2));
          provinces.push(_parseCode2.default.getObj(codeString));
        }
      } else if (codeLength === 6 && !areaCodes.includes(code)) {
        areas.push(obj);
        areaCodes.push(code);
        if (!cityCodes.includes(codeString.substr(0, 4))) {
          cityCodes.push(codeString);
          cities.push(obj);
        }
        if (!provinceCodes.includes(codeString.substr(0, 2))) {
          provinceCodes.push(codeString.substr(0, 2));
          provinces.push(_parseCode2.default.getObj(codeString));
        }
      }
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  areas.forEach(function (area) {
    var matchCity = cities.filter(function (city) {
      return city.value === area.value.substr(0, 4);
    })[0];
    if (matchCity) {
      matchCity.children = matchCity.children || [];
      matchCity.children.push({
        label: area.label,
        value: area.value
      });
    }
  });

  cities.forEach(function (city) {
    var matchProvince = provinces.filter(function (province) {
      return province.value === city.value.substr(0, 2);
    })[0];
    if (matchProvince) {
      matchProvince.children = matchProvince.children || [];
      matchProvince.children.push({
        label: city.label,
        value: city.value,
        children: city.children
      });
    }
  });

  return provinces;
}