import React, { PureComponent } from 'react';
import { Modal, message } from 'antd';
import PropTypes from 'prop-types';
import Map from '../map';
import RadioButtonGroup from '../radio-button-group';
import { startIcon, endIcon } from './iconBase64';

export default class SelectArea extends PureComponent {
  static propTypes = {
    className: PropTypes.string,
    style: PropTypes.object,
    selectPoint: PropTypes.arrayOf(PropTypes.number),
    value: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)),
      PropTypes.object,
    ]),
    centerPoint: PropTypes.arrayOf(PropTypes.number),
    onChange: PropTypes.func,
    dataType: PropTypes.oneOf(['default', 'geo']),
  };

  static defaultProps = {
    className: '',
    style: {},
    selectPoint: [],
    value: null,
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
    const { selectPoint, value, centerPoint, dataType } = props;
    const pathPoints = dataType === 'geo' ? this.geoDataConvert(value) : value;
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
    return data && data.coordinates[0];
  }

  mapStyle = { height: '500px' };
  graphStyle = {
    color: 'rgba(100,100,100,.3)',
    borderColor: 'red',
    borderWidth: 1,
    borderType: 'dashed',
  }

  handleMapClick = ({ point }) => {
    const newPoints = [...this.state.points];
    const newPathPoints = [...this.state.pathPoints, point];
    newPoints.push({ value: point });
    this.setState({
      points: newPoints,
      pathPoints: newPathPoints,
    });
  }

  handleLabelClick = () => {
    this.setState({
      visible: true,
    });
  }

  positionOk = () => {
    const { onChange, dataType } = this.props;
    const { pathPoints } = this.state;
    if (!pathPoints || pathPoints.length < 3) {
      message.error('至少选择三个点');
      return;
    }
    const resultValue = pathPoints;
    resultValue.push(pathPoints[0]);
    onChange(dataType === 'geo' ? { type: 'Polygon', coordinates: [resultValue] } : resultValue);
    this.setState({
      visible: false,
    });
  }

  hideModal = () => {
    const { selectPoint, value: pathPoints, onChange } = this.props;
    let newPoints;
    let newPathPoints;
    if (pathPoints && pathPoints.length > 0) {
      newPoints = pathPoints;
      newPathPoints = pathPoints;
    } else {
      newPoints = [];
      newPathPoints = [];
    }
    onChange(pathPoints);
    this.setState({
      selectPoint: (selectPoint && selectPoint.length > 0) ? selectPoint : [],
      pathPoints: newPathPoints,
      points: newPoints,
      visible: false,
    });
  }

  options = [
    { label: '回退', value: 'goBack' },
    { label: '清除', value: 'clear' },
  ];

  handleOnChange = (e) => {
    const type = e.target.value;
    if (type === 'goBack') {
      const newPoints = [...this.state.points];
      const newPathPoints = [...this.state.pathPoints];
      newPoints.pop();
      newPathPoints.pop();
      this.setState({
        pathPoints: newPathPoints,
        points: newPoints,
      });
    } else if (type === 'clear') {
      this.setState({
        pathPoints: [],
        points: [],
      });
    }
  }

  render() {
    return (
      <div className={this.props.className} style={this.props.style}>
        <a onClick={this.handleLabelClick}>{this.props.label || '区域范围选择'}</a>
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
          <RadioButtonGroup options={this.options} style={{ position: 'absolute', top: '60px', right: '5px', zIndex: '999' }} onChange={this.handleOnChange} />
          <Map
            style={this.mapStyle}
            center={this.state.centerPoint}
            zoom={15}
            onClick={this.handleMapClick}

          >
            <Map.Markers
              data={[{ value: this.props.selectPoint }]}
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
