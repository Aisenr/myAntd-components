'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

exports.convertWgs84ToBd09 = convertWgs84ToBd09;
exports.convertBd09ToWgs84 = convertBd09ToWgs84;

var _coordtransform = require('coordtransform');

var _coordtransform2 = _interopRequireDefault(_coordtransform);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function convertWgs84ToBd09(lng, lat) {
  var _coordtransform$wgs = _coordtransform2.default.wgs84togcj02(lng, lat),
      _coordtransform$wgs2 = (0, _slicedToArray3.default)(_coordtransform$wgs, 2),
      ogcj02Lng = _coordtransform$wgs2[0],
      ogcj02Lat = _coordtransform$wgs2[1];

  return _coordtransform2.default.gcj02tobd09(ogcj02Lng, ogcj02Lat);
}

function convertBd09ToWgs84(lng, lat) {
  var _coordtransform$bd09t = _coordtransform2.default.bd09togcj02(lng, lat),
      _coordtransform$bd09t2 = (0, _slicedToArray3.default)(_coordtransform$bd09t, 2),
      ogcj02Lng = _coordtransform$bd09t2[0],
      ogcj02Lat = _coordtransform$bd09t2[1];

  return _coordtransform2.default.gcj02towgs84(ogcj02Lng, ogcj02Lat);
}