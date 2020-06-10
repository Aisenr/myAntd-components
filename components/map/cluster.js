export function cluster(map, data, clusterGridSize) {
  const clusters = [];
  data.forEach((item) => {
    addToClosestCluster(map, clusters, item, clusterGridSize);
  });
  return clusters;
}

function addToClosestCluster(map, clusters, item, clusterGridSize) {
  const { clusterToAddTo } = clusters.reduce((r, cluster) => {
    // 具有不同图标的数据不能聚合
    if (cluster.markers[0].symbol !== item.symbol) {
      return r;
    }

    const center = cluster.markers[0];
    const d = map.getDistance(center.$baiduPoint, item.$baiduPoint);
    if (d < r.distance) {
      return { distance: d, clusterToAddTo: cluster };
    }
    return r;
  }, { distance: 4000000, clusterToAddTo: null });

  if (clusterToAddTo && clusterToAddTo.gridBounds.containsPoint(item.$baiduPoint)) {
    clusterToAddTo.markers.push(item);
    clusterToAddTo.value[2] += 1;
  } else {
    const value = item instanceof Array ? item : item.value;
    clusters.push({
      ...item,
      value: [value[0], value[1], 1],
      markers: [item],
      gridBounds: getExtendedBounds(map, new BMap.Bounds(item.$baiduPoint, item.$baiduPoint), clusterGridSize),
    });
  }
}

export function getExtendedBounds(map, bounds, width, height = width) {
  bounds = cutBoundsInRange(bounds);
  const pixelNE = map.pointToPixel(bounds.getNorthEast());
  const pixelSW = map.pointToPixel(bounds.getSouthWest());
  pixelNE.x += width;
  pixelNE.y -= height;
  pixelSW.x -= width;
  pixelSW.y += height;
  const newNE = map.pixelToPoint(pixelNE);
  const newSW = map.pixelToPoint(pixelSW);
  return new BMap.Bounds(newSW, newNE);
}

function cutBoundsInRange(bounds) {
  const maxX = getRange(bounds.getNorthEast().lng, -180, 180);
  const minX = getRange(bounds.getSouthWest().lng, -180, 180);
  const maxY = getRange(bounds.getNorthEast().lat, -74, 74);
  const minY = getRange(bounds.getSouthWest().lat, -74, 74);
  return new BMap.Bounds(new BMap.Point(minX, minY), new BMap.Point(maxX, maxY));
}

function getRange(i, mix, max) {
  mix && (i = Math.max(i, mix));
  max && (i = Math.min(i, max));
  return i;
}
