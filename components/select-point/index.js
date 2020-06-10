import React, { PureComponent } from 'react';
import { Modal } from 'antd';
import PropTypes from 'prop-types';
import Map from '../map';

export default class SelectPoint extends PureComponent {

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
    centerPoint: [116.404, 39.915],
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
    return (
      <div className={this.props.className} style={this.props.style}>
        <a onClick={this.handleLabelClick}>{this.props.label || '位置选择'}</a>
        <Modal
          title="地理位置"
          visible={this.state.visible}
          onOk={this.positionOk}
          onCancel={this.hideModal}
          okText="确认"
          cancelText="取消"
          bodyStyle={{ padding: 0 }}
          width={800}
          maskClosable={false}
        >
          <Map
            style={this.mapStyle}
            center={this.state.centerPoint}
            zoom={15}
            onClick={this.handleMapClick}
          >
            <Map.Markers
              data={[{ value: this.state.selectPoint }]}
              clusterMaxZoom={6}
              symbolSize={30}
              itemStyle={{ color: 'red' }}
            />

            <Map.Markers
              data={this.state.points}
              clusterMaxZoom={6}
              symbol="circle"
              symbolSize={10}
            />
            <Map.Graph
              type="polygon"
              shape={{ points: this.state.pathPoints }}
              itemStyle={this.graphStyle}
            />
          </Map>
        </Modal>
      </div>
    );
  }
}
