'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.convertWgs84ToGcj02 = convertWgs84ToGcj02;
exports.convertGcj02ToWgs84 = convertGcj02ToWgs84;

var _coordtransform = require('coordtransform');

var _coordtransform2 = _interopRequireDefault(_coordtransform);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * 地球坐标转国测局坐标
 * @param lng
 * @param lat
 * @returns {*}
 */
function convertWgs84ToGcj02(lng, lat) {
  return _coordtransform2.default.wgs84togcj02(lng, lat);
}

/**
 * 国测局坐标转地球坐标
 * @param lng
 * @param lat
 * @returns {*}
 */
function convertGcj02ToWgs84(lng, lat) {
  return _coordtransform2.default.gcj02towgs84(lng, lat);
}