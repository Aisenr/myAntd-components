import React from 'react';
import PropTypes from 'prop-types';

export default class ControlBar extends React.PureComponent {

  static propTypes = {
    option: PropTypes.shape({
      position: PropTypes.object,
      showZoomBar: PropTypes.bool,
      showControlButton: PropTypes.bool,
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
          this.createControlBar(props);
        }, 13);
      }
    }
  }

  createControlBar(props) {
    const { option } = props;
    AMap.plugin(['AMap.ControlBar'],
      () => {
        this.map.addControl(new AMap.ControlBar(option));
      });
  }

  render() {
    return null;
  }
}
