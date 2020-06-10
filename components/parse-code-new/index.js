import React from 'react';
import provinces from 'china-division/dist/provinces.json';
import cities from 'china-division/dist/cities.json';
import areas from 'china-division/dist/areas.json';
import PropTypes from 'prop-types';
import SelectItem from '../select-item';
import RadioItem from '../radio-item';
import ParseCode from '../parse-code';

const predefinedDataArray = { provinces, cities, areas };

export default class ParseCodeNew extends React.PureComponent {

  static propTypes = {
    type: PropTypes.string,
    display: PropTypes.string,
    valueIndex: PropTypes.string,
    textIndex: PropTypes.string,
  }

  static defaultProps = {
    type: '',
    display: '',
    valueIndex: 'value',
    textIndex: 'label',
  }

  constructor(props) {
    super(props);
    this.state = { dataArray: this.getDataArrayFromCache(props.type) };
  }

  componentWillReceiveProps(nextProps) {

  }

  componentWillUnmount() {
    this.isUnmount = true;
  }

  getDataArrayFromCache(type) {
    if (predefinedDataArray[type]) {
      return predefinedDataArray[type];
    }

    const dataArray = ParseCodeNew.cache[type];
    if (!dataArray) {
      this.fetchDataArray(type);
    }
    return dataArray;
  }

  setDataArrayToState(type) {
    if (!this.isUnmount) {
      this.setState({ dataArray: this.getDataArrayFromCache(type) });
    }
  }

  fetchDataArray(type) {
    if (typeof ParseCodeNew.fetch === 'function') {
      ParseCodeNew.fetch(type).then((newData) => {
        ParseCode.cache[type] = newData;
        this.setDataArrayToState(this.props.type);
      });
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

ParseCodeNew.cache = {};
