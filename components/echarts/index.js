import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import echarts from 'echarts';

export default class Echarts extends PureComponent {
  static defaultProps = {
    option: {},
    events: {},
    loading: false,
  }

  static propTypes = {
    theme: PropTypes.string,
    option: PropTypes.object,
    data: PropTypes.object,
    notMerge: PropTypes.bool,
    lazyUpdate: PropTypes.bool,
    events: PropTypes.object,
    fetchMap: PropTypes.func,
    loading: PropTypes.bool,
  }

  constructor(props) {
    super(props);
    this.events = {};
  }

  componentDidMount() {
    this.chart = echarts.init(this.container, Echarts.defaultTheme || this.props.theme);
    this.setOptions();

    window && window.addEventListener('resize', this.onresize);
  }

  componentDidUpdate() {
    this.setOptions();
  }

  componentWillUnmount() {
    if (this.chart) {
      this.chart.dispose();
      this.chart = null;
    }

    window && window.removeEventListener('resize', this.onresize);
  }

  onresize = () => {
    try {
      this.chart.resize();
    } catch (e) {
      console.log(e);
    }
  };

  getSeries() {
    const { series } = this.props.option;
    return (series instanceof Array ? series : [series]).map((s) => {
      const data = this.props.data[s.name];
      if (s.map || s.geoIndex !== undefined) {
        const mapType = this.getSeriesMapType(s, this.props.option);
        return {
          ...s,
          data: this.getMapSeriesData(mapType, data),
        };
      } else {
        return {
          ...s,
          data,
        };
      }
    });
  }

  getMapSeriesData(mapType, data) {
    const map = echarts.getMap(mapType);
    return data.map((item) => {
      const feature = map.geoJson.features.find(f => f.id.replace(/(00)+$/, '') === item.name);
      if (feature) {
        return {
          ...item,
          name: feature.properties.name,
        };
      } else {
        return item;
      }
    });
  }

  getOption() {
    const { option, data } = this.props;
    if (!option || !data) {
      return option;
    }

    return {
      ...option,
      series: this.getSeries(),
    };
  }

  setOptions() {
    if (!this.checkMapRegister()) {
      return;
    }

    const option = this.getOption();
    if (option) {
      const { notMerge, lazyUpdate } = this.props;
      this.chart.setOption(option, notMerge, lazyUpdate);
    }

    this.registerEvents();

    this.props.loading ? this.chart.showLoading() : this.chart.hideLoading();
  }

  /**
   * 取得在option中未注册的地图
   * @returns {Array} 尚未注册的地图类型
   */
  getUnRegistedMap() {
    const unRegistedMaps = [];

    const { geo, series } = this.props.option;
    if (geo && geo.map && !echarts.getMap(geo.map)) {
      unRegistedMaps.push(geo.map);
    }

    if (series) {
      (series instanceof Array ? series : [series]).forEach((s) => {
        if (s.map && !echarts.getMap(s.map)) {
          unRegistedMaps.push(s.map);
        }
      });
    }

    return unRegistedMaps;
  }

  getSeriesMapType(series, option) {
    if (series.map) {
      return series.map;
    }

    if (series.geoIndex !== undefined) {
      return option.geo.map;
    }
  }

  /**
   * 注册echart事件
   */
  registerEvents() {
    for (const name in this.events) {
      if (typeof this.events[name] === 'function') {
        this.chart.off(name, this.events[name]);
      }
    }

    const { events } = this.props;
    for (const name in events) {
      if (typeof events[name] === 'function') {
        this.chart.on(name, events[name]);
      }
    }

    this.events = events;
  }

  /**
   * 检查option中的地图是否都已注册.
   * 有未注册的地图时，调用this.props.fetchMap加载地图
   * @returns {boolean} 若地图都已注册，返回true, 否则返回false
   */
  checkMapRegister() {
    const unRegistedMaps = this.getUnRegistedMap();
    if (unRegistedMaps.length > 0 && this.props.fetchMap) {
      this.props.fetchMap(unRegistedMaps).then((maps) => {
        maps.forEach((map, index) => {
          const mapType = unRegistedMaps[index];
          if (!echarts.getMap(mapType)) {
            echarts.registerMap(mapType, map);
          }
        });
        this.setOptions();
      });
      return false;
    }

    return true;
  }

  setContainer = (item) => { this.container = item; };

  render() {
    const { theme, option, data, notMerge, lazyUpdate, events, fetchMap, loading, ...rest } = this.props;
    return (
      <div ref={this.setContainer} {...rest} />
    );
  }
}
