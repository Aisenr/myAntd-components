"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

exports.cluster = cluster;
exports.getExtendedBounds = getExtendedBounds;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function cluster(map, data, clusterGridSize) {
  var clusters = [];
  data.forEach(function (item) {
    addToClosestCluster(map, clusters, item, clusterGridSize);
  });
  return clusters;
}

function addToClosestCluster(map, clusters, item, clusterGridSize) {
  var _clusters$reduce = clusters.reduce(function (r, cluster) {
    // 具有不同图标的数据不能聚合
    if (cluster.markers[0].symbol !== item.symbol) {
      return r;
    }

    var center = cluster.markers[0];
    var d = map.getDistance(center.$baiduPoint, item.$baiduPoint);
    if (d < r.distance) {
      return { distance: d, clusterToAddTo: cluster };
    }
    return r;
  }, { distance: 4000000, clusterToAddTo: null }),
      clusterToAddTo = _clusters$reduce.clusterToAddTo;

  if (clusterToAddTo && clusterToAddTo.gridBounds.containsPoint(item.$baiduPoint)) {
    clusterToAddTo.markers.push(item);
    clusterToAddTo.value[2] += 1;
  } else {
    var value = item instanceof Array ? item : item.value;
    clusters.push((0, _extends3.default)({}, item, {
      value: [value[0], value[1], 1],
      markers: [item],
      gridBounds: getExtendedBounds(map, new BMap.Bounds(item.$baiduPoint, item.$baiduPoint), clusterGridSize)
    }));
  }
}

function getExtendedBounds(map, bounds, width) {
  var height = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : width;

  bounds = cutBoundsInRange(bounds);
  var pixelNE = map.pointToPixel(bounds.getNorthEast());
  var pixelSW = map.pointToPixel(bounds.getSouthWest());
  pixelNE.x += width;
  pixelNE.y -= height;
  pixelSW.x -= width;
  pixelSW.y += height;
  var newNE = map.pixelToPoint(pixelNE);
  var newSW = map.pixelToPoint(pixelSW);
  return new BMap.Bounds(newSW, newNE);
}

function cutBoundsInRange(bounds) {
  var maxX = getRange(bounds.getNorthEast().lng, -180, 180);
  var minX = getRange(bounds.getSouthWest().lng, -180, 180);
  var maxY = getRange(bounds.getNorthEast().lat, -74, 74);
  var minY = getRange(bounds.getSouthWest().lat, -74, 74);
  return new BMap.Bounds(new BMap.Point(minX, minY), new BMap.Point(maxX, maxY));
}

function getRange(i, mix, max) {
  mix && (i = Math.max(i, mix));
  max && (i = Math.min(i, max));
  return i;
}