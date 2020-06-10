import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import { convertGcj02ToWgs84 } from './utils/coordtransform';

export default class ContextMenu extends React.PureComponent {

  static propTypes = {
    items: PropTypes.arrayOf(PropTypes.shape({
      text: PropTypes.string,
      onClick() {},
    })),
    content: PropTypes.object,
  };

  static defaultProps = {
    items: [],
    content: null,
  };

  constructor(props) {
    super(props);
    if (typeof window !== 'undefined') {
      if (!props.map) {
        console.warn('没有地图实例；组件必须作为 Map 的子组件使用');
      } else {
        this.map = props.map;
        this.createContextMenu(props);
      }
    }
  }

  // componentWillReceiveProps(nextProps) {
    // const { areaCode } = this.props;
    // if (areaCode !== nextProps.areaCode) this.createBoundary(nextProps);
  // }

  componentWillUnmount() {
    if (this.contextMenu) {
      this.contextMenu.close();
    }
  }

  createContextMenu(props) {
    if (this.contextMenu) {
      this.contextMenu.close();
    }
    const { content, items } = props;
    if (content) {
      this.customizeMenu(content);
    } else if (items.length > 0) {
      this.defaultMenu(items);
    }
    this.map.on('rightclick', (e) => {
      const { lng, lat } = e.lnglat;
      const newLngLat = convertGcj02ToWgs84(lng, lat);
      ContextMenu.contextMenuPositon = newLngLat;
      this.contextMenu.open(this.map, e.lnglat);
      this.contextMenuPositon = newLngLat; // 右键菜单位置
    });
  }

  defaultMenu = (items) => {
    this.contextMenu = new AMap.ContextMenu();
    items.forEach((item, index) => {
      this.contextMenu.addItem(item.text, () => item.onClick(this.contextMenuPositon), index);
    });
  }

  customizeMenu = (content) => {
    this.node = document.createElement('div');
    ReactDOM.render(content, this.node);
    this.contextMenu = new AMap.ContextMenu({ isCustom: true, content: this.node });
  }

  render() {
    return null;
  }
}

ContextMenu.contextMenuPositon = {};
