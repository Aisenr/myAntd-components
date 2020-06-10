import coordtransform from 'coordtransform';

export function convertWgs84ToBd09(lng, lat) {
  const [ogcj02Lng, ogcj02Lat] = coordtransform.wgs84togcj02(lng, lat);
  return coordtransform.gcj02tobd09(ogcj02Lng, ogcj02Lat);
}

export function convertBd09ToWgs84(lng, lat) {
  const [ogcj02Lng, ogcj02Lat] = coordtransform.bd09togcj02(lng, lat);
  return coordtransform.gcj02towgs84(ogcj02Lng, ogcj02Lat);
}
