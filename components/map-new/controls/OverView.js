import React from 'react';
import PropTypes from 'prop-types';

export default class OverView extends React.PureComponent {

  static propTypes = {
    option: PropTypes.shape({
      tileLayer: PropTypes.object,
      isOpen: PropTypes.bool,
      visible: PropTypes.bool,
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
          this.createOverView(props);
        }, 13);
      }
    }
  }

  createOverView(props) {
    const { option } = props
    AMap.plugin(['AMap.OverView'],
      () => {
        this.map.addControl(new AMap.OverView(option));
      });
  }

  render() {
    return null;
  }
}
