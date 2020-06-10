import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { convertWgs84ToBd09 } from './coordtransform';

const defaultIconUrl = '//webmap1.map.bdstatic.com/wolfman/static/common/images/markers_new2x_fbb9e99.png';

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

  componentDidMount() {
    setTimeout(() => this.initialize(), 0);
  }

  componentDidUpdate() {
    if (!this.infoWindow) {
      this.initialize();
    }

    ReactDOM.render(this.props.children, this.infoWindow.getContent());
    const position = convertWgs84ToBd09(this.props.position[0], this.props.position[1]);
    this.marker.setPosition(new BMap.Point(position[0], position[1]));
    this.marker.openInfoWindow(this.infoWindow);

    // 如果窗口内容的高度发生变化，则重绘窗口
    setTimeout(() => {
      if (this.infoWindow) {
        const height = this.infoWindow.getContent().clientHeight;
        if (this.infoWindowHeight !== height) {
          this.infoWindowHeight = height;
          this.infoWindow.redraw();
        }
      }
    }, 0);
  }

  componentWillUnmount() {
    this.destroy();
  }

  initialize() {
    if (this.infoWindow) {
      return;
    }

    this.infoWindow = new BMap.InfoWindow(document.createElement('div'), {
      width: this.props.width,
      height: this.props.height,
      offset: new BMap.Size(this.props.offset[0], this.props.offset[1]),
      enableCloseOnClick: false,
    });
    ReactDOM.render(this.props.children, this.infoWindow.getContent());

    this.infoWindow.addEventListener('close', this.handleClose);
    this.infoWindow.getContent().addEventListener('click', (event) => {
      // Hack 为了确保InfoWindow中的事件能够正确触发，同时需要设定enableCloseOnClick: false
      event.stopPropagation = function () {};
    });

    const position = convertWgs84ToBd09(this.props.position[0], this.props.position[1]);
    const icon = new BMap.Icon(defaultIconUrl, new BMap.Size(0, 0), { infoWindowAnchor: new BMap.Size(0, -10) });
    this.marker = new BMap.Marker(new BMap.Point(position[0], position[1]), { enableClicking: false, icon, shadow: null });
    this.props.map.map.addOverlay(this.marker);
    this.marker.openInfoWindow(this.infoWindow);
  }

  handleClose = () => {
    this.destroy();
    this.props.onClose();
  };

  destroy() {
    if (this.infoWindow) {
      this.infoWindow.removeEventListener('close', this.handleClose);
      ReactDOM.unmountComponentAtNode(this.infoWindow.getContent());
      this.props.map.map.removeOverlay(this.marker);
      this.infoWindow = null;
      this.marker = null;
    }
  }

  render() {
    return null;
  }
}
