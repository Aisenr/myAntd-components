import { convertGcj02ToWgs84, convertWgs84ToGcj02 } from './coordtransform';
import ParseCode from '../../parse-code';
import { convertWgs84ToBd09 } from '../../map/coordtransform';

export function getLocation(address) {
  return new Promise((resolve, reject) => {
    AMap.plugin(['AMap.Geocoder'], () => {
      const geocoder = new AMap.Geocoder();
      geocoder.getLocation(address, (status, result) => {
        if (status === 'complete' && result.info === 'OK') {
          const { location: { lng, lat, ...locRest }, ...rest } = result.geocodes[0];
          const [newLng, newLat] = convertGcj02ToWgs84(lng, lat);
          const newLocation = {
            ...rest,
            location: {
              ...locRest,
              lng: newLng,
              lat: newLat,
            },
          };
          resolve(newLocation);
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

export function getRegionalCoordinates(areaCode) {
  const option = {
    subdistrict: 0,
    showbiz: false,
    extensions: 'all',
  };
  const newAreaCode = areaCode.toString();
  if (newAreaCode === '' || newAreaCode == null) {
    option.level = 'country';
    return initBoundary('中国', option);
  } else if (newAreaCode.length >= 6) {
    option.level = 'district';
    return initBoundary(newAreaCode, option);
  } else {
    option.level = newAreaCode.length === 2 ? 'province' : 'city';
    const obj = ParseCode.getObj(newAreaCode);
    return initBoundary(obj.label, option);
  }
}

function initBoundary(searchParam, option) {
  return new Promise((resolve, reject) => {
    AMap.service('AMap.DistrictSearch', () => {
      const district = new AMap.DistrictSearch(option);
      district.search(searchParam, (status, result) => {
        if (status === 'complete' && result.info === 'OK') {
          const { center: { lng, lat, ...locRest }, boundaries, ...rest } = result.districtList[0];
          const [newLng, newLat] = convertGcj02ToWgs84(lng, lat);
          const newLocation = {
            ...rest,
            center: {
              ...locRest,
              lng: newLng,
              lat: newLat,
            },
          };
          resolve(newLocation);
        } else {
          reject('查询失败');
        }
      });
    });
  });
}

export function getDistance(points) {
  if (points.length < 2) {
    return 0;
  }
  const currentPoints = [];
  for (const point of points) {
    if (!(point instanceof Array)) return 0;
    const [lng, lat] = convertWgs84ToGcj02(point[0], point[1]);
    const LngLat = new AMap.LngLat(lng, lat);
    currentPoints.push(LngLat);
  }
  let totalDis = 0;
  for (let i = 0; i < currentPoints.length - 1; i++) {
    const dis = currentPoints[i].distance(currentPoints[i + 1]);
    totalDis += dis;
  }
  return totalDis;
}

