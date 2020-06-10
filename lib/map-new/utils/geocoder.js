'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

exports.getLocation = getLocation;
exports.getAddress = getAddress;
exports.getRegionalCoordinates = getRegionalCoordinates;
exports.getDistance = getDistance;

var _coordtransform = require('./coordtransform');

var _parseCode = require('../../parse-code');

var _parseCode2 = _interopRequireDefault(_parseCode);

var _coordtransform2 = require('../../map/coordtransform');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getLocation(address) {
  return new _promise2.default(function (resolve, reject) {
    AMap.plugin(['AMap.Geocoder'], function () {
      var geocoder = new AMap.Geocoder();
      geocoder.getLocation(address, function (status, result) {
        if (status === 'complete' && result.info === 'OK') {
          var _result$geocodes$ = result.geocodes[0],
              _result$geocodes$$loc = _result$geocodes$.location,
              lng = _result$geocodes$$loc.lng,
              lat = _result$geocodes$$loc.lat,
              locRest = (0, _objectWithoutProperties3.default)(_result$geocodes$$loc, ['lng', 'lat']),
              rest = (0, _objectWithoutProperties3.default)(_result$geocodes$, ['location']);

          var _convertGcj02ToWgs = (0, _coordtransform.convertGcj02ToWgs84)(lng, lat),
              _convertGcj02ToWgs2 = (0, _slicedToArray3.default)(_convertGcj02ToWgs, 2),
              newLng = _convertGcj02ToWgs2[0],
              newLat = _convertGcj02ToWgs2[1];

          var newLocation = (0, _extends3.default)({}, rest, {
            location: (0, _extends3.default)({}, locRest, {
              lng: newLng,
              lat: newLat
            })
          });
          resolve(newLocation);
        } else {
          reject('查询失败');
        }
      });
    });
  });
}

function getAddress(location) {
  return new _promise2.default(function (resolve, reject) {
    AMap.plugin(['AMap.Geocoder'], function () {
      var geocoder = new AMap.Geocoder();

      var _convertWgs84ToGcj = (0, _coordtransform.convertWgs84ToGcj02)(location[0], location[1]),
          _convertWgs84ToGcj2 = (0, _slicedToArray3.default)(_convertWgs84ToGcj, 2),
          lng = _convertWgs84ToGcj2[0],
          lat = _convertWgs84ToGcj2[1];

      var LngLat = new AMap.LngLat(lng, lat);
      geocoder.getAddress(LngLat, function (status, result) {
        if (status === 'complete' && result.info === 'OK') {
          resolve(result.regeocode);
        } else {
          reject('查询失败');
        }
      });
    });
  });
}

function getRegionalCoordinates(areaCode) {
  var option = {
    subdistrict: 0,
    showbiz: false,
    extensions: 'all'
  };
  var newAreaCode = areaCode.toString();
  if (newAreaCode === '' || newAreaCode == null) {
    option.level = 'country';
    return initBoundary('中国', option);
  } else if (newAreaCode.length >= 6) {
    option.level = 'district';
    return initBoundary(newAreaCode, option);
  } else {
    option.level = newAreaCode.length === 2 ? 'province' : 'city';
    var obj = _parseCode2.default.getObj(newAreaCode);
    return initBoundary(obj.label, option);
  }
}

function initBoundary(searchParam, option) {
  return new _promise2.default(function (resolve, reject) {
    AMap.service('AMap.DistrictSearch', function () {
      var district = new AMap.DistrictSearch(option);
      district.search(searchParam, function (status, result) {
        if (status === 'complete' && result.info === 'OK') {
          var _result$districtList$ = result.districtList[0],
              _result$districtList$2 = _result$districtList$.center,
              lng = _result$districtList$2.lng,
              lat = _result$districtList$2.lat,
              locRest = (0, _objectWithoutProperties3.default)(_result$districtList$2, ['lng', 'lat']),
              boundaries = _result$districtList$.boundaries,
              rest = (0, _objectWithoutProperties3.default)(_result$districtList$, ['center', 'boundaries']);

          var _convertGcj02ToWgs3 = (0, _coordtransform.convertGcj02ToWgs84)(lng, lat),
              _convertGcj02ToWgs4 = (0, _slicedToArray3.default)(_convertGcj02ToWgs3, 2),
              newLng = _convertGcj02ToWgs4[0],
              newLat = _convertGcj02ToWgs4[1];

          var newLocation = (0, _extends3.default)({}, rest, {
            center: (0, _extends3.default)({}, locRest, {
              lng: newLng,
              lat: newLat
            })
          });
          resolve(newLocation);
        } else {
          reject('查询失败');
        }
      });
    });
  });
}

function getDistance(points) {
  if (points.length < 2) {
    return 0;
  }
  var currentPoints = [];
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = (0, _getIterator3.default)(points), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var point = _step.value;

      if (!(point instanceof Array)) return 0;

      var _convertWgs84ToGcj3 = (0, _coordtransform.convertWgs84ToGcj02)(point[0], point[1]),
          _convertWgs84ToGcj4 = (0, _slicedToArray3.default)(_convertWgs84ToGcj3, 2),
          lng = _convertWgs84ToGcj4[0],
          lat = _convertWgs84ToGcj4[1];

      var LngLat = new AMap.LngLat(lng, lat);
      currentPoints.push(LngLat);
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

  var totalDis = 0;
  for (var i = 0; i < currentPoints.length - 1; i++) {
    var dis = currentPoints[i].distance(currentPoints[i + 1]);
    totalDis += dis;
  }
  return totalDis;
}