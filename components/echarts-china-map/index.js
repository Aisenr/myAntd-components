import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import echarts from 'echarts';
import fetch from 'isomorphic-fetch';

import Echarts from '../echarts';

/**
 * 判断当前地图是否还能够向下钻取
 * @param mapType 地图类型
 * @returns {boolean} 可向下钻取时返回true
 */
export function hasDrillDownMap(mapType, drillDownToLast) {
  const names = mapType.split('-');
  const delta = drillDownToLast ? 1 : 0;
  return names.length < 3 + delta && ['北京', '天津', '上海', '重庆', '香港', '澳门', '台湾'].indexOf(names[names.length - 1 - delta]) < 0;
}

/**
 * 可向下钻取的中国地图，地图命名规则为“国-省-市”
 */
export default class EchartsChinaMap extends PureComponent {

  static propTypes = {
    ...Echarts.propTypes,
    mapType: PropTypes.string,
    data: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
        value: PropTypes.number,
      }),
    ),
    min: PropTypes.number,
    max: PropTypes.number,
    option: PropTypes.shape({
      tooltip: PropTypes.object,
      dataRange: PropTypes.object,
    }),
    onMapTypeChange: PropTypes.func,
    fetchMap: PropTypes.func,
  };

  static defaultProps = {
    mapType: '中国',
    data: [],
    min: 0,
    max: 100,
    option: {},
    fetchMap: mapType => fetch(`/map/china/${mapType}.json`).then(res => res.json()),
  }

  /**
   * 点击地图上的行政区域时，如果该行政区域能够下钻，则调用this.props.onMapTypeChange(mapType),
   * 在this.props.onMapTypeChange中可以根据mapType重新设置echart的option
   * @param params
   */
  onClickMap = (params) => {
    const { mapType } = this.props;
    const nextMapType = `${mapType}-${params.name}`;
    if (mapType && hasDrillDownMap(mapType, true) && this.props.onMapTypeChange) {
      this.props.onMapTypeChange(
        nextMapType,
        this.getAreaId(echarts.getMap(mapType), params.name),
        hasDrillDownMap(nextMapType, true),
      );
    }
  };

  getAreaId(map, mapType) {
    const feature = map.geoJson.features.find(f => f.properties.name === mapType);
    return feature.id.replace(/(00)+$/, '');
  }

  /**
   * 获取地图数据
   * @param mapTypes 要获取地图数据的地图类型数组
   * @returns {Promise.<*>}
   */
  fetchMap = (mapTypes) => {
    return Promise.all(mapTypes.map((mapType) => {
      const map = echarts.getMap(mapType);
      if (map) {
        return Promise.resolve(map);
      }

      const index = mapType.lastIndexOf('-');
      const upperMapName = mapType.slice(0, index);
      if (!hasDrillDownMap(upperMapName) && hasDrillDownMap(upperMapName, true)) {
        return this.fetchMap([upperMapName]).then(([upperMap]) => {
          if (!upperMap) {
            return Promise.reject();
          }

          const name = mapType.slice(index + 1);
          const feature = (upperMap.UTF8Encoding ? upperMap : upperMap.geoJson).features.find(f => f.properties.name === name);
          if (!feature) {
            return Promise.reject();
          }

          const data = {
            UTF8Encoding: !!upperMap.UTF8Encoding,
            type: 'FeatureCollection',
            features: [feature],
          };
          return Promise.resolve(data);
        });
      }

      return this.props.fetchMap(mapType);
    }));
  };

  getOption() {
    const { option } = this.props;
    return {
      ...option,
      tooltip: {
        trigger: 'item',
        ...option.tooltip,
      },
      dataRange: {
        x: 'left',
        y: 'bottom',
        text: ['高', '低'],
        calculable: true,
        ...option.tooltip,
        min: this.props.min,
        max: this.props.max,
      },
      geo: {
        ...option.geo,
        map: this.props.mapType,
      },
      series: option.series || [
        {
          name: 'map',
          type: 'map',
          geoIndex: 0,
          data: [],
        },
      ],
    };
  }

  events = { click: this.onClickMap };

  render() {
    const { mapType, min, max, onMapTypeChange, fetchMap, data, ...rest } = this.props;
    const re = data && data.length > 0 ? { map: this.props.data } : undefined;
    return (<Echarts {...rest} events={this.events} option={this.getOption()} data={re} fetchMap={this.fetchMap} />);
  }
}
