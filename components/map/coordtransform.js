import coordtransform from 'coordtransform';

export function convertWgs84ToBd09(lng, lat) {
  const [ogcj02Lng, ogcj02Lat] = coordtransform.wgs84togcj02(lng, lat);
  return coordtransform.gcj02tobd09(ogcj02Lng, ogcj02Lat);
}

export function convertBd09ToWgs84(lng, lat) {
  const [ogcj02Lng, ogcj02Lat] = coordtransform.bd09togcj02(lng, lat);
  return coordtransform.gcj02towgs84(ogcj02Lng, ogcj02Lat);
}

export function getDistance(points) {
  if (points.length < 2) {
    return 0;
  }
  const map = new BMap.Map();
  let totalDis = 0;
  for (let i = 0; i < points.length - 1; i++) {
    const curPt = convertWgs84ToBd09(points[i][0], points[i][1]);
    const nextPt = convertWgs84ToBd09(points[i + 1][0], points[i + 1][1]);
    const dis = map.getDistance(new BMap.Point(curPt[0], curPt[1]), new BMap.Point(nextPt[0], nextPt[1]));
    totalDis += dis;
  }
  return totalDis;
}
