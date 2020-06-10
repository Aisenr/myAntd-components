'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

exports.convertWgs84ToBd09 = convertWgs84ToBd09;
exports.convertBd09ToWgs84 = convertBd09ToWgs84;
exports.getDistance = getDistance;

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

function getDistance(points) {
  if (points.length < 2) {
    return 0;
  }
  var map = new BMap.Map();
  var totalDis = 0;
  for (var i = 0; i < points.length - 1; i++) {
    var curPt = convertWgs84ToBd09(points[i][0], points[i][1]);
    var nextPt = convertWgs84ToBd09(points[i + 1][0], points[i + 1][1]);
    var dis = map.getDistance(new BMap.Point(curPt[0], curPt[1]), new BMap.Point(nextPt[0], nextPt[1]));
    totalDis += dis;
  }
  return totalDis;
}