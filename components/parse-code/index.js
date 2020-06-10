import React from 'react';
import provinces from 'china-division/dist/provinces.json';
import cities from 'china-division/dist/cities.json';
import areas from 'china-division/dist/areas.json';
import PropTypes from 'prop-types';
import SelectItem from '../select-item';
import RadioItem from '../radio-item';

const predefinedDataArray = { provinces, cities, areas };

class ParseCode extends React.Component {

  constructor(props) {
    super(props);
    this.state = { dataArray: this.getDataArrayFromCache(props.type) };
  }

  componentWillReceiveProps(nextProps) {
    this.setDataArrayToState(nextProps.type);
  }

  componentWillUnmount() {
    this.isUnmount = true;
  }

  setDataArrayToState(type) {
    if (!this.isUnmount) {
      this.setState({ dataArray: this.getDataArrayFromCache(type) });
    }
  }

  getDataArrayFromCache(type) {
    if (predefinedDataArray[type]) {
      return predefinedDataArray[type];
    }

    const dataArray = ParseCode.cache[type];
    if (!dataArray) {
      this.fetchDataArray(type);
    }
    return dataArray;
  }

  getObject = (type, code, array) => {
    if (code == null || code === '') {
      return '';
    }
    if (type === 'pca') {
      return this.getPCA(code);
    }

    for (const value of array) {
      if (value.code === code) {
        return value.name;
      }
    }
    return '';
  }

  getProvinceOptions = () => {
    const { dataArray } = this.state;
    return this.dataConvert(dataArray);
  }

  getProvinceLabel = (pCode) => {
    const pOption = this.getProvinceOptions();
    return pOption && pOption.filter(item => item.value === pCode)[0].label;
  }

  getCityOptions = (pCode) => {
    const data = this.getProvinceOptions();
    const pList = data && data.filter(item => item.value === pCode);
    return (pList && pList[0] && pList[0].children) || [];
  }

  getCityLabel = (cCode) => {
    const cOption = this.getCityOptions(cCode.substr(0, 2));
    const obj = cOption && (cOption.filter(item => item.value === cCode))[0];
    return obj && obj.label;
  }

  getAreaOptions = (cCode) => {
    const cityOptions = this.getCityOptions(cCode.substr(0, 2));
    const cList = cityOptions.filter(item => item.value === cCode);
    return (cList && cList[0] && cList[0].children) || [];
  }

  getAreaLabel = (aCode) => {
    const aOption = this.getAreaOptions(aCode.substr(0, 4));
    const obj = aOption && (aOption.filter(item => item.value === aCode))[0];
    return obj && obj.label;
  }

  getAreaObj = (aCode) => {
    const areaOptions = this.getAreaOptions(aCode.substr(0, 4));
    return areaOptions.filter(item => item.value === aCode);
  }

  getPCA = (valueParam) => {
    let rData = '';
    if (!valueParam) {
      return '';
    }
    const pName = this.getProvinceLabel(valueParam.substr(0, 2));
    if (pName == null || pName === '') {
      return rData;
    }
    rData += pName;
    if (valueParam.length === 2) {
      return rData;
    }
    const cName = this.getCityLabel(valueParam.substr(0, 4));
    if (cName == null || cName === '') {
      return rData;
    }
    rData += `-${cName}`;
    if (valueParam.length === 4) {
      return rData;
    }
    const aName = this.getAreaLabel(valueParam.substr(0, 6));
    if (aName == null || aName === '') {
      return rData;
    }
    rData += `-${aName}`;
    return rData;
  }

  dataConvert = (params) => {
    return params && params.map((item) => {
      return {
        label: item.name,
        value: item.code,
        children: this.dataConvert(item.children),
      };
    });
  }

  fetchDataArray(type) {
    // ParseCode.cache[type] = [];
    ParseCode.fetch && ParseCode.fetch(type).then((newData) => {
      ParseCode.cache[type] = newData;
      this.setDataArrayToState(this.props.type);
    });
  }

  transformData = (data = []) => {
    if (this.props.valueIndex == null || this.props.textIndex == null) {
      return data;
    }
    const newData = data.map((item) => {
      const newItem = { value: item[this.props.valueIndex], text: item[this.props.textIndex] };
      return newItem;
    });
    return newData;
  }

  chooseValue = (valueParam, dataArray) => {
    if (!dataArray) {
      return valueParam;
    }
    for (const item of dataArray) {
      if (item[this.props.valueIndex] === valueParam) {
        return item[this.props.textIndex];
      }
    }
  }

  decoration = (typeParam, valueParam, dataArray = []) => {
    const { display } = this.props;
    const valueResult = dataArray;
    if (typeParam === 'pca') {
      if (ParseCode.cache.pca) return ParseCode.getPCA(valueParam);
      return this.getPCA(valueParam);
    } else if (display === 'select') {
      return <SelectItem {...this.props} items={this.transformData(valueResult)} />;
    } else if (display === 'radio') {
      return <RadioItem {...this.props} items={this.transformData(valueResult)} />;
    } else {
      const reuslt = this.chooseValue(valueParam, valueResult);
      return reuslt == null ? '' : reuslt;
    }
  }

  render() {
    const { type, value } = this.props;
    if (predefinedDataArray[type]) {
      return <span>{this.getObject(type, value, predefinedDataArray[type])}</span>;
    }
    return this.decoration(type, value, this.state.dataArray);
  }
}

ParseCode.getPCA = (valueParam) => {
  let rData = '';
  if (!valueParam) {
    return '';
  }
  const pName = ParseCode.getObject('', valueParam.substr(0, 2), provinces);
  if (pName == null || pName === '') {
    return rData;
  }
  rData += pName;
  if (valueParam.length === 2) {
    return rData;
  }
  const cName = ParseCode.getObject('', valueParam.substr(0, 4), cities);
  if (cName == null || cName === '') {
    return rData;
  }
  rData += `-${cName}`;
  if (valueParam.length === 4) {
    return rData;
  }
  const aName = ParseCode.getObject('', valueParam.substr(0, 6), areas);
  if (aName == null || aName === '') {
    return rData;
  }
  rData += `-${aName}`;
  return rData;
};

ParseCode.getObject = (type, code, array) => {
  if (code == null || code === '') {
    return '';
  }
  if (type === 'pca') {
    return ParseCode.getPCA(code);
  }

  for (const value of array) {
    if (value.code === code) {
      return value.name;
    }
  }
  return '';
};

ParseCode.getObj = (code) => {
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
      return { label: value.name, value: value.code };
    }
  }
  return {};
};

export default ParseCode;

ParseCode.defaultProps = {
  type: '',
  display: '',
  valueIndex: 'value',
  textIndex: 'label',
};

ParseCode.propTypes = {
  type: PropTypes.string,
  display: PropTypes.string,
  valueIndex: PropTypes.string,
  textIndex: PropTypes.string,
};

ParseCode.cache = {};
