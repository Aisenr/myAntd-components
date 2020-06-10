import React from 'react';
import classNames from 'classnames';
import { Icon, Modal } from 'antd';
import { Map, Marker, Polygon, NavigationControl } from 'react-bmap';
import PropTypes from 'prop-types';
import * as coordtransform from '../position-input-box/coordtransform';

class PositionShow extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    style: PropTypes.object,
    value: PropTypes.shape({
      address: PropTypes.string,
      location: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.number), PropTypes.object]),
    }),
    path: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.number), PropTypes.object]),
    dataType: PropTypes.oneOf(['default', 'geo']),
  }

  static defaultProps = {
    className: '',
    style: {},
    value: {},
    path: null,
    dataType: 'default',
  }

  constructor(props) {
    super(props);
    const { value: { location }, dataType, path } = props;
    const selectPoint = dataType === 'geo' ? (location ? location.coordinates : []) : location || [];
    const [newLng, nowLat] = coordtransform.convertWgs84ToBd09(selectPoint[0], selectPoint[1]);
    let newPath = [];
    if (path) {
      const overPoint = dataType === 'geo' ? path.coordinates[0] : path;
      newPath = overPoint.map((item) => {
        const [newPathLng, nowPathLat] = coordtransform.convertWgs84ToBd09(item[0], item[1]);
        return {
          lng: newPathLng,
          lat: nowPathLat,
        };
      });
    }
    this.state = {
      lng: newLng,
      lat: nowLat,
      path: newPath || [],
      visible: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    const { value: { location }, dataType, path } = nextProps;
    const selectPoint = dataType === 'geo' ? (location ? location.coordinates : []) : location || [];
    const [newLng, nowLat] = coordtransform.convertWgs84ToBd09(selectPoint[0], selectPoint[1]);
    let newPath = [];
    if (path) {
      const overPoint = dataType === 'geo' ? path.coordinates[0] : path;
      newPath = overPoint.map((item) => {
        const [newPathLng, nowPathLat] = coordtransform.convertWgs84ToBd09(item[0], item[1]);
        return {
          lng: newPathLng,
          lat: nowPathLat,
        };
      });
    }
    this.setState({
      lng: newLng,
      lat: nowLat,
      path: newPath || [],
    });
  }

  positionOk = () => {
    this.setState({
      visible: false,
    });
  }

  hideModal = () => {
    this.setState({
      visible: false,
    });
  }

  showMap = () => {
    this.setState({
      visible: true,
    });
  }

  render() {
    const { prefixCls = 'bis-position-show', className, style, value: { address } } = this.props;
    const { visible, lng, lat, path } = this.state;
    return (
      <div className={classNames(prefixCls, className)} style={style}>
        <span>{address}</span><Icon onClick={this.showMap} style={{ color: 'red', fontSize: '20px', marginLeft: '10px' }} type="environment" />
        <Modal
          title="地理位置"
          visible={visible}
          onOk={this.positionOk}
          onCancel={this.hideModal}
          okText="确认"
          cancelText="取消"
          bodyStyle={{ padding: 0 }}
          width={800}
          footer={null}
          destroyOnClose
        >
          {
            <Map
              style={{ height: '480px' }}
              center={{ lng, lat }}
              zoom="15"
              enableScrollWheelZoom
              events={{ click: event => this.handleSelection(event) }}
            >
              <Marker position={{ lng, lat }} />
              <NavigationControl anchor={BMAP_ANCHOR_BOTTOM_RIGHT} type={BMAP_NAVIGATION_CONTROL_ZOOM} />
              {
                path && <Polygon
                  autoViewport={false}
                  path={path}
                />
              }
            </Map>
          }
        </Modal>
      </div>
    );
  }
}

export default PositionShow;
