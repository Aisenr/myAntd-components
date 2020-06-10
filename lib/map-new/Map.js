'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

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

var _class, _temp;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _APILoader = require('./APILoader');

var _APILoader2 = _interopRequireDefault(_APILoader);

var _coordtransform = require('./utils/coordtransform');

var _index = require('../index');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var containerStyle = {
  width: '100%',
  height: '100%'
};
var wrapperStyle = {
  width: '100%',
  height: '100%',
  position: 'relative'
};

var Map = (_temp = _class = function (_React$PureComponent) {
  (0, _inherits3.default)(Map, _React$PureComponent);

  function Map(props) {
    (0, _classCallCheck3.default)(this, Map);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Map.__proto__ || (0, _getPrototypeOf2.default)(Map)).call(this, props));

    _this.onRightClick = function (e) {
      var onRightClick = _this.props.onRightClick;

      var point = [e.lnglat.lng, e.lnglat.lat];
      onRightClick((0, _extends3.default)({}, e, { point: point }));
    };

    _this.handleClick = function (e) {
      var _e$lnglat = e.lnglat,
          lng = _e$lnglat.lng,
          lat = _e$lnglat.lat;
      var onClick = _this.props.onClick;

      onClick({ point: (0, _coordtransform.convertGcj02ToWgs84)(lng, lat) });
    };

    _this.handleBoundsChanged = function () {
      var onBoundsChanged = _this.props.onBoundsChanged;

      var _this$map$getBounds = _this.map.getBounds(),
          _this$map$getBounds$n = _this$map$getBounds.northeast,
          northeastLng = _this$map$getBounds$n.lng,
          northeastLat = _this$map$getBounds$n.lat,
          _this$map$getBounds$s = _this$map$getBounds.southwest,
          southwestLng = _this$map$getBounds$s.lng,
          southwestLat = _this$map$getBounds$s.lat;

      var _this$map$getCenter = _this.map.getCenter(),
          centerLng = _this$map$getCenter.lng,
          centerLat = _this$map$getCenter.lat;

      onBoundsChanged([].concat((0, _toConsumableArray3.default)((0, _coordtransform.convertGcj02ToWgs84)(northeastLng, northeastLat)), (0, _toConsumableArray3.default)((0, _coordtransform.convertGcj02ToWgs84)(southwestLng, southwestLat))), (0, _coordtransform.convertGcj02ToWgs84)(centerLng, centerLat), _this.map.getZoom());
    };

    _this.state = {
      mapLoaded: false
    };
    return _this;
  }

  (0, _createClass3.default)(Map, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      var _props = this.props,
          useAMapUI = _props.useAMapUI,
          key = _props.key,
          version = _props.version;

      if (typeof window !== 'undefined') {
        new _APILoader2.default({
          key: key,
          useAMapUI: useAMapUI,
          version: version
        }).load().then(function () {
          _this2.createInstance();
          if (!_this2.state.mapLoaded) {
            _this2.setState({
              mapLoaded: true
            });
          }
        });
      }
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var center = nextProps.center,
          zoom = nextProps.zoom;

      var _center = (0, _slicedToArray3.default)(center, 2),
          lng = _center[0],
          lat = _center[1];

      if (this.map) {
        var currentCenter = this.map.getCenter();
        if (center !== currentCenter && zoom !== this.map.getZoom() && lng && lat) {
          this.map.setZoomAndCenter(zoom, (0, _coordtransform.convertWgs84ToGcj02)(lng, lat));
        } else if (lng && lat && center !== currentCenter) {
          this.map.setCenter((0, _coordtransform.convertWgs84ToGcj02)(lng, lat));
        } else if (zoom !== this.map.getZoom()) {
          this.map.setZoom(zoom);
        }
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      if (this.map) {
        this.map.off('click');
        this.map.off('moveend');
        this.map.off('rightclick');
        this.map.destroy();
      }
    }
  }, {
    key: 'createInstance',
    value: function createInstance() {
      if (this.map) return;
      var _props2 = this.props,
          zoom = _props2.zoom,
          center = _props2.center,
          _props2$option = _props2.option,
          mapStyle = _props2$option.mapStyle,
          rest = (0, _objectWithoutProperties3.default)(_props2$option, ['mapStyle']),
          features = _props2.features,
          outerRest = (0, _objectWithoutProperties3.default)(_props2, ['zoom', 'center', 'option', 'features']);

      this.map = new window.AMap.Map(this.mapWrapper, (0, _extends3.default)({
        resizeEnable: true,
        zoom: zoom,
        center: center[0] && (0, _coordtransform.convertWgs84ToGcj02)(center[0], center[1]),
        mapStyle: 'amap://styles/' + (mapStyle || 'normal')
      }, rest, outerRest));
      this.map.on('click', this.handleClick);
      this.map.on('moveend', this.handleBoundsChanged);
      this.map.on('rightclick', this.onRightClick);
      this.map.setFeatures(features);
    }
  }, {
    key: 'renderChildren',
    value: function renderChildren() {
      var _this3 = this;

      var children = this.props.children;

      return _react2.default.Children.map(children, function (child) {
        if (child) {
          var cType = child.type;
          /* 针对下面两种组件不注入地图相关属性
           * 1. 明确声明不需要注入的
           * 2. DOM 元素
           */
          if (cType.preventAmap || typeof cType === 'string') {
            return child;
          }
          return _react2.default.cloneElement(child, {
            map: _this3.map
          });
        }
        return child;
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this4 = this;

      var _props3 = this.props,
          style = _props3.style,
          loading = _props3.loading;
      var mapLoaded = this.state.mapLoaded;

      return _react2.default.createElement(
        'div',
        { style: style || wrapperStyle },
        _react2.default.createElement(
          'div',
          { ref: function ref(div) {
              _this4.mapWrapper = div;
            }, style: containerStyle },
          mapLoaded ? null : loading || null
        ),
        _react2.default.createElement(
          'div',
          null,
          mapLoaded ? this.renderChildren() : null
        )
      );
    }
  }]);
  return Map;
}(_react2.default.PureComponent), _class.propTypes = {
  key: _propTypes2.default.string,
  useAMapUI: _propTypes2.default.bool,
  version: _propTypes2.default.string,
  center: _propTypes2.default.array,
  zoom: _propTypes2.default.number,
  option: _propTypes2.default.object,
  onClick: _propTypes2.default.func,
  onBoundsChanged: _propTypes2.default.func,
  features: _propTypes2.default.arrayOf(_propTypes2.default.oneOf(['bg', 'point', 'road', 'building'])),
  onRightClick: _propTypes2.default.func
}, _class.defaultProps = {
  key: '8af8372cd8cf352d0862abf8f97050e7',
  version: '1.4.6',
  useAMapUI: false,
  center: [],
  zoom: 5,
  option: {},
  onClick: function onClick() {},
  onBoundsChanged: function onBoundsChanged() {},
  onRightClick: function onRightClick() {},

  features: ['bg', 'point', 'road', 'building']
}, _temp);
exports.default = Map;