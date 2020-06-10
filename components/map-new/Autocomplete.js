import React from 'react';
import PropTypes from 'prop-types';
import { Button, Icon, AutoComplete, Select } from 'antd';
import uuid from 'uuid/v4';
import InputItem from '../input-item';
import { convertGcj02ToWgs84 } from './utils/coordtransform';

const prefixCls = 'bis-autocomplete-search';
export default class AutocompleteSearch extends React.PureComponent {

  static propTypes = {
    onClick: PropTypes.func,
    onChange: PropTypes.func,
  };

  static defaultProps = {
    onClick() {},
    onChange() {},
  };

  constructor(props) {
    super(props);
    if (typeof window !== 'undefined') {
      if (!props.map) {
        console.warn('没有地图实例；组件必须作为 Map 的子组件使用');
      } else {
        this.map = props.map;
        this.element = this.map.getContainer();
        this.createAutocomplete(props);
      }
    }
    this.state = {
      dataSource: [],
      iconCla: 'blue',
    };
  }

  createAutocomplete() {
    AMap.plugin(['AMap.Autocomplete', 'AMap.PlaceSearch'], () => {
      this.autocomplete = new AMap.Autocomplete();
      this.placeSearch = new AMap.PlaceSearch();
    });
  }

  select(name, obj) {
    const { onChange } = this.props;
    this.map.getCity(({ citycode }) => {
      this.placeSearch.setCity(citycode);
      this.placeSearch.search(name, (status, result) => {
        const { pois } = result.poiList;
        onChange(this.convertCoord(obj), pois.map(item => this.convertCoord(item)));
      });
    });
  }

  convertCoord(data) {
    const { lng, lat } = data.location || {};
    const newLngLat = convertGcj02ToWgs84(lng, lat);
    return {
      ...data,
      location: {
        ...data.location,
        lng: newLngLat[0],
        lat: newLngLat[1],
      },
    };
  }

  /**
   * 输入框变化出发
   */
  handleSearch = (value) => {
    this.map.getCity(({ citycode }) => {
      this.autocomplete.setCity(citycode);
      this.autocomplete.search(value, (status, result) => {
        if (status === 'complete') {
          const { tips } = result;
          this.setState({
            dataSource: tips,
          });
        }
      });
    });
  }

  /**
   * 选中选项
   * @param value
   */
  handleSelect = (value) => {
    const { dataSource } = this.state;
    dataSource.forEach((item) => {
      if (item.id === value || item.id === '') {
        this.select(item.name, item);
      }
    });
  }

  handleChange = (value, opt) => {
    const { children } = opt.props;
    this.setState({
      autoCompleteObj: opt,
      autoCompleteValue: children instanceof Array ? children[0] : children,
    });
  }

  handleButtonSearch = (value, autoCompleteObj) => {
    const { key: id, props: { children } } = autoCompleteObj;
    this.select(value, { id, name: children instanceof Array ? children[0] : children });
  }

  handleMarkerClick = (marker, text, item) => {
    const { onClick } = this.props;
    if (this.lastMarker) {
      this.lastMarker.setContent(`<div class=${prefixCls}-blue>${this.lastMarkerText}</div>`);
      this.lastMarker.setzIndex(111 - text);
    }
    marker.setContent(`<div class=${prefixCls}-red>${text}</div>`);
    marker.setzIndex(111);
    this.lastMarker = marker;
    this.lastMarkerText = text;
    onClick(item);
  }

  // renderMarker = (points) => {
  //   this.map.clearMap();
  //   const { iconCla } = this.state;
  //   const markers = [];
  //   points.forEach((item, index) => {
  //     const marker = new AMap.Marker({
  //       map: this.map,
  //       content: `<div class=${prefixCls}-${iconCla}>${index + 1}</div>`,
  //       position: [item.location.lng, item.location.lat],
  //       offset: new AMap.Pixel(-10, -16),
  //       zIndex: 110 - index,
  //     });
  //     markers.push(marker);
  //     marker.on('click', () => this.handleMarkerClick(marker, index + 1, item));
  //   });
  //   return markers;
  // }

  renderOption = (item) => {
    return <Select.Option key={item.id || uuid()} value={item.name}>{item.name}<span style={{ color: '#d5d5d5', marginLeft: '10px' }} title={item.district}>{item.district}</span></Select.Option>;
  }

  render() {
    const { dataSource, autoCompleteValue, autoCompleteObj } = this.state;
    return (
      <div style={{ padding: '10px 15px', position: 'absolute', top: '45px', zIndex: 999 }}>
        <AutoComplete
          dataSource={dataSource.map(this.renderOption)}
          style={{ width: '315px' }}
          placeholder="请输入地址"
          // readOnly={readOnly}
          onSelect={this.handleSelect}
          onSearch={this.handleSearch}
          onChange={this.handleChange}
          value={autoCompleteValue}
        >
          <InputItem
            suffix={(
              <Button style={{ right: '-12px', backgroundColor: '#eee' }} onClick={() => this.handleButtonSearch(autoCompleteValue, autoCompleteObj)}>
                <Icon type="search" />
              </Button>
              )}
          />
        </AutoComplete>
      </div>
    );
  }
}
