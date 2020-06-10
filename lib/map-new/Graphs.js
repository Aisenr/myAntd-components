'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

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

var _coordtransform = require('./utils/coordtransform');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Graphs = (_temp = _class = function (_React$PureComponent) {
  (0, _inherits3.default)(Graphs, _React$PureComponent);

  function Graphs(props) {
    (0, _classCallCheck3.default)(this, Graphs);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Graphs.__proto__ || (0, _getPrototypeOf2.default)(Graphs)).call(this, props));

    _this.graphs = [];

    _this.initPolyline = function (data, option, item) {
      _this.polyline = new AMap.Polyline({
        path: data, // 设置线覆盖物路径
        strokeColor: option.borderColor, // 线颜色
        strokeStyle: option.borderType,
        strokeWeight: option.borderWidth, // 线宽
        strokeDasharray: [10, 5], // 补充线样式
        fillOpacity: option.opacity, // 填充颜色透明度
        zIndex: option.zIndex,
        bubble: true,
        cursor: 'pointer'
      });
      _this.polyline.on('click', function () {
        _this.handleClick('折线', item);
      });
      _this.polyline.setMap(_this.map);
      _this.graphs.push(_this.polyline);
    };

    _this.initPolygon = function (data, option, item) {
      _this.polygon = new AMap.Polygon({
        path: data, // 设置多边形边界路径
        strokeColor: option.borderColor, // 线颜色
        strokeStyle: option.borderType,
        strokeWeight: option.borderWidth, // 线宽
        fillColor: option.color, // 填充色
        fillOpacity: option.opacity, // 填充颜色透明度
        zIndex: option.zIndex,
        bubble: true,
        cursor: 'pointer'
      });

      _this.polygon.on('click', function () {
        _this.handleClick('多边形', item);
      });
      _this.polygon.setMap(_this.map);
      _this.graphs.push(_this.polygon);
    };

    _this.initCircle = function (data, option, item) {
      var cx = data.cx,
          cy = data.cy,
          r = data.r;

      _this.circle = new AMap.Circle({
        center: new AMap.LngLat(cx, cy), // 圆心位置
        radius: r, // 半径
        strokeColor: option.borderColor, // 线颜色
        strokeStyle: option.borderType,
        strokeWeight: option.borderWidth, // 线粗细度
        fillColor: option.color, // 填充颜色
        fillOpacity: option.opacity, // 填充颜色透明度
        zIndex: option.zIndex,
        bubble: true,
        cursor: 'pointer'
      });
      _this.circle.on('click', function () {
        _this.handleClick('圆形', item);
      });
      _this.circle.setMap(_this.map);
      _this.graphs.push(_this.circle);
    };

    _this.initRectangle = function (data, option, item) {
      var _data = (0, _slicedToArray3.default)(data, 2),
          _data$ = (0, _slicedToArray3.default)(_data[0], 2),
          southWestLng01 = _data$[0],
          southWestLat02 = _data$[1],
          _data$2 = (0, _slicedToArray3.default)(_data[1], 2),
          northEastLng01 = _data$2[0],
          northEastLat02 = _data$2[1];

      var southWest = new AMap.LngLat(southWestLng01, southWestLat02);
      var northEast = new AMap.LngLat(northEastLng01, northEastLat02);
      var bounds = new AMap.Bounds(southWest, northEast);
      _this.rectangle = new AMap.Rectangle({
        map: _this.map,
        bounds: bounds,
        strokeColor: option.borderColor,
        strokeWeight: option.borderWidth,
        strokeDasharray: [10, 10],
        strokeStyle: option.borderType,
        fillColor: option.color,
        fillOpacity: option.opacity, // 填充颜色透明度
        zIndex: option.zIndex,
        bubble: true,
        cursor: 'pointer'
      });
      _this.rectangle.on('click', function () {
        _this.handleClick('矩形', item);
      });
      _this.graphs.push(_this.rectangle);
    };

    _this.handleClick = function (type, data) {
      _this.props.onClick({
        type: type,
        data: data
      });
    };

    _this.handleOff = function () {};

    if (typeof window !== 'undefined') {
      if (!props.map) {
        console.warn('没有地图实例；组件必须作为 Map 的子组件使用');
      } else {
        _this.map = props.map;
        _this.element = _this.map.getContainer();
        _this.createGraphs(props);
      }
    }
    return _this;
  }

  (0, _createClass3.default)(Graphs, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (nextProps.data && nextProps.data !== this.props.data) {
        this.createGraphs(nextProps);
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      if (this.circle) {
        this.circle.off('click', this.handleOff());
        this.map.remove(this.circle);
      }
      if (this.polyline) {
        this.polyline.off('click', this.handleOff());
        this.map.remove(this.polyline);
      }
      if (this.polygon) {
        this.polygon.off('click', this.handleOff());
        this.map.remove(this.polygon);
      }
      if (this.rectangle) {
        this.rectangle.off('click', this.handleOff());
        this.map.remove(this.rectangle);
      }
    }
  }, {
    key: 'createGraphs',
    value: function createGraphs(props) {
      var _this2 = this;

      if (this.graphs.length > 0) {
        this.map.remove(this.graphs);
        this.graphs = [];
      }
      var data = props.data,
          itemStyle = props.itemStyle;

      var newData = data instanceof Array ? data : [data];
      newData.forEach(function (item) {
        var newItem = _this2.convertCoord(item);
        var type = newItem.type,
            shape = newItem.shape,
            points = newItem.shape.points,
            childStyle = newItem.itemStyle;

        var newChildStyle = childStyle || {};
        var currentStyle = (0, _extends3.default)({}, itemStyle, newChildStyle);
        switch (type) {
          case 'circle':
            _this2.initCircle(shape, currentStyle, item);
            break;
          case 'rectangle':
            _this2.initRectangle(points, currentStyle, item);
            break;
          case 'polyline':
            _this2.initPolyline(points, currentStyle, item);
            break;
          case 'polygon':
            _this2.initPolygon(points, currentStyle, item);
            break;
          default:
            break;
        }
      });
    }
  }, {
    key: 'convertCoord',
    value: function convertCoord(data) {
      var type = data.type,
          shape = data.shape;

      if (type === 'circle') {
        var _convertWgs84ToGcj = (0, _coordtransform.convertWgs84ToGcj02)(shape.cx, shape.cy),
            _convertWgs84ToGcj2 = (0, _slicedToArray3.default)(_convertWgs84ToGcj, 2),
            cx = _convertWgs84ToGcj2[0],
            cy = _convertWgs84ToGcj2[1];

        return (0, _extends3.default)({}, data, { shape: { cx: cx, cy: cy, r: shape.r } });
      } else {
        return (0, _extends3.default)({}, data, {
          shape: { points: shape.points.map(function (p) {
              return (0, _coordtransform.convertWgs84ToGcj02)(p[0], p[1]);
            }) }
        });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      return null;
    }
  }]);
  return Graphs;
}(_react2.default.PureComponent), _class.propTypes = {
  name: _propTypes2.default.string,
  data: _propTypes2.default.oneOf([_propTypes2.default.shape({
    name: _propTypes2.default.string,
    type: _propTypes2.default.oneOf(['circle', 'rectangle', 'polyline', 'polygon']).isRequired,
    shape: _propTypes2.default.shape({
      cx: _propTypes2.default.number,
      cy: _propTypes2.default.number,
      r: _propTypes2.default.number,
      points: _propTypes2.default.arrayOf(_propTypes2.default.arrayOf(_propTypes2.default.number))
    }).isRequired,
    itemStyle: _propTypes2.default.shape({
      color: _propTypes2.default.string,
      borderColor: _propTypes2.default.string,
      borderWidth: _propTypes2.default.number,
      borderType: _propTypes2.default.oneOf(['solid', 'dashed', 'dotted']),
      opacity: _propTypes2.default.number
    })
  }), _propTypes2.default.arrayOf(_propTypes2.default.shape({
    name: _propTypes2.default.string,
    type: _propTypes2.default.oneOf(['circle', 'rectangle', 'polyline', 'polygon']).isRequired,
    shape: _propTypes2.default.shape({
      cx: _propTypes2.default.number,
      cy: _propTypes2.default.number,
      r: _propTypes2.default.number,
      points: _propTypes2.default.arrayOf(_propTypes2.default.arrayOf(_propTypes2.default.number))
    }).isRequired,
    itemStyle: _propTypes2.default.shape({
      color: _propTypes2.default.string,
      borderColor: _propTypes2.default.string,
      borderWidth: _propTypes2.default.number,
      borderType: _propTypes2.default.oneOf(['solid', 'dashed', 'dotted']),
      opacity: _propTypes2.default.number
    })
  }))]),

  itemStyle: _propTypes2.default.shape({
    color: _propTypes2.default.string,
    borderColor: _propTypes2.default.string,
    borderWidth: _propTypes2.default.number,
    borderType: _propTypes2.default.oneOf(['solid', 'dashed', 'dotted']),
    opacity: _propTypes2.default.number,
    zIndex: _propTypes2.default.number
  }),
  onClick: _propTypes2.default.func
}, _class.defaultProps = {
  data: [],
  itemStyle: {
    borderColor: '#9c9bf5',
    borderWidth: 1,
    borderType: 'solid',
    color: '#00ff00',
    opacity: 0,
    zIndex: 10
  },
  onClick: function onClick() {}
}, _temp);
exports.default = Graphs;