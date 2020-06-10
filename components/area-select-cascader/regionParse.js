import ParseCode from '../parse-code';

export default function regionParse(regionCodes = []) {
  const provinces = [];
  const provinceCodes = [];
  const cities = [];
  const cityCodes = [];
  const areas = [];
  const areaCodes = [];
  for (const code of regionCodes) {
    const codeString = code.toString();
    const obj = ParseCode.getObj(codeString);
    const codeLength = codeString.length;
    if (codeLength === 2 && !provinceCodes.includes(codeString)) {
      provinceCodes.push(codeString);
      provinces.push(obj);
    } else if (codeLength === 4 && !cityCodes.includes(codeString)) {
      cityCodes.push(codeString);
      cities.push(obj);
      if (!provinceCodes.includes(codeString.substr(0, 2))) {
        provinceCodes.push(codeString.substr(0, 2));
        provinces.push(ParseCode.getObj(codeString.substr(0, 2)));
      }
    } else if (codeLength === 6 && !areaCodes.includes(code)) {
      areas.push(obj);
      areaCodes.push(code);
      if (!cityCodes.includes(codeString.substr(0, 4))) {
        cityCodes.push(codeString.substr(0, 4));
        cities.push(ParseCode.getObj(codeString.substr(0, 4)));
      }
      if (!provinceCodes.includes(codeString.substr(0, 2))) {
        provinceCodes.push(codeString.substr(0, 2));
        provinces.push(ParseCode.getObj(codeString.substr(0, 2)));
      }
    }
  }

  areas.forEach((area) => {
    const matchCity = cities.filter(city => city.value === area.value.substr(0, 4))[0];
    if (matchCity) {
      matchCity.children = matchCity.children || [];
      matchCity.children.push({
        label: area.label,
        value: area.value,
      });
    }
  });

  cities.forEach((city) => {
    const matchProvince = provinces.filter(province => province.value === city.value.substr(0, 2))[0];
    if (matchProvince) {
      matchProvince.children = matchProvince.children || [];
      matchProvince.children.push({
        label: city.label,
        value: city.value,
        children: city.children,
      });
    }
  });

  return provinces;
}
