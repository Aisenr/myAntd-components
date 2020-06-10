import React, { PureComponent } from 'react';
import { Modal, message } from 'antd';
import PropTypes from 'prop-types';
import Map from '../map-new';
import RadioButtonGroup from '../radio-button-group';
import { startIcon, endIcon } from './iconBase64';

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
    centerPoint: [],
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
        centerPoint: newCenterPoint,
        linePoints: linePoints || [],
        points: newPoints || [],
        visible: false,
      };
    } else {
      this.setState({
        centerPoint: newCenterPoint,
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
    const { className, style, startAndEndPosition, label } = this.props;
    const { points, visible, linePoints, centerPoint } = this.state;
    const newPoints = [];
    if (points.length > 0) {
      !startAndEndPosition && newPoints.push({
        ...points[0],
      });
      startAndEndPosition && newPoints.push({
        ...points[0],
        symbolSize: [20, 30],
        symbolOffset: [-10, -28],
        symbol: startIcon,
      });
    }
    if (points.length > 1) {
      !startAndEndPosition && newPoints.push({
        ...points[points.length - 1],
      });
      startAndEndPosition && newPoints.push({
        ...points[points.length - 1],
        symbolSize: [20, 30],
        symbolOffset: [-10, -28],
        symbol: endIcon,
      });
    }

    return (
      <div className={className} style={style}>
        <a onClick={this.handleLabelClick}>{label || '路线选择'}</a>
        <Modal
          title="路线选择"
          visible={visible}
          onOk={this.positionOk}
          onCancel={this.hideModal}
          okText="确认"
          cancelText="取消"
          bodyStyle={{ padding: 0 }}
          width={960}
          maskClosable={false}
        >
          <RadioButtonGroup options={this.options} style={{ position: 'absolute', top: '60px', right: '5px', zIndex: '999' }} onChange={this.handleOnChange} />
          <Map
            style={{ height: '480px' }}
            center={centerPoint}
            zoom={15}
            onClick={this.handleMapClick}
            defaultCursor={'pointer'}
          >
            <Map.Markers
              data={newPoints}
              clusterMaxZoom={6}
              symbol="circle"
              symbolSize={10}
              symbolOffset={[-5, -5]}
            />
            <Map.Graphs
              type="polyline"
              data={{ shape: { points: linePoints }, type: 'polyline' }}
              itemStyle={{
                color: 'transparent',
                borderColor: '#459c50',
                borderWidth: 3,
              }}
            />
          </Map>
        </Modal>
      </div>
    );
  }
}
