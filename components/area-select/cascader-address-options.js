import provinces from 'china-division/dist/provinces.json';
import cities from 'china-division/dist/cities.json';
import areas from 'china-division/dist/areas.json';

areas.forEach((area) => {
  const matchCity = cities.filter(city => city.code === area.parent_code)[0];
  if (matchCity) {
    matchCity.children = matchCity.children || [];
    matchCity.children.push({
      label: area.name,
      value: area.code,
    });
  }
});

export const areaObj = (restrict) => {
  const areaArr = areas.filter(area => area.code === restrict);
  const newAreaArr = [];
  for (const item of areaArr) {
    newAreaArr.push({
      label: item.name,
      value: item.code,
    });
  }
  return newAreaArr;
};

export const areaOptions = (cityCode) => {
  if (!cityCode) {
    return areas;
  } else {
    const newOption = cities.filter((item) => {
      return item.code === cityCode;
    })[0];
    return newOption ? newOption.children : [];
  }
};

cities.forEach((city) => {
  const matchProvince = provinces.filter(province => province.code === city.parent_code)[0];
  if (matchProvince) {
    matchProvince.children = matchProvince.children || [];
    matchProvince.children.push({
      label: city.name,
      value: city.code,
      children: city.children,
    });
  }
});

const options = provinces.map(province => ({
  label: province.name,
  value: province.code,
  children: province.children,
}));

export const cityOptions = (provinceCode) => {
  if (!provinceCode) {
    return cities;
  } else {
    const newOption = options.filter((item) => {
      return item.value === provinceCode;
    })[0];
    return newOption ? newOption.children : [];
  }
};

export const getObj = (code) => {
  if (code == null) {
    return {};
  }
  let array;
  if (code.length === 2) {
    array = provinces;
  } else if (code.length === 4) {
    array = cities;
  } else if (code.length === 6) {
    array = areas;
  } else {
    array = [];
  }
  for (const value of array) {
    if (value.code === code) {
      return { label: value.name, value: value.code, children: value.children };
    }
  }
  return {};
};

export default options;
