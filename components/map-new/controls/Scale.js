import React from 'react';
import PropTypes from 'prop-types';

export default class Scale extends React.PureComponent {

  static propTypes = {
    option: PropTypes.shape({
      show: PropTypes.func,
      hide: PropTypes.func,
      offset: PropTypes.object,
      position: PropTypes.string,
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
          this.createScale(props);
        }, 13);
      }
    }
  }

  createScale(props) {
    const { option } = props
    AMap.plugin(['AMap.Scale'],
      () => {
        this.map.addControl(new AMap.Scale(option));
      });
  }

  render() {
    return null;
  }
}
