import React from 'react';
import PropTypes from 'prop-types';
import { Icon, Modal, AutoComplete, Button, Input, message } from 'antd';
import { Map, Marker, NavigationControl, InfoWindow } from 'react-bmap';
import InputItem from '../input-item';
import * as bmapService from './baiduMapService.js';
import * as coordtransform from './coordtransform';

/**
 * 地理位置输入框组件
 * @description地理位置输入框
 * @export  PositionInputBox
 * @date    2017-09-28
 * @author  zbs
 */

class PositionInputBox extends React.PureComponent {

  static propTypes = {
    className: PropTypes.string,
    style: PropTypes.object,
    value: PropTypes.shape({
      location: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.number), PropTypes.object]),
      address: PropTypes.string,
    }),
    readOnly: PropTypes.bool,
    description: PropTypes.string,
    onChange: PropTypes.func,
    dataType: PropTypes.oneOf(['default', 'geo']),
  }

  static defaultProps = {
    className: '',
    style: {},
    value: {
      location: null,
      address: '',
    },
    description: null,
    readOnly: false,
    onChange() {},
    dataType: 'default',
  }

  constructor(props) {
    super(props);
    const { value: { location, address }, dataType } = props;
    const selectPoint = dataType === 'geo' ? (location ? location.coordinates : []) : location || [];
    const [newLng, newLat] = coordtransform.convertWgs84ToBd09(selectPoint[0], selectPoint[1]);

    this.state = {
      visible: false,
      chooseLng: newLng,
      chooseLat: newLat,
      address,
      dataSource: [],
      record: [newLng, newLat],
    };
    this.getLocalPoint();
  }

  componentWillReceiveProps(nextProps) {
    const { value: { location: nextLocation }, dataType } = nextProps;
    const { value: { location } } = this.props;
    const { centerLng, centerLat } = this.state;
    const nextSelectPoint = dataType === 'geo' ? (nextLocation ? nextLocation.coordinates : []) : nextLocation || [];
    const selectPoint = dataType === 'geo' ? (location ? location.coordinates : []) : location || [];
    if (selectPoint[0] !== nextSelectPoint[0] || selectPoint[1] !== nextSelectPoint[1]) {
      const [newLng, nowLat] = coordtransform.convertWgs84ToBd09(nextSelectPoint[0], nextSelectPoint[1]);
      const [newCenterLng, nowCenterLat] = coordtransform.convertWgs84ToBd09(116.404, 39.915);
      this.setState({
        record: [newLng, nowLat],
        chooseLng: newLng,
        chooseLat: nowLat,
        centerLng: newLng || centerLng || newCenterLng,
        centerLat: nowLat || centerLat || nowCenterLat,
      });
    }
  }

  /**
   * 搜索
   */
  onSearch = () => {
    bmapService.getAddressPoint(this.state.address).then((data) => {
      this.setState({
        centerLng: data[0],
        centerLat: data[1],
        chooseLng: data[0],
        chooseLat: data[1],
      });
    });
  }

  /**
   * 获取当前位置
   */
  getLocalPoint = () => {
    const geolocation = new BMap.Geolocation();
    const [newCenterLng, nowCenterLat] = coordtransform.convertWgs84ToBd09(116.404, 39.915);
    geolocation.getCurrentPosition((result) => {
      this.setState({
        centerLng: result.point.lng || newCenterLng,
        centerLat: result.point.lat || nowCenterLat,
      });
    });
  }

  /**
   * Modal确定
   */
  positionOk = () => {
    message.destroy();
    const { address, chooseLng, chooseLat, record } = this.state;
    if (chooseLng == null || chooseLat == null || isNaN(chooseLng)) {
      message.config({
        top: 155,
      });
      message.error('请选择位置');
      return;
    }
    if (record[0] !== chooseLng || record[1] !== chooseLat) {
      const { onChange, dataType } = this.props;
      const resultValue = coordtransform.convertBd09ToWgs84(chooseLng, chooseLat);
      const location = dataType === 'geo' ? { type: 'Point', coordinates: resultValue } : resultValue;
      onChange({ address, location });
    }
    this.setState({
      visible: false,
    });
  }

  /**
   * 取消Modal
   */
  hideModal = () => {
    message.destroy();
    const { value: { location }, dataType } = this.props;
    if (!location) {
      this.setState({
        chooseLng: null,
        chooseLat: null,
        visible: false,
      });
      return;
    }
    const [lng, lat] = dataType === 'geo' ? location.coordinates : location;
    const [newLng, nowLat] = coordtransform.convertWgs84ToBd09(lng, lat);
    this.setState({
      chooseLng: newLng,
      chooseLat: nowLat,
      visible: false,
    });
  }

  /**
   *  打开地图Modal
   */
  showMap = () => {
    const { description } = this.props;
    if (description) this.onSearch();
    this.setState({
      visible: true,
    });
  }

  /**
   * 地图选点
   * @param data
   */
  handleSelection = (data) => {
    const { lng, lat } = data.point;
    bmapService.getPointAddress(lng, lat).then((address) => {
      this.setState({
        address,
        chooseLng: lng,
        chooseLat: lat,
      });
    });
  }

  /**
   * 输入框变化出发
   */
  handleSearch = (value) => {
    bmapService.placeSuggestionJsonp({ query: value, region: '全国' }).then((result) => {
      this.setState({
        dataSource: result.result,
        address: value,
      });
    });
  }

  handleSelect = (value) => {
    const { dataSource = [] } = this.state;
    const param = dataSource.filter(item => `${item.city}${item.district}${item.business}${item.name}` === value);
    this.setState({
      address: value,
      centerLng: param[0] && param[0].location.lng,
      centerLat: param[0] && param[0].location.lat,
    });
  }

  renderOption = (item) => {
    return `${item.city}${item.district}${item.business}${item.name}`;
  }

  render() {
    const { dataSource, visible, centerLng, centerLat, chooseLng, chooseLat, address: newAddress } = this.state;
    const { readOnly, value: { address } } = this.props;
    return (
      <div style={this.props.style} className={this.props.className} >
        <InputItem value={address} readOnly={readOnly} placeholder={readOnly ? '点击右侧图标选择地址' : '请输入地址'} style={{ width: '100%' }} addonAfter={<Icon onClick={this.showMap} style={{ color: 'red', fontSize: '20px' }} type="environment" />} />
        {
          <Modal
            title="地理位置"
            visible={visible}
            onOk={this.positionOk}
            onCancel={this.hideModal}
            okText="确认"
            cancelText="取消"
            bodyStyle={{ padding: 0 }}
            width={960}
            destroyOnClose
          >
            <div style={{ padding: '10px 15px', position: 'absolute', top: '45px', zIndex: 999 }}>
              <AutoComplete
                dataSource={dataSource.map(this.renderOption)}
                style={{ width: '315px' }}
                placeholder="请输入地址"
                readOnly={readOnly}
                onSelect={this.handleSelect}
                onSearch={this.handleSearch}
              >
                <Input
                  suffix={(
                    <Button style={{ right: '-12px', backgroundColor: '#eee' }} onClick={this.onSearch}>
                      <Icon type="search" />
                    </Button>
                  )}
                />
              </AutoComplete>
            </div>
            <Map
              style={{ height: '480px' }}
              center={{ lng: centerLng, lat: centerLat }}
              zoom="15"
              enableScrollWheelZoom
              events={{ click: event => this.handleSelection(event) }}
            >
              {chooseLng && <Marker position={{ lng: chooseLng, lat: chooseLat }} />}
              <NavigationControl anchor={BMAP_ANCHOR_BOTTOM_RIGHT} type="BMAP_NAVIGATION_CONTROL_ZOOM" />
              {chooseLng && <InfoWindow offset={new BMap.Size(0, -32)} position={{ lng: chooseLng, lat: chooseLat }} text={newAddress} title="地址:" width={0} height={0} />}
            </Map>
          </Modal>
        }
      </div>
    );
  }
}

export default PositionInputBox;
