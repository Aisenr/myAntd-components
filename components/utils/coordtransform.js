import coordtransform from 'coordtransform';

/**
 * 地球坐标转国测局坐标
 * @param lng
 * @param lat
 * @returns {*}
 */
export function convertWgs84ToGcj02(lng, lat) {
  return coordtransform.wgs84togcj02(lng, lat);
}

/**
 * 国测局坐标转地球坐标
 * @param lng
 * @param lat
 * @returns {*}
 */
export function convertGcj02ToWgs84(lng, lat) {
  return coordtransform.gcj02towgs84(lng, lat);
}
