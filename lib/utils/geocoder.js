'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

exports.getLocation = getLocation;
exports.getAddress = getAddress;

var _coordtransform = require('../map-new/utils/coordtransform');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getLocation(address) {
  return new _promise2.default(function (resolve, reject) {
    AMap.plugin(['AMap.Geocoder'], function () {
      var geocoder = new AMap.Geocoder();
      geocoder.getLocation(address, function (status, result) {
        if (status === 'complete' && result.info === 'OK') {
          resolve(result.geocodes[0]);
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