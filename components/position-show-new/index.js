import React from 'react';
import classNames from 'classnames';
import { Icon, Modal } from 'antd';
import PropTypes from 'prop-types';
import Map from '../map-new';

class PositionShowNew extends React.Component {
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
    const newPath = (dataType === 'geo' && path) ? path.coordinates[0] : path;
    this.state = {
      lng: selectPoint[0],
      lat: selectPoint[1],
      path: newPath,
      visible: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    const { value: { location }, dataType, path } = nextProps;
    const selectPoint = dataType === 'geo' ? (location ? location.coordinates : []) : location || [];
    const newPath = (dataType === 'geo' && path) ? path.coordinates[0] : path;
    this.setState({
      lng: selectPoint[0],
      lat: selectPoint[1],
      path: newPath,
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
          width={960}
          footer={null}
          destroyOnClose
        >
          <Map
            style={{ height: '480px' }}
            center={[lng, lat]}
            zoom={15}
          >
            <Map.Markers fitView data={[[lng, lat]]} symbolSize={[20, 31]} symbolOffset={[-10, -31]} />
            <Map.ToolBar />
            {
                path && <Map.Graphs
                  data={[{
                    type: 'polygon',
                    shape: { points: path },
                  }]}
                />
              }
          </Map>
        </Modal>
      </div>
    );
  }
}

export default PositionShowNew;
