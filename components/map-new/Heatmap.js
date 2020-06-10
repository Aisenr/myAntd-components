import React from 'react';
import PropTypes from 'prop-types';
import { convertWgs84ToGcj02 } from './utils/coordtransform';

export default class Heapmap extends React.PureComponent {

  static propTypes = {
    name: PropTypes.string,
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
    max: 200,
    data: [],
    clusterGridSize: 25,
    clusterMaxZoom: 18,
  }

  constructor(props) {
    super(props);
    if (typeof window !== 'undefined') {
      if (!props.map) {
        console.warn('没有地图实例；组件必须作为 Map 的子组件使用');
      } else {
        this.map = props.map;
        this.element = this.map.getContainer();
        this.createHeapmap(props);
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    const { max, data } = nextProps;
    if (data && data !== this.props.data && this.heatmap) {
      const newData = this.convertCoord(data);
      this.heatmap.setDataSet({
        data: newData,
        max,
      });
    }
  }

  componentWillUnmount() {
    if (this.map && this.heatmap && this.element.childNodes.length > 0) {
      this.map.remove(this.heatmap);
    }
  }

  createHeapmap(props) {
    const { max, data, clusterGridSize, clusterMaxZoom } = props;
    const newData = this.convertCoord(data);
    // if (this.heatmap) this.map.remove(this.heatmap);
    this.map.plugin(['AMap.Heatmap'], () => {
      // 初始化heatmap对象
      this.heatmap = new AMap.Heatmap(this.map, {
        radius: clusterGridSize, // 给定半径
        opacity: [0, 0.8],
        gradient: {
          0.5: 'blue',
          0.65: 'rgb(117,211,248)',
          0.7: 'rgb(0, 255, 0)',
          0.9: '#ffea00',
          1.0: 'red',
        },
        zooms: [3, clusterMaxZoom],
      });
      // 设置数据集：该数据为北京部分“公园”数据
      this.heatmap.setDataSet({
        data: newData,
        max,
      });
    });
  }

  convertCoord(data) {
    return data.map((item) => {
      if (item instanceof Array) {
        const [lng, lat] = convertWgs84ToGcj02(item[0], item[1]);
        return {
          count: item[2] || 1,
          lng,
          lat,
        };
      }
      const value = item.value;
      if (value instanceof Array) {
        const [lng, lat] = convertWgs84ToGcj02(item.value[0], item.value[1]);
        return {
          count: item[2] || 1,
          lng,
          lat,
        };
      }
      const [lng, lat] = convertWgs84ToGcj02(item.lng, item.lat);
      return {
        ...item,
        lng,
        lat,
      };
    });
  }

  render() {
    return null;
  }

}
