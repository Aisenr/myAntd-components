import fetchJsonp from 'fetch-jsonp';
import * as coordtransform from './coordtransform';

/**
 * 根据地址信息取得经纬度
 */
export async function getAddressPoint(address) {
  const geo = new BMap.Geocoder();
  return new Promise((resolve, reject) => {
    geo.getPoint(address, (point) => {
      if (!point) {
        reject();
      } else {
        resolve([point.lng, point.lat]);
      }
    });
  });
}

/**
 * 根据经纬度取得地址信息
 */
export async function getPointAddress(lng, lat) {
  // const [bdlng, bdlat] = coordtransform.convertBd09ToWgs84(lng, lat);
  const bdpoint = new BMap.Point(lng, lat);
  const geoc = new BMap.Geocoder();
  return new Promise((resolve, reject) => {
    geoc.getLocation(bdpoint, (rs) => {
      const addComp = rs.addressComponents;
      resolve(addComp.province + addComp.city + addComp.district + addComp.street + addComp.streetNumber);
    });
  });
}

/**
 * 取得驾车路线
 */
export async function getDrivingRoute(start, end) {
  return new Promise((resolve, reject) => {
    const startPoint = new BMap.Point(...coordtransform.convertWgs84ToBd09(start[0], start[1]));
    const endPoint = new BMap.Point(...coordtransform.convertWgs84ToBd09(end[0], end[1]));
    const driving = new BMap.DrivingRoute(startPoint, { policy: BMap.BMAP_DRIVING_POLICY_LEAST_DISTANCE });
    driving.search(startPoint, endPoint);
    driving.setSearchCompleteCallback(() => {
      if (driving.getResults().getNumPlans() > 0 && driving.getResults().getPlan(0).getNumRoutes() > 0) {
        const route = driving.getResults().getPlan(0).getRoute(0);
        resolve({
          path: route.getPath().map(point => [point.lng, point.lat]),
          distance: route.getDistance(false),
        });
      } else {
        reject();
      }
    });
  });
}

/**
 * 获取自动完成列表
 * @param lng 中心区域横坐标
 * @param lat 中心区域纵坐标
 * @returns {Promise}
 */
export async function getAutoComplete(lng, lat, keyword) {
  return new Promise((resolve, reject) => {
    const options = {
      onSearchComplete: (results) => {
        if (keyword && results.yr) {
          resolve(results.yr);
        } else {
          reject();
        }
      },
    };
    const local = new BMap.LocalSearch(new BMap.Point(lng, lat), options);
    local.search(keyword);
    // const ac = new BMap.Autocomplete(options);
  });
}

export async function placeSuggestionJsonp({ query, region }) {
  return fetchJsonp(`https://api.map.baidu.com/place/v2/suggestion?callback=getData&query=${query}&region=${region}&coord_type=wgs84ll&output=json&ak=5bAtXh93kV9n8Ce7OKdUH9knxsid78Op`, {
    jsonpCallbackFunction: 'getData',
    timeout: 30000,
  }).then(response => response.json());
}

/**
 * 根据经纬度取得地址信息
 */
export async function getCityName(address) {
  const geo = new BMap.Geocoder();
  geo.getPoint(address, (point) => {
    geo.getLocation(point, (result) => {
    });
  });


  const bdpoint = new BMap.Point(bdlng, bdlat);
  const geoc = new BMap.Geocoder();
  return new Promise((resolve, reject) => {
    geoc.getLocation(bdpoint, (rs) => {
      const addComp = rs.addressComponents;
      resolve(addComp.city);
    });
  });
}

