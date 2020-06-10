import React, { PureComponent } from 'react';
import { Modal } from 'antd';
import PropTypes from 'prop-types';
import Map from '../map-new';

export default class SelectPointNew extends PureComponent {

  static propTypes = {
    className: PropTypes.string,
    style: PropTypes.object,
    value: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.number), PropTypes.object]),
    pathPoints: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)),
    centerPoint: PropTypes.arrayOf(PropTypes.number),
    dataType: PropTypes.oneOf(['default', 'geo']),
    onChange: PropTypes.func,
  };

  static defaultProps = {
    className: '',
    style: {},
    value: null,
    pathPoints: [],
    centerPoint: [],
    dataType: 'default',
    onChange() {},
  };

  constructor(props) {
    super(props);
    this.propsToState(props, 'constructor');
  }

  componentWillReceiveProps(nextProps) {
    this.propsToState(nextProps, 'componentWillReceiveProps');
  }

  propsToState = (props, type) => {
    const { value, pathPoints, centerPoint, dataType } = props;
    const selectPoint = dataType === 'geo' ? this.geoDataConvert(value) : value;
    let newCenterPoint;
    let newPoints;
    if (selectPoint && selectPoint.length > 1) {
      newCenterPoint = selectPoint;
    } else if (pathPoints && pathPoints.length > 0) {
      newCenterPoint = pathPoints[0];
    } else if (centerPoint && centerPoint.length > 1) {
      newCenterPoint = centerPoint;
    }

    if (pathPoints && pathPoints.length > 0) {
      newPoints = pathPoints.map((item) => {
        return { value: item };
      });
    }

    if (type === 'constructor') {
      this.state = {
        centerPoint: newCenterPoint,
        selectPoint: selectPoint || [],
        pathPoints: pathPoints || [],
        points: newPoints || [],
        visible: false,
      };
    } else {
      this.setState({
        centerPoint: newCenterPoint,
        selectPoint: selectPoint || [],
        pathPoints: pathPoints || [],
        points: newPoints || [],
      });
    }
  }

  geoDataConvert = (data) => {
    return data && data.coordinates;
  }

  mapStyle = { height: '500px' };
  graphStyle = {
    color: 'rgba(100,100,100,.3)',
    borderColor: 'red',
    borderWidth: 1,
    borderType: 'dashed',
  }

  handleMapClick = ({ point }) => {
    this.setState({
      selectPoint: point,
    });
  }

  handleLabelClick = () => {
    this.setState({
      visible: true,
    });
  }

  positionOk = () => {
    const { onChange, dataType } = this.props;
    const { selectPoint } = this.state;
    this.setState({
      visible: false,
    });
    onChange(dataType === 'geo' ? { type: 'Point', coordinates: selectPoint } : selectPoint);
  }

  hideModal = () => {
    const { value: selectPoint } = this.props;
    this.setState({
      selectPoint: (selectPoint && selectPoint.length > 0) ? selectPoint : [],
      visible: false,
    });
  }

  render() {
    const { className, style, label } = this.props;
    const { visible, centerPoint, selectPoint, points, pathPoints } = this.state;
    return (
      <div className={className} style={style}>
        <a onClick={this.handleLabelClick}>{label || '位置选择'}</a>
        <Modal
          title="地理位置"
          visible={visible}
          onOk={this.positionOk}
          onCancel={this.hideModal}
          okText="确认"
          cancelText="取消"
          bodyStyle={{ padding: 0 }}
          width={960}
          maskClosable={false}
        >
          <Map
            style={this.mapStyle}
            center={centerPoint}
            zoom={15}
            onClick={this.handleMapClick}
            defaultCursor={'pointer'}
          >
            {selectPoint.length && <Map.Markers
              data={[{ value: selectPoint }]}
              clusterMaxZoom={6}
              symbolSize={[20, 31]}
              itemStyle={{ color: 'red' }}
              symbolOffset={[-10, -31]}
            />}

            {points.length > 0 && <Map.Markers
              data={points}
              clusterMaxZoom={6}
              symbol="circle"
              symbolOffset={[-5, -5]}
              symbolSize={10}
            />}
            {pathPoints.length > 0 && <Map.Graphs
              type="polygon"
              data={{ shape: { points: pathPoints }, type: 'polygon' }}
              itemStyle={this.graphStyle}
            />}
          </Map>
        </Modal>
      </div>
    );
  }
}
