import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import { convertWgs84ToGcj02 } from './utils/coordtransform';

export default class InfoWindow extends React.PureComponent {

  static propTypes = {
    position: PropTypes.arrayOf(PropTypes.number).isRequired,
    width: PropTypes.number,
    height: PropTypes.number,
    offset: PropTypes.arrayOf(PropTypes.number),
    onClose: PropTypes.func,
  };

  static defaultProps = {
    width: 0,
    height: 0,
    offset: [0, 0],
    onClose() {},
  };

  constructor(props) {
    super(props);
    if (typeof window !== 'undefined') {
      if (!props.map) {
        console.warn('没有地图实例；组件必须作为 Map 的子组件使用');
      } else {
        this.map = props.map;
        this.createInfoWindow(props);
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.position && nextProps.position !== this.props.position) {
      this.createInfoWindow(nextProps);
    }
  }

  componentWillUnmount() {
    if (this.infoWindow) {
      this.map.remove(this.infoWindow);
    }
  }

  createInfoWindow(props) {
    const { map, position, offset, children } = props;
    if (this.infoWindow) {
      this.map.remove(this.infoWindow);
    }
    this.infoWindow = new AMap.InfoWindow({
      offset: new AMap.Pixel(offset[0], offset[1]),
    });
    this.node = document.createElement('div');
    ReactDOM.render(children, this.node);
    this.infoWindow.setContent(this.node);
    const newPosition = convertWgs84ToGcj02(position[0], position[1]);
    this.infoWindow.open(map, newPosition);
  }

  // handleClose = () => {
  //   this.destroy();
  //   this.props.onClose();
  // };
  //
  // destroy() {
  //   if (this.infoWindow) {
  //     this.infoWindow.removeEventListener('close', this.handleClose);
  //     ReactDOM.unmountComponentAtNode(this.infoWindow.getContent());
  //     this.props.map.map.removeOverlay(this.marker);
  //     this.infoWindow = null;
  //     this.marker = null;
  //   }
  // }

  render() {
    return null;
  }
}
