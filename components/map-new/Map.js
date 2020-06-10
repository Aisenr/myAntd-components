import React from 'react';
import PropTypes from 'prop-types';
import APILoader from './APILoader';
import { convertWgs84ToGcj02, convertGcj02ToWgs84 } from './utils/coordtransform';
import { MapNew } from '../index';

const containerStyle = {
  width: '100%',
  height: '100%',
};
const wrapperStyle = {
  width: '100%',
  height: '100%',
  position: 'relative',
};

export default class Map extends React.PureComponent {

  static propTypes = {
    key: PropTypes.string,
    useAMapUI: PropTypes.bool,
    version: PropTypes.string,
    center: PropTypes.array,
    zoom: PropTypes.number,
    option: PropTypes.object,
    onClick: PropTypes.func,
    onBoundsChanged: PropTypes.func,
    features: PropTypes.arrayOf(PropTypes.oneOf(['bg', 'point', 'road', 'building'])),
    onRightClick: PropTypes.func,
  }

  static defaultProps = {
    key: '8af8372cd8cf352d0862abf8f97050e7',
    version: '1.4.6',
    useAMapUI: false,
    center: [],
    zoom: 5,
    option: {},
    onClick() {},
    onBoundsChanged() {},
    onRightClick() {},
    features: ['bg', 'point', 'road', 'building'],
  }

  constructor(props) {
    super(props);
    this.state = {
      mapLoaded: false,
    };
  }

  componentDidMount() {
    const { useAMapUI, key, version } = this.props;
    if (typeof window !== 'undefined') {
      new APILoader({
        key,
        useAMapUI,
        version,
      }).load().then(() => {
        this.createInstance();
        if (!this.state.mapLoaded) {
          this.setState({
            mapLoaded: true,
          });
        }
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    const { center, zoom } = nextProps;
    const [lng, lat] = center;
    if (this.map) {
      const currentCenter = this.map.getCenter();
      if (center !== currentCenter && zoom !== this.map.getZoom() && lng && lat) {
        this.map.setZoomAndCenter(zoom, convertWgs84ToGcj02(lng, lat));
      } else if (lng && lat && center !== currentCenter) {
        this.map.setCenter(convertWgs84ToGcj02(lng, lat));
      } else if (zoom !== this.map.getZoom()) {
        this.map.setZoom(zoom);
      }
    }
  }

  componentWillUnmount() {
    if (this.map) {
      this.map.off('click');
      this.map.off('moveend');
      this.map.off('rightclick');
      this.map.destroy();
    }
  }

  onRightClick = (e) => {
    const { onRightClick } = this.props;
    const point = [e.lnglat.lng, e.lnglat.lat];
    onRightClick({ ...e, point });
  }

  createInstance() {
    if (this.map) return;
    const { zoom, center, option: { mapStyle, ...rest }, features, ...outerRest } = this.props;
    this.map = new window.AMap.Map(
      this.mapWrapper,
      {
        resizeEnable: true,
        zoom,
        center: center[0] && convertWgs84ToGcj02(center[0], center[1]),
        mapStyle: `amap://styles/${mapStyle || 'normal'}`,
        ...rest,
        ...outerRest,
      });
    this.map.on('click', this.handleClick);
    this.map.on('moveend', this.handleBoundsChanged);
    this.map.on('rightclick', this.onRightClick);
    this.map.setFeatures(features);
  }

  handleClick = (e) => {
    const { lnglat: { lng, lat } } = e;
    const { onClick } = this.props;
    onClick({ point: convertGcj02ToWgs84(lng, lat) });
  }

  handleBoundsChanged = () => {
    const { onBoundsChanged } = this.props;
    const {
      northeast: { lng: northeastLng, lat: northeastLat },
      southwest: { lng: southwestLng, lat: southwestLat },
    } = this.map.getBounds();
    const { lng: centerLng, lat: centerLat } = this.map.getCenter();
    onBoundsChanged(
      [...convertGcj02ToWgs84(northeastLng, northeastLat), ...convertGcj02ToWgs84(southwestLng, southwestLat)],
      convertGcj02ToWgs84(centerLng, centerLat),
      this.map.getZoom(),
    );
  }

  renderChildren() {
    const { children } = this.props;
    return React.Children.map(children, (child) => {
      if (child) {
        const cType = child.type;
        /* 针对下面两种组件不注入地图相关属性
         * 1. 明确声明不需要注入的
         * 2. DOM 元素
         */
        if (cType.preventAmap || (typeof cType === 'string')) {
          return child;
        }
        return React.cloneElement(child, {
          map: this.map,
        });
      }
      return child;
    });
  }

  render() {
    const { style, loading } = this.props;
    const { mapLoaded } = this.state;
    return (
      <div style={style || wrapperStyle}>
        <div ref={(div) => { this.mapWrapper = div; }} style={containerStyle}>
          {
            mapLoaded ? null : loading || null
          }
        </div>
        <div>{ mapLoaded ? this.renderChildren() : null }</div>
      </div>
    );
  }
}
