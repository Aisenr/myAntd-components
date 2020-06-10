import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import { convertWgs84ToGcj02, convertGcj02ToWgs84 } from './utils/coordtransform';

function getContent(item, props) {
  const { symbol, symbolSize, content } = { ...props, ...item };
  switch (symbol) {
    case 'circle':
      return <div style={{ background: 'red', width: symbolSize || '10px', height: symbolSize || '10px', borderRadius: symbolSize || '10px' }} />;
    default:
      return content;
  }
}

export default class Markers extends React.PureComponent {

  static propTypes = {
    data: PropTypes.arrayOf(
      PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.number),
        PropTypes.shape({
          name: PropTypes.string,
          value: PropTypes.arrayOf(PropTypes.number),
          content: PropTypes.object,
          symbol: PropTypes.string,
          symbolSize: PropTypes.oneOfType([PropTypes.number, PropTypes.arrayOf(PropTypes.number)]),
          symbolRotate: PropTypes.number,
          symbolOffset: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.number, PropTypes.string])),
        }),
      ]),
    ),
    symbol: PropTypes.string,
    symbolSize: PropTypes.oneOfType([PropTypes.number, PropTypes.arrayOf(PropTypes.number)]),
    symbolRotate: PropTypes.number,
    symbolOffset: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.number, PropTypes.string])),
    clusterGridSize: PropTypes.number, // 聚合计算时网格的像素大小
    clusterMaxZoom: PropTypes.number, // 最大的聚合级别，大于该级别就不进行相应的聚合
    onClick: PropTypes.func,
    fitView: PropTypes.bool,
    styles: PropTypes.arrayOf(PropTypes.shape({
      url: PropTypes.string,
      size: PropTypes.arrayOf(PropTypes.number),
      offset: PropTypes.arrayOf(PropTypes.number),
      imageOffset: PropTypes.arrayOf(PropTypes.number),
      textColor: PropTypes.string,
      textSize: PropTypes.number,
    })),
  };

  static defaultProps = {
    data: [],
    symbol: '//webapi.amap.com/theme/v1.3/markers/n/mark_b.png',
    symbolSize: 20,
    symbolRotate: 0,
    symbolOffset: [0, 0],
    clusterGridSize: 60,
    clusterMaxZoom: 0,
    onClick() {},
    fitView: false,
    styles: [],
  };

  constructor(props) {
    super(props);
    if (typeof window !== 'undefined') {
      if (!props.map) {
        console.warn('没有地图实例；组件必须作为 Map 的子组件使用');
      } else {
        this.map = props.map;
        this.createMarkers(props);
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.data && nextProps.data !== this.props.data) {
      this.createMarkers(nextProps);
    }
  }

  componentWillUnmount() {
    if (this.clusterer) {
      this.clusterer.removeMarkers(this.markers);
    } else if (this.markers) {
      this.map.remove(this.markers);
    }
  }

  handleMarkerClick = (e) => {
    if (e.type === 'Point') {
      const { value } = e;
      this.props.onClick({ data: { ...e, value: convertGcj02ToWgs84(value[0], value[1]) } });
    } else {
      const { markers } = e;
      this.props.onClick({
        data: markers.map((item) => {
          const { lng, lat } = item.getPosition();
          return {
            type: 'Point',
            value: convertGcj02ToWgs84(lng, lat),
          };
        }),
      });
    }
  }

  handleOffClick = () => {

  }

  handleMouseover = (marker, item) => {
    // const { symbol } = this.props;
    // const icon = new AMap.Icon({
    //   image: item.symbol || symbol,
    //   size: this.symbolSizeFunc(item.symbolSize, 5),
    //   imageSize: this.symbolSizeFunc(item.symbolSize, 5),
    //   imageOffset: new AMap.Pixel(-2.5, -5),
    // });
    // marker.setIcon(icon);
  }

  handleMouseout = (marker, item) => {
    // const { symbol } = this.props;
    // const icon = new AMap.Icon({
    //   image: this.convertSymbol(item.symbol) || symbol,
    //   imageSize: this.symbolSizeFunc(item.symbolSize, 0),
    // });
    // marker.setIcon(icon);
  }

  markers = [];

  createMarkers(props) {
    const { data, symbol, symbolOffset, clusterMaxZoom, clusterGridSize, fitView, styles, ...rest } = props;
    const protocol = document.location.protocol;
    this.clusterer && this.clusterer.removeMarkers(this.markers);
    if (clusterGridSize === 0) {
      this.map.remove(this.markers);
    }
    this.markers.splice(0, this.markers.length);
    if (data.length <= 0) return;
    data.forEach((item) => {
      const { symbolOffset: itemSymbolOffset } = item;
      const newSymbolOffset = itemSymbolOffset || symbolOffset;
      const icon = new AMap.Icon({
        image: this.convertSymbol(item.symbol) || `${protocol}${symbol}`,
        // image: 'http://webapi.amap.com/theme/v1.3/markers/n/mark_b.png',
        imageSize: this.symbolSizeFunc(item.symbolSize, 0),
      });
      const newItem = this.convertCoord(item);
      if (!newItem.value || newItem.value.length <= 0) return;
      const marker = new AMap.Marker({
        title: newItem.name,
        icon,
        position: newItem.value,
        offset: new AMap.Pixel(newSymbolOffset[0], newSymbolOffset[1]),
        ...item,
      });
      const content = getContent(item, props);
      if (content) {
        this.node = document.createElement('div');
        ReactDOM.render(content, this.node);
        marker.setContent(this.node);
      }
      marker.on('click', () => this.handleMarkerClick(newItem));
      marker.on('mouseover', () => this.handleMouseover(marker, item));
      marker.on('mouseout', () => this.handleMouseout(marker, item));
      if (clusterGridSize === 0) {
        marker.setMap(this.map);
      }
      this.markers.push(marker);
    });

    if (clusterGridSize === 0) {
      fitView && this.markers && this.map.setFitView(this.markers);
      return;
    }
    if (!this.clusterer) {
      const newStyles = styles.length === 0 ? null : styles.map((item) => {
        const { size, offset, imageOffset } = item;
        const newSize = size && size.length > 1 ? new AMap.Size(size[0], size[1]) : null;
        const newOffset = offset && offset.length > 1 ? new AMap.Pixel(offset[0], offset[1]) : null;
        const newImageOffset = imageOffset && imageOffset.length > 1 ? new AMap.Pixel(imageOffset[0], imageOffset[1]) : null;
        return {
          ...item,
          size: newSize,
          offset: newOffset,
          imageOffset: newImageOffset,
        };
      });

      AMap.plugin('AMap.MarkerClusterer', () => { // 异步
        this.clusterer = new AMap.MarkerClusterer(props.map, this.markers, {
          gridSize: clusterGridSize,
          maxZoom: clusterMaxZoom,
          styles: newStyles,
          ...rest,
        });
        this.clusterer.on('click', this.handleMarkerClick);
      });
    } else {
      this.clusterer.clearMarkers();
      this.clusterer.addMarkers(this.markers);
    }
  }

  symbolSizeFunc = (value, enlarge) => {
    const { symbolSize } = this.props;
    const newValue = value instanceof Array ? value : [value || 0, value || 0];
    const newSymbolSize = symbolSize instanceof Array ? symbolSize : [symbolSize, symbolSize];
    return new AMap.Size((newValue[0] || newSymbolSize[0]) + enlarge, (newValue[1] || newSymbolSize[1]) + enlarge);
  }

  convertCoord(data) {
    const lnglat = data instanceof Array ? data : data.value;
    if (!lnglat || lnglat.length <= 1) {
      return { value: [] };
    }
    const value = convertWgs84ToGcj02(lnglat[0], lnglat[1]);
    const newItem = data instanceof Array ? { value, type: 'Point' } : { ...data, name: data.name, value, type: 'Point' };
    return newItem;
  }

  convertSymbol(url) {
    if (url && url.indexOf('image://') === 0) { return url.substr(url.indexOf('//') + 2); }
    return url;
  }

  render() {
    return null;
  }
}
