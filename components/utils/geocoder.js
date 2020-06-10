import { convertWgs84ToGcj02 } from '../map-new/utils/coordtransform';

export function getLocation(address) {
  return new Promise((resolve, reject) => {
    AMap.plugin(['AMap.Geocoder'], () => {
      const geocoder = new AMap.Geocoder();
      geocoder.getLocation(address, (status, result) => {
        if (status === 'complete' && result.info === 'OK') {
          resolve(result.geocodes[0]);
        } else {
          reject('查询失败');
        }
      });
    });
  });
}

export function getAddress(location) {
  return new Promise((resolve, reject) => {
    AMap.plugin(['AMap.Geocoder'], () => {
      const geocoder = new AMap.Geocoder();
      const [lng, lat] = convertWgs84ToGcj02(location[0], location[1]);
      const LngLat = new AMap.LngLat(lng, lat);
      geocoder.getAddress(LngLat, (status, result) => {
        if (status === 'complete' && result.info === 'OK') {
          resolve(result.regeocode);
        } else {
          reject('查询失败');
        }
      });
    });
  });
}
