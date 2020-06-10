'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

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

var _echarts = require('echarts');

var _echarts2 = _interopRequireDefault(_echarts);

require('./bmap/bmap');

var _coordtransform = require('./coordtransform');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var mapOption = {
  animation: true,
  bmap: {
    roam: true,
    mapOptions: {
      enableMapClick: false
    }
  },
  tooltip: {
    show: true,
    trigger: 'item',
    formatter: function formatter(params) {
      return params.name;
    }
  },
  series: []
};

var Map = (_temp = _class = function (_React$Component) {
  (0, _inherits3.default)(Map, _React$Component);

  function Map(props) {
    (0, _classCallCheck3.default)(this, Map);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Map.__proto__ || (0, _getPrototypeOf2.default)(Map)).call(this, props));

    _this.handleBoundsChange = function () {
      _this.changeBounds();
    };

    _this.handleResize = function () {
      if (_this.chart) {
        _this.chart.resize();
      }
    };

    _this.handleMapClick = function (e) {
      _this.props.onClick((0, _extends3.default)({}, e.domEvent.data, {
        point: (0, _coordtransform.convertBd09ToWgs84)(e.point.lng, e.point.lat)
      }));
    };

    _this.setContainer = function (item) {
      _this.container = item;
    };

    _this.state = {
      center: (0, _coordtransform.convertWgs84ToBd09)(props.center[0], props.center[1]),
      zoom: props.zoom
    };
    return _this;
  }

  (0, _createClass3.default)(Map, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.chart = _echarts2.default.init(this.container);
      this.chart.setOption(this.getOption());

      this.map = this.chart.getModel().getComponent('bmap').getBMap();
      this.map.enableAutoResize();

      this.props.mapStyle && this.map.setMapStyle(this.props.mapStyle);

      this.map.addEventListener('resize', this.handleResize);
      this.map.addEventListener('click', this.handleMapClick);
      this.map.addEventListener('zoomend', this.handleBoundsChange);
      this.map.addEventListener('moveend', this.handleBoundsChange);
    }
  }, {
    key: 'changeBounds',
    value: function changeBounds() {
      var mapCenter = this.map.getCenter();
      var bounds = this.map.getBounds();
      var northEast = bounds.getNorthEast();
      var southWest = bounds.getSouthWest();

      this.props.onBoundsChanged([].concat((0, _toConsumableArray3.default)((0, _coordtransform.convertBd09ToWgs84)(northEast.lng, northEast.lat)), (0, _toConsumableArray3.default)((0, _coordtransform.convertBd09ToWgs84)(southWest.lng, southWest.lat))), (0, _coordtransform.convertBd09ToWgs84)(mapCenter.lng, mapCenter.lat), this.map.getZoom());
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (nextProps.center && nextProps.center !== this.props.center) {
        this.setState({ center: (0, _coordtransform.convertWgs84ToBd09)(nextProps.center[0], nextProps.center[1]) });
      }

      if (nextProps.zoom && nextProps.zoom !== this.props.zoom) {
        this.setState({ zoom: nextProps.zoom });
      }
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps) {
      var _this2 = this;

      if (prevProps.center !== this.props.center || prevProps.zoom !== this.props.zoom || prevProps.option !== this.props.option) {
        setTimeout(function () {
          return _this2.setOptions(_this2.getOption());
        }, 0);
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      if (this.map) {
        this.map.removeEventListener('resize', this.handleResize);
        this.map.removeEventListener('click', this.handleMapClick);
        this.map.removeEventListener('zoomend', this.handleBoundsChange);
        this.map.removeEventListener('moveend', this.handleBoundsChange);
        this.map = null;
      }

      if (this.chart) {
        this.chart.dispose();
        this.chart = null;
      }
    }
  }, {
    key: 'setOptions',
    value: function setOptions(options) {
      if (this.chart) {
        this.chart.setOption(options, false, true);
      }
    }
  }, {
    key: 'getOption',
    value: function getOption() {
      var bmap = (0, _extends3.default)({}, mapOption.bmap, this.props.option.bmap);
      if (this.state.center) {
        bmap.center = this.state.center;
      }
      if (this.state.zoom) {
        bmap.zoom = this.state.zoom;
      }
      return (0, _extends3.default)({}, mapOption, {
        bmap: bmap
      });
    }
  }, {
    key: 'renderChildren',
    value: function renderChildren() {
      var _this3 = this;

      var children = this.props.children;

      if (!children) {
        return;
      }

      return _react2.default.Children.map(children, function (child) {
        if (child) {
          return _react2.default.cloneElement(child, {
            map: _this3,
            id: child.key || child.name,
            name: child.props.name || child.key
          });
        }
      });
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { style: this.props.style, className: this.props.className },
        _react2.default.createElement('div', { ref: this.setContainer, style: { height: '100%' } }),
        this.renderChildren()
      );
    }
  }]);
  return Map;
}(_react2.default.Component), _class.propTypes = {
  center: _propTypes2.default.array,
  zoom: _propTypes2.default.number,
  option: _propTypes2.default.object,
  onClick: _propTypes2.default.func,
  onBoundsChanged: _propTypes2.default.func
}, _class.defaultProps = {
  center: [104.114129, 37.550339],
  zoom: 5,
  option: {},
  onClick: function onClick() {},
  onBoundsChanged: function onBoundsChanged() {}
}, _temp);
exports.default = Map;