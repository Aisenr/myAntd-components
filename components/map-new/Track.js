import React from 'react';
import { message } from 'antd';
import PropTypes from 'prop-types';

export default class Track extends React.PureComponent {

  static propTypes = {
    zIndex: PropTypes.number,
    data: PropTypes.array,
    getPath: PropTypes.func,
    getZIndex: PropTypes.func,
    getHoverTitle: PropTypes.func,
    autoSetFitView: PropTypes.bool,
    renderOptions: PropTypes.object,
    pathNavigator: PropTypes.object,
  };

  static defaultProps = {
    zIndex: 100,
    data: [],
    getPath(pathData, pathIndex) {
      // 返回轨迹数据中的节点坐标信息，[AMap.LngLat, AMap.LngLat...] 或者 [[lng|number,lat|number],...]
      return pathData.path;
    },
    getZIndex() {},
    getHoverTitle() {},
    autoSetFitView: true,
    renderOptions: {},
    pathNavigator: {
      loop: true, // 循环播放
      speed: 1000000,
    },
  };

  constructor(props) {
    super(props);
    if (typeof window !== 'undefined') {
      if (!props.map) {
        console.warn('没有地图实例；组件必须作为 Map 的子组件使用');
      } else {
        this.map = props.map;
        this.createTrack(props);
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    const { areaCode } = this.props;
    if (areaCode !== nextProps.areaCode) this.createTrack(nextProps);
  }

  componentWillUnmount() {

  }

  createTrack() {
    AMapUI.load(['ui/misc/PathSimplifier'], (PathSimplifier) => {
      if (!PathSimplifier.supportCanvas) {
        message.error('当前环境不支持 Canvas！');
        return;
      }
      // 启动页面
      this.initTrack(PathSimplifier);
    });
  }

  initTrack(PathSimplifier) {
    const { data, pathNavigator, ...rest } = this.props;
    const pathSimplifierIns = new PathSimplifier({
      map: this.map, // 所属的地图实例
      ...rest,
    });

    const newData = [];
    const pathNavigators = [];
    data.forEach((item, index) => {
      const { pathNavigator: itemPathNavigator, type, ...itemRest } = item;
      pathNavigators.push({
        pathIndex: index,
        pathNavigator: itemPathNavigator || pathNavigator,
      });
      newData.push(type === 'earthLine' ? { ...itemRest, path: PathSimplifier.getGeodesicPath(...itemRest.path) } : itemRest);
    });
    pathSimplifierIns.setData(newData);
    pathNavigators.forEach((item) => {
      const navigator = pathSimplifierIns.createPathNavigator(item.pathIndex, item.pathNavigator);
      navigator.start();
    });
  }

  render() {
    return null;
  }
}
