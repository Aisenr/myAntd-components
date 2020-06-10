import React, { PureComponent } from 'react';
import { Modal, message } from 'antd';
import PropTypes from 'prop-types';
import Map from '../map';
import RadioButtonGroup from '../radio-button-group';
import { startIcon, endIcon } from '../select-area/iconBase64';

export default class SelectRoute extends PureComponent {

  static propTypes = {
    className: PropTypes.string,
    style: PropTypes.object,
    value: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)),
      PropTypes.object,
    ]),
    centerPoint: PropTypes.arrayOf(PropTypes.number),
    dataType: PropTypes.oneOf(['default', 'geo']),
    onChange: PropTypes.func,
    startAndEndPosition: PropTypes.bool,
  };

  static defaultProps = {
    className: '',
    style: {},
    value: null,
    centerPoint: [116.404, 39.915],
    dataType: 'default',
    onChange() {},
    startAndEndPosition: true,
  };

  constructor(props) {
    super(props);
    this.propsToState(props, 'constructor');
  }

  componentWillReceiveProps(nextProps) {
    this.propsToState(nextProps, 'componentWillReceiveProps');
  }

  propsToState = (props, type) => {
    const { value, centerPoint, dataType } = props;
    const linePoints = dataType === 'geo' ? this.geoDataConvert(value) : value;
    let newCenterPoint;
    let newPoints;

    if (linePoints && linePoints.length > 0) {
      newCenterPoint = linePoints[0];
    } else if (centerPoint && centerPoint.length > 1) {
      newCenterPoint = centerPoint;
    }

    if (linePoints && linePoints.length > 0) {
      newPoints = linePoints.map((item) => {
        return { value: item };
      });
    }


    if (type === 'constructor') {
      this.state = {
        centerPoint: newCenterPoint || [116.404, 39.915],
        linePoints: linePoints || [],
        points: newPoints || [],
        visible: false,
      };
    } else {
      this.setState({
        centerPoint: newCenterPoint || [116.404, 39.915],
        linePoints: linePoints || [],
        points: newPoints || [],
      });
    }
  }

  geoDataConvert = (data) => {
    return data && data.coordinates;
  }

  handleLabelClick = () => {
    this.setState({
      visible: true,
    });
  }

  positionOk = () => {
    const { onChange, dataType } = this.props;
    const { linePoints } = this.state;
    if (!linePoints || linePoints.length < 2) {
      message.error('至少选择三个点');
      return;
    }
    this.setState({
      visible: false,
    });
    const resultValue = linePoints;
    onChange(dataType === 'geo' ? { type: 'LineString', coordinates: resultValue } : resultValue);
  }

  hideModal = () => {
    const { value: linePoints, onChange } = this.props;
    let newPoints;
    let newLinePoints;
    if (linePoints && linePoints.length > 0) {
      newPoints = linePoints.map((item) => {
        return { value: item };
      });
      newLinePoints = linePoints;
    } else {
      newPoints = [];
      newLinePoints = [];
    }
    onChange(linePoints);
    this.setState({
      linePoints: newLinePoints,
      points: newPoints,
      visible: false,
    });
  }

  handleMapClick = ({ point }) => {
    const newPoints = [...this.state.points];
    const newLinePoints = [...this.state.linePoints, point];
    newPoints.push({ value: point });
    this.setState({
      points: newPoints,
      linePoints: newLinePoints,
    });
  }

  handleOnChange = (e) => {
    const type = e.target.value;
    if (type === 'goBack') {
      const newPoints = [...this.state.points];
      const newLinePoints = [...this.state.linePoints];
      newPoints.pop();
      newLinePoints.pop();
      this.setState({
        linePoints: newLinePoints,
        points: newPoints,
      });
    } else if (type === 'clear') {
      this.setState({
        linePoints: [],
        points: [],
      });
    }
  }

  options = [
    { label: '回退', value: 'goBack' },
    { label: '清除', value: 'clear' },
  ];

  render() {
    const { startAndEndPosition } = this.props;
    const { points } = this.state;
    const newPoints = [];
    if (points.length > 0) {
      newPoints.push({
        ...points[0],
        symbol: '',
        symbolSize: 5,
        symbolOffset: [0, 0],
      });
      startAndEndPosition && newPoints.push({
        ...points[0],
        symbol: startIcon,
      });
    }
    if (points.length > 1) {
      newPoints.push({
        ...points[points.length - 1],
        symbol: '',
        symbolSize: 5,
        symbolOffset: [0, 0],
      });
      startAndEndPosition && newPoints.push({
        ...points[points.length - 1],
        symbol: endIcon,
      });
    }

    return (
      <div className={this.props.className} style={this.props.style}>
        <a onClick={this.handleLabelClick}>{this.props.label || '路线选择'}</a>
        <Modal
          title="路线选择"
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
            style={{ height: '500px' }}
            center={this.state.centerPoint}
            zoom={15}
            onClick={this.handleMapClick}
          >
            <Map.Markers
              data={newPoints}
              clusterMaxZoom={6}
              // symbol="circle"
              symbolOffset={[0, -17]}
              symbolSize={34}
            />
            <Map.Graph
              type="polyline"
              shape={{ points: this.state.linePoints }}
              itemStyle={{
                color: 'transparent',
                borderColor: 'red',
                borderWidth: 5,
              }}
            />
          </Map>
        </Modal>
      </div>
    );
  }
}
