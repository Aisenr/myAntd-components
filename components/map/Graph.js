import React from 'react';
import PropTypes from 'prop-types';
import { convertWgs84ToBd09 } from './coordtransform';

export default class Graph extends React.PureComponent {

  static propTypes = {
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
    onClick: PropTypes.func,
  };

  static defaultProps = {
    itemStyle: {},
    onClick() {},
  };

  constructor(props) {
    super(props);
    this.state = {
      shape: this.convertCoord(props.type, props.shape),
    };
  }

  handleClick = (params) => {
    if (params.seriesId === this.getSeriesId()) {
      params.event.event.data = {
        type: params.seriesName,
        data: params.data.$original || params.data,
      };
      this.props.onClick(params.event.event.data);
    }
  };

  componentDidMount() {
    setTimeout(() => {
      this.setOptions();
      this.props.map.chart.on('click', this.handleClick);
    }, 0);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.shape && nextProps.shape !== this.props.shape) {
      this.setState({
        shape: this.convertCoord(nextProps.type, nextProps.shape),
      });
    }
  }

  componentDidUpdate() {
    this.setOptions();
  }

  componentWillUnmount() {
    if (this.props.map) {
      this.props.map.chart && this.props.map.chart.off('click', this.handleClick);
      this.props.map.setOptions({
        series: [{...this.series, id: this.getSeriesId(), data: []}],
      });
    }
  }

  setOptions() {
    this.props.map.setOptions({
      series: [{
        ...this.series,
        id: this.getSeriesId(),
        name: this.props.name || this.series.name,
        dimensions: ['lng', 'lat', { name: 'value', type: 'ordinal' }],
        renderItem: this.customRenderItem,
        data: [{
          name: this.props.name,
          value: [0, 0, { type: this.props.type, shape: this.state.shape }],
          itemStyle: { normal: this.props.itemStyle },
        }],
      }],
    });
  }

  getSeriesId() {
    return this.props.id || this.series.id;
  }

  getScreenLength(point, length) {
    const map = this.props.map.map;
    const start = point;
    const end = new BMap.Point(point.lng + 0.1, point.lat);
    const distance = map.getDistance(start, end);
    const startPixel = map.pointToPixel(start);
    const endPixel = map.pointToPixel(end);
    return length / distance * Math.abs(endPixel.x - startPixel.x);
  }

  customRenderItem = (params, api) => {
    const data = api.value(2);
    if (!data) {
      return;
    }

    if (data.type === 'circle') {
      const point = [data.shape.cx, data.shape.cy];
      const [cx, cy] = api.coord(point);
      return {
        type: data.type,
        shape: {
          cx,
          cy,
          r: this.getScreenLength(new BMap.Point(point[0], point[1]), data.shape.r),
        },
        style: api.style(),
      };
    } else {
      const result = {
        type: data.type,
        shape: {
          points: data.shape.points.map((p) => {
            return api.coord(p);
          }),
        },
        style: api.style(),
      };
      return result;
    }
  };

  series = {
    id: `graph${Math.floor(Math.random() * 10000000000)}`,
    name: 'graph',
    type: 'custom',
    coordinateSystem: 'bmap',
    animationDurationUpdate: 0,
  };

  convertCoord(type, shape) {
    if (type === 'circle') {
      const [cx, cy] = convertWgs84ToBd09(shape.cx, shape.cy);
      return { cx, cy, r: shape.r };
    } else {
      return {
        points: shape.points.map(p => convertWgs84ToBd09(p[0], p[1])),
      };
    }
  }

  render() {
    return null;
  }
}
