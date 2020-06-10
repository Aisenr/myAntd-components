'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getObj = exports.cityOptions = exports.areaOptions = exports.areaObj = undefined;

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _provinces = require('china-division/dist/provinces.json');

var _provinces2 = _interopRequireDefault(_provinces);

var _cities = require('china-division/dist/cities.json');

var _cities2 = _interopRequireDefault(_cities);

var _areas = require('china-division/dist/areas.json');

var _areas2 = _interopRequireDefault(_areas);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_areas2.default.forEach(function (area) {
  var matchCity = _cities2.default.filter(function (city) {
    return city.code === area.parent_code;
  })[0];
  if (matchCity) {
    matchCity.children = matchCity.children || [];
    matchCity.children.push({
      label: area.name,
      value: area.code
    });
  }
});

var areaObj = exports.areaObj = function areaObj(restrict) {
  var areaArr = _areas2.default.filter(function (area) {
    return area.code === restrict;
  });
  var newAreaArr = [];
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = (0, _getIterator3.default)(areaArr), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var item = _step.value;

      newAreaArr.push({
        label: item.name,
        value: item.code
      });
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

  return newAreaArr;
};

var areaOptions = exports.areaOptions = function areaOptions(cityCode) {
  if (!cityCode) {
    return _areas2.default;
  } else {
    var newOption = _cities2.default.filter(function (item) {
      return item.code === cityCode;
    })[0];
    return newOption ? newOption.children : [];
  }
};

_cities2.default.forEach(function (city) {
  var matchProvince = _provinces2.default.filter(function (province) {
    return province.code === city.parent_code;
  })[0];
  if (matchProvince) {
    matchProvince.children = matchProvince.children || [];
    matchProvince.children.push({
      label: city.name,
      value: city.code,
      children: city.children
    });
  }
});

var options = _provinces2.default.map(function (province) {
  return {
    label: province.name,
    value: province.code,
    children: province.children
  };
});

var cityOptions = exports.cityOptions = function cityOptions(provinceCode) {
  if (!provinceCode) {
    return _cities2.default;
  } else {
    var newOption = options.filter(function (item) {
      return item.value === provinceCode;
    })[0];
    return newOption ? newOption.children : [];
  }
};

var getObj = exports.getObj = function getObj(code) {
  if (code == null) {
    return {};
  }
  var array = void 0;
  if (code.length === 2) {
    array = _provinces2.default;
  } else if (code.length === 4) {
    array = _cities2.default;
  } else if (code.length === 6) {
    array = _areas2.default;
  } else {
    array = [];
  }
  var _iteratorNormalCompletion2 = true;
  var _didIteratorError2 = false;
  var _iteratorError2 = undefined;

  try {
    for (var _iterator2 = (0, _getIterator3.default)(array), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
      var value = _step2.value;

      if (value.code === code) {
        return { label: value.name, value: value.code, children: value.children };
      }
    }
  } catch (err) {
    _didIteratorError2 = true;
    _iteratorError2 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion2 && _iterator2.return) {
        _iterator2.return();
      }
    } finally {
      if (_didIteratorError2) {
        throw _iteratorError2;
      }
    }
  }

  return {};
};

exports.default = options;