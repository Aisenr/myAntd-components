import React from 'react';
import PropTypes from 'prop-types';
import { convertWgs84ToGcj02 } from './utils/coordtransform';

export default class Graphs extends React.PureComponent {

  static propTypes = {
    name: PropTypes.string,
    data: PropTypes.oneOf([
      PropTypes.shape({
        name: PropTypes.string,
        type: PropTypes.oneOf(['circle', 'rectangle', 'polyline', 'polygon']).isRequired,
        shape: PropTypes.shape({
          cx: PropTypes.number,
          cy: PropTypes.number,
          r: PropTypes.number,
          points: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)),
        }).isRequired,
        itemStyle: PropTypes.shape({
          color: PropTypes.string,
          borderColor: PropTypes.string,
          borderWidth: PropTypes.number,
          borderType: PropTypes.oneOf(['solid', 'dashed', 'dotted']),
          opacity: PropTypes.number,
        }),
      }),
      PropTypes.arrayOf(
        PropTypes.shape({
          name: PropTypes.string,
          type: PropTypes.oneOf(['circle', 'rectangle', 'polyline', 'polygon']).isRequired,
          shape: PropTypes.shape({
            cx: PropTypes.number,
            cy: PropTypes.number,
            r: PropTypes.number,
            points: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)),
          }).isRequired,
          itemStyle: PropTypes.shape({
            color: PropTypes.string,
            borderColor: PropTypes.string,
            borderWidth: PropTypes.number,
            borderType: PropTypes.oneOf(['solid', 'dashed', 'dotted']),
            opacity: PropTypes.number,
          }),
        }),
      ),
    ]),

    itemStyle: PropTypes.shape({
      color: PropTypes.string,
      borderColor: PropTypes.string,
      borderWidth: PropTypes.number,
      borderType: PropTypes.oneOf(['solid', 'dashed', 'dotted']),
      opacity: PropTypes.number,
      zIndex: PropTypes.number,
    }),
    onClick: PropTypes.func,
  };

  static defaultProps = {
    data: [],
    itemStyle: {
      borderColor: '#9c9bf5',
      borderWidth: 1,
      borderType: 'solid',
      color: '#00ff00',
      opacity: 0,
      zIndex: 10,
    },
    onClick() {},
  };

  constructor(props) {
    super(props);
    if (typeof window !== 'undefined') {
      if (!props.map) {
        console.warn('没有地图实例；组件必须作为 Map 的子组件使用');
      } else {
        this.map = props.map;
        this.element = this.map.getContainer();
        this.createGraphs(props);
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.data && nextProps.data !== this.props.data) {
      this.createGraphs(nextProps);
    }
  }

  componentWillUnmount() {
    if (this.circle) {
      this.circle.off('click', this.handleOff());
      this.map.remove(this.circle);
    }
    if (this.polyline) {
      this.polyline.off('click', this.handleOff());
      this.map.remove(this.polyline);
    }
    if (this.polygon) {
      this.polygon.off('click', this.handleOff());
      this.map.remove(this.polygon);
    }
    if (this.rectangle) {
      this.rectangle.off('click', this.handleOff());
      this.map.remove(this.rectangle);
    }
  }

  graphs = [];

  createGraphs(props) {
    if (this.graphs.length > 0) {
      this.map.remove(this.graphs);
      this.graphs = [];
    }
    const { data, itemStyle } = props;
    const newData = data instanceof Array ? data : [data];
    newData.forEach((item) => {
      const newItem = this.convertCoord(item);
      const { type, shape, shape: { points }, itemStyle: childStyle } = newItem;
      const newChildStyle = childStyle || {};
      const currentStyle = { ...itemStyle, ...newChildStyle };
      switch (type) {
        case 'circle':
          this.initCircle(shape, currentStyle, item);
          break;
        case 'rectangle':
          this.initRectangle(points, currentStyle, item);
          break;
        case 'polyline':
          this.initPolyline(points, currentStyle, item);
          break;
        case 'polygon':
          this.initPolygon(points, currentStyle, item);
          break;
        default:
          break;
      }
    });
  }

  initPolyline = (data, option, item) => {
    this.polyline = new AMap.Polyline({
      path: data,          // 设置线覆盖物路径
      strokeColor: option.borderColor, // 线颜色
      strokeStyle: option.borderType,
      strokeWeight: option.borderWidth,        // 线宽
      strokeDasharray: [10, 5], // 补充线样式
      fillOpacity: option.opacity, // 填充颜色透明度
      zIndex: option.zIndex,
      bubble: true,
      cursor: 'pointer',
    });
    this.polyline.on('click', () => {
      this.handleClick('折线', item);
    });
    this.polyline.setMap(this.map);
    this.graphs.push(this.polyline);
  }

  initPolygon = (data, option, item) => {
    this.polygon = new AMap.Polygon({
      path: data, // 设置多边形边界路径
      strokeColor: option.borderColor, // 线颜色
      strokeStyle: option.borderType,
      strokeWeight: option.borderWidth,    // 线宽
      fillColor: option.color, // 填充色
      fillOpacity: option.opacity, // 填充颜色透明度
      zIndex: option.zIndex,
      bubble: true,
      cursor: 'pointer',
    });

    this.polygon.on('click', () => {
      this.handleClick('多边形', item);
    });
    this.polygon.setMap(this.map);
    this.graphs.push(this.polygon);
  }

  initCircle = (data, option, item) => {
    const { cx, cy, r } = data;
    this.circle = new AMap.Circle({
      center: new AMap.LngLat(cx, cy), // 圆心位置
      radius: r, // 半径
      strokeColor: option.borderColor, // 线颜色
      strokeStyle: option.borderType,
      strokeWeight: option.borderWidth, // 线粗细度
      fillColor: option.color, // 填充颜色
      fillOpacity: option.opacity, // 填充颜色透明度
      zIndex: option.zIndex,
      bubble: true,
      cursor: 'pointer',
    });
    this.circle.on('click', () => {
      this.handleClick('圆形', item);
    });
    this.circle.setMap(this.map);
    this.graphs.push(this.circle);
  }

  initRectangle = (data, option, item) => {
    const [[southWestLng01, southWestLat02], [northEastLng01, northEastLat02]] = data;
    const southWest = new AMap.LngLat(southWestLng01, southWestLat02);
    const northEast = new AMap.LngLat(northEastLng01, northEastLat02);
    const bounds = new AMap.Bounds(southWest, northEast);
    this.rectangle = new AMap.Rectangle({
      map: this.map,
      bounds,
      strokeColor: option.borderColor,
      strokeWeight: option.borderWidth,
      strokeDasharray: [10, 10],
      strokeStyle: option.borderType,
      fillColor: option.color,
      fillOpacity: option.opacity, // 填充颜色透明度
      zIndex: option.zIndex,
      bubble: true,
      cursor: 'pointer',
    });
    this.rectangle.on('click', () => {
      this.handleClick('矩形', item);
    });
    this.graphs.push(this.rectangle);
  }

  handleClick = (type, data) => {
    this.props.onClick({
      type,
      data,
    });
  }

  handleOff = () => {

  }

  convertCoord(data) {
    const { type, shape } = data;
    if (type === 'circle') {
      const [cx, cy] = convertWgs84ToGcj02(shape.cx, shape.cy);
      return { ...data, shape: { cx, cy, r: shape.r } };
    } else {
      return {
        ...data,
        shape: { points: shape.points.map(p => convertWgs84ToGcj02(p[0], p[1])) },
      };
    }
  }

  render() {
    return null;
  }
}
