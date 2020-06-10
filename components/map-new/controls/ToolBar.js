import React from 'react';
import PropTypes from 'prop-types';

export default class ToolBar extends React.PureComponent {

  static propTypes = {
    option: PropTypes.object,
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
          this.createToolBar(props);
        }, 13);
      }
    }
  }

  createToolBar(props) {
    const { option } = props;
    AMap.plugin(['AMap.ToolBar'],
      () => {
        this.map.addControl(new AMap.ToolBar(option));
      });
  }

  render() {
    return null;
  }
}
