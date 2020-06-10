import React from 'react';
import { Cascader } from 'antd';
import PropTypes from 'prop-types';
import options, { areaOptions, cityOptions, areaObj } from '../area-select/cascader-address-options';
import regionParse from './regionParse';
import ParseCode from '../parse-code';
import AreaSelect from '../area-select';

/**
 * 地区选择下拉框组件
 * @description 地区选择下拉框
 * @export  AreaSelect
 * @date    2017-09-21
 * @author  zbs
 */
export default class AreaSelectCascader extends React.Component {

  static propTypes = {
    className: PropTypes.string,
    style: PropTypes.object,
    placeholder: PropTypes.string,
    onChange: PropTypes.func,
    options: PropTypes.array,
    restrict: PropTypes.string,
    regionRestrict: PropTypes.arrayOf(PropTypes.string),
    value: PropTypes.string,
    expandTrigger: PropTypes.oneOf(['hover', 'click']),
    changeOnSelect: PropTypes.bool,
  };

  static defaultProps = {
    className: '',
    style: {},
    placeholder: '请选择地区',
    onChange() {},
    options: null,
    restrict: '',
    regionRestrict: null,
    value: '',
    expandTrigger: 'hover',
    changeOnSelect: true,
  };

  constructor(props) {
    super(props);
    this.state = { pcaList: this.getPcaList() };
  }

  componentWillReceiveProps() {
    this.getPcaList();
  }

  componentWillUnmount() {
    this.isUnmount = true;
  }

  getPcaList = () => {
    const pcaList = AreaSelect.cache.pca;
    if (!pcaList) {
      AreaSelect.fetch && AreaSelect.fetch().then((data) => {
        AreaSelect.cache.pca = data;
        this.pcaListToState(data);
      });
    } else {
      this.pcaListToState(pcaList);
    }
    return pcaList;
  }

  getProvinceOptions = () => {
    const { pcaList } = this.state;
    return this.dataConvert(pcaList);
  }

  getCityOptions = (pCode) => {
    const data = this.getProvinceOptions();
    const pList = data && data.filter(item => item.value === pCode);
    return (pList && pList[0] && pList[0].children) || [];
  }

  getAreaOptions = (cCode) => {
    const currentCityOptions = this.getCityOptions(cCode.substr(0, 2));
    const cList = currentCityOptions.filter(item => item.value === cCode);
    return (cList && cList[0] && cList[0].children) || [];
  }

  getAreaObj = (aCode) => {
    const currentAreaOptions = this.getAreaOptions(aCode.substr(0, 4));
    return currentAreaOptions.filter(item => item.value === aCode);
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

  pcaListToState = (param) => {
    if (!this.isUnmount) {
      this.setState({
        pcaList: param,
      });
    }
  }

  handleChange = (data) => {
    if (data.length >= 1) {
      this.props.onChange(data[data.length - 1]);
    } else {
      this.props.onChange('');
    }
  }

  render() {
    const { regionRestrict, expandTrigger, changeOnSelect, ...rest } = this.props;
    const { className, style, placeholder, options: propOptions, value: areaId, restrict } = this.props;
    const newPropOptions = regionRestrict ? regionParse(regionRestrict) : propOptions;
    const areaArr = [];
    if (areaId && !(areaId instanceof Array)) {
      if (areaId.length >= 2 && !(restrict && restrict.length >= 2)) {
        areaArr.push(areaId.substr(0, 2));
      }
      if (areaId.length >= 4 && !(restrict && restrict.length >= 4)) {
        areaArr.push(areaId.substr(0, 4));
      }
      if (areaId.length >= 6 && !(restrict && restrict.length > 6)) {
        areaArr.push(areaId.substr(0, 6));
      }
    }
    let newOptions = {};
    if (restrict) {
      if (restrict.length === 2) {
        newOptions = AreaSelect.fetch ? this.getCityOptions(restrict) : cityOptions(restrict);
      } else if (restrict.length === 4) {
        newOptions = AreaSelect.fetch ? this.getAreaOptions(restrict) : areaOptions(restrict);
      } else if (restrict.length === 6) {
        newOptions = AreaSelect.fetch ? this.getAreaObj(restrict) : areaObj(restrict);
      }
    } else {
      newOptions = AreaSelect.fetch ? this.getProvinceOptions(restrict) : options;
    }

    return (
      <div style={style} className={className} >
        <Cascader
          {...rest}
          value={areaArr.length > 0 ? areaArr : null}
          placeholder={placeholder}
          options={newPropOptions || newOptions}
          onChange={this.handleChange}
          style={{ width: '100%' }}
          expandTrigger={expandTrigger}
          changeOnSelect={changeOnSelect}
        />
      </div>
    );
  }
}
