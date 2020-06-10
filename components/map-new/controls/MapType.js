import React from 'react';
import PropTypes from 'prop-types';

export default class MapType extends React.PureComponent {

  static propTypes = {
    option: PropTypes.shape({
      defaultType: PropTypes.number,
      showTraffic: PropTypes.bool,
      showRoad: PropTypes.bool,
    }),
  };

  static defaultProps = {
    option: {},
  };

  constructor(props) {
    super(props);
    if (typeof window !== 'undefined') {
      if (!props.map) {
        console.warn('没有地图实例；组件必须作为 Map 的子组件使用');
      } else {
        this.map = props.map;
        this.element = this.map.getContainer();
        setTimeout(() => {
          this.createMapType(props);
        }, 13);
      }
    }
  }

  createMapType(props) {
    const { option } = props;
    AMap.plugin(['AMap.MapType'],
      () => {
        this.map.addControl(new AMap.MapType(option));
      });
  }

  render() {
    return null;
  }
}
