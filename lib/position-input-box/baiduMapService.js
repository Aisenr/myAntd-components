'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getCityName = exports.placeSuggestionJsonp = exports.getAutoComplete = exports.getDrivingRoute = exports.getPointAddress = exports.getAddressPoint = undefined;

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

/**
 * 根据地址信息取得经纬度
 */
var getAddressPoint = exports.getAddressPoint = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(address) {
    var geo;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            geo = new BMap.Geocoder();
            return _context.abrupt('return', new _promise2.default(function (resolve, reject) {
              geo.getPoint(address, function (point) {
                if (!point) {
                  reject();
                } else {
                  resolve([point.lng, point.lat]);
                }
              });
            }));

          case 2:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function getAddressPoint(_x) {
    return _ref.apply(this, arguments);
  };
}();

/**
 * 根据经纬度取得地址信息
 */


var getPointAddress = exports.getPointAddress = function () {
  var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(lng, lat) {
    var bdpoint, geoc;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            // const [bdlng, bdlat] = coordtransform.convertBd09ToWgs84(lng, lat);
            bdpoint = new BMap.Point(lng, lat);
            geoc = new BMap.Geocoder();
            return _context2.abrupt('return', new _promise2.default(function (resolve, reject) {
              geoc.getLocation(bdpoint, function (rs) {
                var addComp = rs.addressComponents;
                resolve(addComp.province + addComp.city + addComp.district + addComp.street + addComp.streetNumber);
              });
            }));

          case 3:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));

  return function getPointAddress(_x2, _x3) {
    return _ref2.apply(this, arguments);
  };
}();

/**
 * 取得驾车路线
 */


var getDrivingRoute = exports.getDrivingRoute = function () {
  var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(start, end) {
    return _regenerator2.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            return _context3.abrupt('return', new _promise2.default(function (resolve, reject) {
              var startPoint = new (Function.prototype.bind.apply(BMap.Point, [null].concat((0, _toConsumableArray3.default)(coordtransform.convertWgs84ToBd09(start[0], start[1])))))();
              var endPoint = new (Function.prototype.bind.apply(BMap.Point, [null].concat((0, _toConsumableArray3.default)(coordtransform.convertWgs84ToBd09(end[0], end[1])))))();
              var driving = new BMap.DrivingRoute(startPoint, { policy: BMap.BMAP_DRIVING_POLICY_LEAST_DISTANCE });
              driving.search(startPoint, endPoint);
              driving.setSearchCompleteCallback(function () {
                if (driving.getResults().getNumPlans() > 0 && driving.getResults().getPlan(0).getNumRoutes() > 0) {
                  var route = driving.getResults().getPlan(0).getRoute(0);
                  resolve({
                    path: route.getPath().map(function (point) {
                      return [point.lng, point.lat];
                    }),
                    distance: route.getDistance(false)
                  });
                } else {
                  reject();
                }
              });
            }));

          case 1:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, this);
  }));

  return function getDrivingRoute(_x4, _x5) {
    return _ref3.apply(this, arguments);
  };
}();

/**
 * 获取自动完成列表
 * @param lng 中心区域横坐标
 * @param lat 中心区域纵坐标
 * @returns {Promise}
 */


var getAutoComplete = exports.getAutoComplete = function () {
  var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(lng, lat, keyword) {
    return _regenerator2.default.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            return _context4.abrupt('return', new _promise2.default(function (resolve, reject) {
              var options = {
                onSearchComplete: function onSearchComplete(results) {
                  if (keyword && results.yr) {
                    resolve(results.yr);
                  } else {
                    reject();
                  }
                }
              };
              var local = new BMap.LocalSearch(new BMap.Point(lng, lat), options);
              local.search(keyword);
              // const ac = new BMap.Autocomplete(options);
            }));

          case 1:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, this);
  }));

  return function getAutoComplete(_x6, _x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();

var placeSuggestionJsonp = exports.placeSuggestionJsonp = function () {
  var _ref5 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5(_ref6) {
    var query = _ref6.query,
        region = _ref6.region;
    return _regenerator2.default.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            return _context5.abrupt('return', (0, _fetchJsonp2.default)('https://api.map.baidu.com/place/v2/suggestion?callback=getData&query=' + query + '&region=' + region + '&coord_type=wgs84ll&output=json&ak=5bAtXh93kV9n8Ce7OKdUH9knxsid78Op', {
              jsonpCallbackFunction: 'getData',
              timeout: 30000
            }).then(function (response) {
              return response.json();
            }));

          case 1:
          case 'end':
            return _context5.stop();
        }
      }
    }, _callee5, this);
  }));

  return function placeSuggestionJsonp(_x9) {
    return _ref5.apply(this, arguments);
  };
}();

/**
 * 根据经纬度取得地址信息
 */


var getCityName = exports.getCityName = function () {
  var _ref7 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee6(address) {
    var geo, bdpoint, geoc;
    return _regenerator2.default.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            geo = new BMap.Geocoder();

            geo.getPoint(address, function (point) {
              geo.getLocation(point, function (result) {});
            });

            bdpoint = new BMap.Point(bdlng, bdlat);
            geoc = new BMap.Geocoder();
            return _context6.abrupt('return', new _promise2.default(function (resolve, reject) {
              geoc.getLocation(bdpoint, function (rs) {
                var addComp = rs.addressComponents;
                resolve(addComp.city);
              });
            }));

          case 5:
          case 'end':
            return _context6.stop();
        }
      }
    }, _callee6, this);
  }));

  return function getCityName(_x10) {
    return _ref7.apply(this, arguments);
  };
}();

var _fetchJsonp = require('fetch-jsonp');

var _fetchJsonp2 = _interopRequireDefault(_fetchJsonp);

var _coordtransform = require('./coordtransform');

var coordtransform = _interopRequireWildcard(_coordtransform);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }