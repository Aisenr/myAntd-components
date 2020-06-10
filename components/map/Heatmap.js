import React from 'react';
import PropTypes from 'prop-types';
import { convertWgs84ToBd09 } from './coordtransform';
import { cluster, getExtendedBounds } from './cluster';

const visualMap = {
  show: false,
  top: 'top',
  calculable: true,
  inRange: {
    color: ['blue', 'blue', 'green', 'yellow', 'red'],
  },
};

export default class Heapmap extends React.PureComponent {

  static propTypes = {
    name: PropTypes.string,
    min: PropTypes.number,
    max: PropTypes.number,
    data: PropTypes.arrayOf(
      PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.number),
        PropTypes.shape({
          name: PropTypes.string,
          value: PropTypes.arrayOf(PropTypes.number),
        }),
      ]),
    ),
    clusterGridSize: PropTypes.number, // 聚合计算时网格的像素大小
    clusterMaxZoom: PropTypes.number, // 最大的聚合级别，大于该级别就不进行相应的聚合
  };

  static defaultProps = {
    min: 0,
    max: 200,
    data: [],
    clusterGridSize: 1,
    clusterMaxZoom: 0,
  }

  constructor(props) {
    super(props);
    this.state = {
      data: this.convertCoord(props.data),
    };
  }

  componentDidMount() {
    setTimeout(() => {
      this.map = this.props.map.map;
      this.handleBoundsChange();
      this.map.addEventListener('zoomend', this.handleBoundsChange);
      this.map.addEventListener('moveend', this.handleBoundsChange);
    }, 0);
  }

  handleBoundsChange = () => {
    this.changeBounds();
  }

  changeBounds(data = this.state.data) {
    const mapBounds = this.map.getBounds();
    const extendedBounds = getExtendedBounds(this.map, mapBounds, this.map.width, this.map.height);
    this.setState({
      inBoundsData: this.getInBoundsData(data, extendedBounds),
    });
  }

  getInBoundsData(data, bounds) {
    const inBoundsData = data.filter(item => bounds.containsPoint(item.$baiduPoint));
    if (this.map.getZoom() < this.props.clusterMaxZoom) {
      return cluster(this.map, inBoundsData, this.props.clusterGridSize);
    } else {
      return inBoundsData;
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.data && nextProps.data !== this.props.data) {
      const data = this.convertCoord(nextProps.data);
      this.setState({ data });
      this.changeBounds(data);
    }
  }

  componentDidUpdate() {
    this.setOptions();
  }

  componentWillUnmount() {
    if (this.props.map) {
      this.props.map.setOptions({
        series: [{...this.series, id: this.getSeriesId(), data: []}],
      });
    }

    if (this.map) {
      this.map.removeEventListener('zoomend', this.handleBoundsChange);
      this.map.removeEventListener('moveend', this.handleBoundsChange);
      this.map = null;
    }
  }

  setOptions() {
    const { min, max } = this.props;
    const chartSeries = this.props.map.chart.getOption().series;
    const index = chartSeries.findIndex(series => series.id === this.getSeriesId());
    this.props.map.setOptions({
      visualMap: { ...visualMap, min, max, seriesIndex: [index < 0 ? chartSeries.length : index] },
      series: [{
        ...this.series,
        id: this.getSeriesId(),
        name: this.props.name || this.series.name,
        data: this.state.inBoundsData,
      }],
    });
  }

  getSeriesId() {
    return this.props.id || this.series.id;
  }

  series = {
    id: `heat${Math.floor(Math.random() * 10000000000)}`,
    name: 'heat',
    type: 'heatmap',
    coordinateSystem: 'bmap',
    pointSize: 5,
    blurSize: 6,
  };

  convertCoord(data = []) {
    return data.map((item) => {
      const [lng, lat, ...rest] = item instanceof Array ? item : item.value;
      const value = [...convertWgs84ToBd09(lng, lat), ...rest];
      const newItem = item instanceof Array ? value : { ...item, value };
      newItem.$baiduPoint = new BMap.Point(value[0], value[1]);
      return newItem;
    });
  }

  render() {
    return null;
  }
}
