import React, { PureComponent } from 'react';
import { Modal, message } from 'antd';
import PropTypes from 'prop-types';
import MapNew from '../map-new';
import RadioButtonGroup from '../radio-button-group';

const RadioButtonGroupStyle = { position: 'absolute', top: '60px', right: '5px', zIndex: '999' };

export default class SelectAreaNew extends PureComponent {
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
    label: PropTypes.string,
  };

  static defaultProps = {
    className: '',
    style: {},
    selectPoint: [],
    value: null,
    centerPoint: [],
    dataType: 'default',
    onChange() {},
    label: '区域范围选择',
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
    const { className, style, label, selectPoint } = this.props;
    const { visible, centerPoint, points, pathPoints } = this.state;
    return (
      <div className={className} style={style}>
        <a onClick={this.handleLabelClick}>{label}</a>
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
          destroyOnClose
        >
          <RadioButtonGroup options={this.options} style={RadioButtonGroupStyle} onChange={this.handleOnChange} />
          <MapNew
            style={this.mapStyle}
            center={centerPoint}
            zoom={15}
            onClick={this.handleMapClick}
            defaultCursor={'pointer'}
          >
            {selectPoint.length > 0 && <MapNew.Markers
              data={[{ value: selectPoint }]}
              clusterMaxZoom={6}
              symbolSize={[20, 30]}
              symbolOffset={[-10, -30]}
              itemStyle={{ color: 'red' }}
            />}
            {points.length > 0 && <MapNew.Markers
              data={points}
              clusterMaxZoom={6}
              symbol="circle"
              symbolSize={10}
              symbolOffset={[-5, -5]}
            />}
            {pathPoints.length > 0 && <MapNew.Graphs
              data={{ shape: { points: pathPoints }, type: 'polygon' }}
              itemStyle={this.graphStyle}
            />}
          </MapNew>
        </Modal>
      </div>
    );
  }
}
