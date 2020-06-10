import React from 'react';
import PropTypes from 'prop-types';
import { convertWgs84ToBd09 } from './coordtransform';
import { cluster, getExtendedBounds } from './cluster';

export default class Markers extends React.PureComponent {

  static propTypes = {
    name: PropTypes.string,
    data: PropTypes.arrayOf(
      PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.number),
        PropTypes.shape({
          name: PropTypes.string,
          value: PropTypes.arrayOf(PropTypes.number),
        }),
      ]),
    ),
    symbol: PropTypes.string,
    symbolSize: PropTypes.oneOfType([PropTypes.number, PropTypes.arrayOf(PropTypes.number)]),
    symbolRotate: PropTypes.number,
    symbolOffset: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.number, PropTypes.string])),
    itemStyle: PropTypes.shape({
      color: PropTypes.string,
      borderColor: PropTypes.string,
      borderWidth: PropTypes.number,
      borderType: PropTypes.oneOf(['solid', 'dashed', 'dotted']),
      opacity: PropTypes.number,
    }),
    clusterGridSize: PropTypes.number, // 聚合计算时网格的像素大小
    clusterMaxZoom: PropTypes.number, // 最大的聚合级别，大于该级别就不进行相应的聚合
    onClick: PropTypes.func,
  };

  static defaultProps = {
    data: [],
    symbol: 'pin',
    symbolSize: 20,
    symbolRotate: 0,
    symbolOffset: [0, 0],
    itemStyle: {},
    clusterGridSize: 20,
    clusterMaxZoom: 0,
    onClick() {},
  };

  constructor(props) {
    super(props);
    const data = this.convertCoord(props.data);
    this.state = { data, inBoundsData: [] };
  }

  componentDidMount() {
    setTimeout(() => {
      this.map = this.props.map.map;
      this.handleBoundsChange();
      this.props.map.chart.on('click', this.handleClick);
      this.map.addEventListener('zoomend', this.handleBoundsChange);
      this.map.addEventListener('moveend', this.handleBoundsChange);
    }, 0);
  }

  changeBounds(data = this.state.data) {
    const mapBounds = this.map.getBounds();
    const extendedBounds = getExtendedBounds(this.map, mapBounds, this.props.clusterGridSize);
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
      this.props.map.chart && this.props.map.chart.off('click', this.handleClick);
      this.props.map.setOptions({
        series: [{ ...this.series, id: this.getSeriesId(), data: [] }],
      });
    }

    if (this.map) {
      this.map.removeEventListener('zoomend', this.handleBoundsChange);
      this.map.removeEventListener('moveend', this.handleBoundsChange);
    }
  }

  setOptions() {
    const { symbol, symbolRotate, symbolOffset, itemStyle } = this.props;
    this.props.map.setOptions({
      series: [{
        ...this.series,
        id: this.getSeriesId(),
        name: this.props.name || this.series.name,
        data: this.state.inBoundsData,
        symbol,
        symbolSize: this.symbolSizeFunc,
        symbolRotate,
        symbolOffset,
        itemStyle: { normal: itemStyle },
        tooltip: {
          show: true,
          trigger: 'item',
          formatter: this.tooltipFunc,
        },
      }],
    });
  }

  tooltipFunc = (param) => {
    const { markers } = param.data;
    if (markers && markers.length > 1) {
      const names = markers.map(marker => marker.name).filter(name => name).join(', ');
      if (names.length > 10) {
        return `${names.slice(0, 10)}...（共${param.data.markers.length}个）`;
      } else if (names.length === 0) {
        return `（共${param.data.markers.length}个）`;
      } else {
        return `${names}`;
      }
    } else {
      return param.name;
    }
  };

  symbolSizeFunc = (value, param) => {
    const { symbolSize } = this.props;
    if (symbolSize instanceof Function) {
      return symbolSize(value, param);
    } else if (param.data.markers && param.data.markers.length > 1) {
      return symbolSize * 1.2;
    } else {
      return symbolSize;
    }
  };

  getSeriesId() {
    return this.props.id || this.series.id;
  }

  series = {
    id: `heat${Math.floor(Math.random() * 10000000000)}`,
    name: 'marker',
    type: 'scatter',
    coordinateSystem: 'bmap',
    animationDurationUpdate: 0,
  };

  handleClick = (params) => {
    if (params.seriesId === this.getSeriesId()) {
      params.event.event.data = {
        type: params.seriesName,
        data: params.data.$original || params.data,
      };
      this.props.onClick(params.event.event.data);
    }
  };

  handleBoundsChange = () => {
    this.changeBounds();
  };

  convertCoord(data = []) {
    return data.map((item) => {
      const [lng, lat, ...rest] = item instanceof Array ? item : item.value;
      const value = [...convertWgs84ToBd09(lng, lat), ...rest];
      const newItem = item instanceof Array ? value : { ...item, value };
      newItem.$original = item;
      newItem.$baiduPoint = new BMap.Point(value[0], value[1]);
      return newItem;
    });
  }

  render() {
    return null;
  }
}
