'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _class, _temp;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _coordtransform = require('./utils/coordtransform');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getContent(item, props) {
  var _props$item = (0, _extends3.default)({}, props, item),
      symbol = _props$item.symbol,
      symbolSize = _props$item.symbolSize,
      content = _props$item.content;

  switch (symbol) {
    case 'circle':
      return _react2.default.createElement('div', { style: { background: 'red', width: symbolSize || '10px', height: symbolSize || '10px', borderRadius: symbolSize || '10px' } });
    default:
      return content;
  }
}

var Markers = (_temp = _class = function (_React$PureComponent) {
  (0, _inherits3.default)(Markers, _React$PureComponent);

  function Markers(props) {
    (0, _classCallCheck3.default)(this, Markers);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Markers.__proto__ || (0, _getPrototypeOf2.default)(Markers)).call(this, props));

    _this.handleMarkerClick = function (e) {
      if (e.type === 'Point') {
        var value = e.value;

        _this.props.onClick({ data: (0, _extends3.default)({}, e, { value: (0, _coordtransform.convertGcj02ToWgs84)(value[0], value[1]) }) });
      } else {
        var markers = e.markers;

        _this.props.onClick({
          data: markers.map(function (item) {
            var _item$getPosition = item.getPosition(),
                lng = _item$getPosition.lng,
                lat = _item$getPosition.lat;

            return {
              type: 'Point',
              value: (0, _coordtransform.convertGcj02ToWgs84)(lng, lat)
            };
          })
        });
      }
    };

    _this.handleOffClick = function () {};

    _this.handleMouseover = function (marker, item) {
      // const { symbol } = this.props;
      // const icon = new AMap.Icon({
      //   image: item.symbol || symbol,
      //   size: this.symbolSizeFunc(item.symbolSize, 5),
      //   imageSize: this.symbolSizeFunc(item.symbolSize, 5),
      //   imageOffset: new AMap.Pixel(-2.5, -5),
      // });
      // marker.setIcon(icon);
    };

    _this.handleMouseout = function (marker, item) {
      // const { symbol } = this.props;
      // const icon = new AMap.Icon({
      //   image: this.convertSymbol(item.symbol) || symbol,
      //   imageSize: this.symbolSizeFunc(item.symbolSize, 0),
      // });
      // marker.setIcon(icon);
    };

    _this.markers = [];

    _this.symbolSizeFunc = function (value, enlarge) {
      var symbolSize = _this.props.symbolSize;

      var newValue = value instanceof Array ? value : [value || 0, value || 0];
      var newSymbolSize = symbolSize instanceof Array ? symbolSize : [symbolSize, symbolSize];
      return new AMap.Size((newValue[0] || newSymbolSize[0]) + enlarge, (newValue[1] || newSymbolSize[1]) + enlarge);
    };

    if (typeof window !== 'undefined') {
      if (!props.map) {
        console.warn('没有地图实例；组件必须作为 Map 的子组件使用');
      } else {
        _this.map = props.map;
        _this.createMarkers(props);
      }
    }
    return _this;
  }

  (0, _createClass3.default)(Markers, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (nextProps.data && nextProps.data !== this.props.data) {
        this.createMarkers(nextProps);
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      if (this.clusterer) {
        this.clusterer.removeMarkers(this.markers);
      } else if (this.markers) {
        this.map.remove(this.markers);
      }
    }
  }, {
    key: 'createMarkers',
    value: function createMarkers(props) {
      var _this2 = this;

      var data = props.data,
          symbol = props.symbol,
          symbolOffset = props.symbolOffset,
          clusterMaxZoom = props.clusterMaxZoom,
          clusterGridSize = props.clusterGridSize,
          fitView = props.fitView,
          styles = props.styles,
          rest = (0, _objectWithoutProperties3.default)(props, ['data', 'symbol', 'symbolOffset', 'clusterMaxZoom', 'clusterGridSize', 'fitView', 'styles']);

      var protocol = document.location.protocol;
      this.clusterer && this.clusterer.removeMarkers(this.markers);
      if (clusterGridSize === 0) {
        this.map.remove(this.markers);
      }
      this.markers.splice(0, this.markers.length);
      if (data.length <= 0) return;
      data.forEach(function (item) {
        var itemSymbolOffset = item.symbolOffset;

        var newSymbolOffset = itemSymbolOffset || symbolOffset;
        var icon = new AMap.Icon({
          image: _this2.convertSymbol(item.symbol) || '' + protocol + symbol,
          // image: 'http://webapi.amap.com/theme/v1.3/markers/n/mark_b.png',
          imageSize: _this2.symbolSizeFunc(item.symbolSize, 0)
        });
        var newItem = _this2.convertCoord(item);
        if (!newItem.value || newItem.value.length <= 0) return;
        var marker = new AMap.Marker((0, _extends3.default)({
          title: newItem.name,
          icon: icon,
          position: newItem.value,
          offset: new AMap.Pixel(newSymbolOffset[0], newSymbolOffset[1])
        }, item));
        var content = getContent(item, props);
        if (content) {
          _this2.node = document.createElement('div');
          _reactDom2.default.render(content, _this2.node);
          marker.setContent(_this2.node);
        }
        marker.on('click', function () {
          return _this2.handleMarkerClick(newItem);
        });
        marker.on('mouseover', function () {
          return _this2.handleMouseover(marker, item);
        });
        marker.on('mouseout', function () {
          return _this2.handleMouseout(marker, item);
        });
        if (clusterGridSize === 0) {
          marker.setMap(_this2.map);
        }
        _this2.markers.push(marker);
      });

      if (clusterGridSize === 0) {
        fitView && this.markers && this.map.setFitView(this.markers);
        return;
      }
      if (!this.clusterer) {
        var newStyles = styles.length === 0 ? null : styles.map(function (item) {
          var size = item.size,
              offset = item.offset,
              imageOffset = item.imageOffset;

          var newSize = size && size.length > 1 ? new AMap.Size(size[0], size[1]) : null;
          var newOffset = offset && offset.length > 1 ? new AMap.Pixel(offset[0], offset[1]) : null;
          var newImageOffset = imageOffset && imageOffset.length > 1 ? new AMap.Pixel(imageOffset[0], imageOffset[1]) : null;
          return (0, _extends3.default)({}, item, {
            size: newSize,
            offset: newOffset,
            imageOffset: newImageOffset
          });
        });

        AMap.plugin('AMap.MarkerClusterer', function () {
          // 异步
          _this2.clusterer = new AMap.MarkerClusterer(props.map, _this2.markers, (0, _extends3.default)({
            gridSize: clusterGridSize,
            maxZoom: clusterMaxZoom,
            styles: newStyles
          }, rest));
          _this2.clusterer.on('click', _this2.handleMarkerClick);
        });
      } else {
        this.clusterer.clearMarkers();
        this.clusterer.addMarkers(this.markers);
      }
    }
  }, {
    key: 'convertCoord',
    value: function convertCoord(data) {
      var lnglat = data instanceof Array ? data : data.value;
      if (!lnglat || lnglat.length <= 1) {
        return { value: [] };
      }
      var value = (0, _coordtransform.convertWgs84ToGcj02)(lnglat[0], lnglat[1]);
      var newItem = data instanceof Array ? { value: value, type: 'Point' } : (0, _extends3.default)({}, data, { name: data.name, value: value, type: 'Point' });
      return newItem;
    }
  }, {
    key: 'convertSymbol',
    value: function convertSymbol(url) {
      if (url && url.indexOf('image://') === 0) {
        return url.substr(url.indexOf('//') + 2);
      }
      return url;
    }
  }, {
    key: 'render',
    value: function render() {
      return null;
    }
  }]);
  return Markers;
}(_react2.default.PureComponent), _class.propTypes = {
  data: _propTypes2.default.arrayOf(_propTypes2.default.oneOfType([_propTypes2.default.arrayOf(_propTypes2.default.number), _propTypes2.default.shape({
    name: _propTypes2.default.string,
    value: _propTypes2.default.arrayOf(_propTypes2.default.number),
    content: _propTypes2.default.object,
    symbol: _propTypes2.default.string,
    symbolSize: _propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.arrayOf(_propTypes2.default.number)]),
    symbolRotate: _propTypes2.default.number,
    symbolOffset: _propTypes2.default.arrayOf(_propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.string]))
  })])),
  symbol: _propTypes2.default.string,
  symbolSize: _propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.arrayOf(_propTypes2.default.number)]),
  symbolRotate: _propTypes2.default.number,
  symbolOffset: _propTypes2.default.arrayOf(_propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.string])),
  clusterGridSize: _propTypes2.default.number, // 聚合计算时网格的像素大小
  clusterMaxZoom: _propTypes2.default.number, // 最大的聚合级别，大于该级别就不进行相应的聚合
  onClick: _propTypes2.default.func,
  fitView: _propTypes2.default.bool,
  styles: _propTypes2.default.arrayOf(_propTypes2.default.shape({
    url: _propTypes2.default.string,
    size: _propTypes2.default.arrayOf(_propTypes2.default.number),
    offset: _propTypes2.default.arrayOf(_propTypes2.default.number),
    imageOffset: _propTypes2.default.arrayOf(_propTypes2.default.number),
    textColor: _propTypes2.default.string,
    textSize: _propTypes2.default.number
  }))
}, _class.defaultProps = {
  data: [],
  symbol: '//webapi.amap.com/theme/v1.3/markers/n/mark_b.png',
  symbolSize: 20,
  symbolRotate: 0,
  symbolOffset: [0, 0],
  clusterGridSize: 60,
  clusterMaxZoom: 0,
  onClick: function onClick() {},

  fitView: false,
  styles: []
}, _temp);
exports.default = Markers;