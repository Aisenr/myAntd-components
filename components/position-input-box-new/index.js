import React from 'react';
import PropTypes from 'prop-types';
import { Icon, Modal, message } from 'antd';
import Map from '../map-new';
import InputItem from '../input-item';
import { getAddress } from '../utils/geocoder';

/**
 * 地理位置输入框组件
 * @description地理位置输入框
 * @export  PositionInputBox
 * @date    2017-09-28
 * @author  zbs
 */

export default class PositionInputBoxNew extends React.PureComponent {

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
    const currentSelectPoint = dataType === 'geo' ? (location ? location.coordinates : []) : location || [];
    this.state = {
      visible: false,
      selectPoint: { value: currentSelectPoint, content: <div className={`${this.prefixCls}-red`} />, name: address },
      centerPoint: [...currentSelectPoint],
      address,
      record: [...currentSelectPoint],
      searchPoints: [],
      iconCla: 'blue',
    };
  }

  componentWillReceiveProps(nextProps) {
    const { value: { location: nextLocation, address }, dataType } = nextProps;
    const { value: { location } } = this.props;
    const nextSelectPoint = dataType === 'geo' ? (nextLocation ? nextLocation.coordinates : []) : nextLocation || [];
    const currentSelectPoint = dataType === 'geo' ? (location ? location.coordinates : []) : location || [];
    if (currentSelectPoint[0] !== nextSelectPoint[0] || currentSelectPoint[1] !== nextSelectPoint[1]) {
      this.setState({
        record: [...nextSelectPoint],
        selectPoint: { value: nextSelectPoint, content: <div className={`${this.prefixCls}-red`} />, name: address },
        address,
        centerPoint: [...nextSelectPoint],
      });
    }
  }

  /**
   * Modal确定
   */
  positionOk = () => {
    message.destroy();
    const { selectPoint, record } = this.state;
    const { value, name } = selectPoint;
    if (!selectPoint || value.length <= 0) {
      message.config({
        top: 155,
      });
      message.error('请选择位置');
      return;
    }
    if (record[0] !== value[0] || record[1] !== value[1]) {
      const { onChange, dataType } = this.props;
      const location = dataType === 'geo' ? { type: 'Point', coordinates: value } : value;
      onChange({ address: name, location });
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
    const { value: { location, address }, dataType } = this.props;
    if (!location) {
      this.setState({
        selectPoint: { value: [] },
        visible: false,
      });
      return;
    }
    const currentSelectPoint = dataType === 'geo' ? location.coordinates : location;
    this.setState({
      selectPoint: { value: currentSelectPoint,
        type: 'Point',
        name: address,
        content: <div className={`${this.prefixCls}-red`} />,
        zIndex: 120,
      },
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

  handleMapClick = ({ point }) => {
    getAddress(point).then((item) => {
      this.setState({
        selectPoint: {
          value: point,
          content: <div className={`${this.prefixCls}-red`} />,
          zIndex: 120,
          name: item.formattedAddress,
        },
        centerPoint: [...point],
        searchPoints: [],
      });
    });
  }

  prefixCls = 'bis-position-input-box';

  handleAutocompleteChange = (currentObj, objs) => {
    const { iconCla } = this.state;
    this.setState({
      searchPoints: objs.map((item, index) => {
        const { location: { lng, lat }, name } = item;
        return {
          content: <div className={`${this.prefixCls}-${iconCla}`}>{index + 1}</div>,
          value: [lng, lat],
          name,
          zIndex: 110 - index,
        };
      }),
    });
  }

  handleMarkClick = (e) => {
    const { data: { value, name } } = e;
    this.setState({
      selectPoint: { value, content: <div className={`${this.prefixCls}-red`} />, zIndex: 120, name },
      searchPoints: [],
      address: name,
    });
  }

  render() {
    const { visible, centerPoint, selectPoint, searchPoints } = this.state;
    const { readOnly, value: { address } } = this.props;
    const showPoints = [];
    selectPoint.value && selectPoint.value.length > 0 && showPoints.push(selectPoint);
    searchPoints.length > 0 && showPoints.push(...searchPoints);

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
            <Map
              style={{ height: '480px' }}
              center={centerPoint}
              zoom={15}
              onClick={this.handleMapClick}
            >
              <Map.Autocomplete onChange={this.handleAutocompleteChange} />
              <Map.Markers fitView clusterGridSize={0} symbolSize={[20, 32]} symbolOffset={[-10, -32]} data={showPoints} onClick={this.handleMarkClick} />
              {selectPoint.value && selectPoint.value.length > 0 && <Map.InfoWindow position={selectPoint.value} offset={[0, -30]}>
                {selectPoint.name}
              </Map.InfoWindow>}
            </Map>
          </Modal>
        }
      </div>
    );
  }
}
