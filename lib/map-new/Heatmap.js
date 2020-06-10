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

var Heapmap = (_temp = _class = function (_React$PureComponent) {
  (0, _inherits3.default)(Heapmap, _React$PureComponent);

  function Heapmap(props) {
    (0, _classCallCheck3.default)(this, Heapmap);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Heapmap.__proto__ || (0, _getPrototypeOf2.default)(Heapmap)).call(this, props));

    if (typeof window !== 'undefined') {
      if (!props.map) {
        console.warn('没有地图实例；组件必须作为 Map 的子组件使用');
      } else {
        _this.map = props.map;
        _this.element = _this.map.getContainer();
        _this.createHeapmap(props);
      }
    }
    return _this;
  }

  (0, _createClass3.default)(Heapmap, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var max = nextProps.max,
          data = nextProps.data;

      if (data && data !== this.props.data && this.heatmap) {
        var newData = this.convertCoord(data);
        this.heatmap.setDataSet({
          data: newData,
          max: max
        });
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      if (this.map && this.heatmap && this.element.childNodes.length > 0) {
        this.map.remove(this.heatmap);
      }
    }
  }, {
    key: 'createHeapmap',
    value: function createHeapmap(props) {
      var _this2 = this;

      var max = props.max,
          data = props.data,
          clusterGridSize = props.clusterGridSize,
          clusterMaxZoom = props.clusterMaxZoom;

      var newData = this.convertCoord(data);
      // if (this.heatmap) this.map.remove(this.heatmap);
      this.map.plugin(['AMap.Heatmap'], function () {
        // 初始化heatmap对象
        _this2.heatmap = new AMap.Heatmap(_this2.map, {
          radius: clusterGridSize, // 给定半径
          opacity: [0, 0.8],
          gradient: {
            0.5: 'blue',
            0.65: 'rgb(117,211,248)',
            0.7: 'rgb(0, 255, 0)',
            0.9: '#ffea00',
            1.0: 'red'
          },
          zooms: [3, clusterMaxZoom]
        });
        // 设置数据集：该数据为北京部分“公园”数据
        _this2.heatmap.setDataSet({
          data: newData,
          max: max
        });
      });
    }
  }, {
    key: 'convertCoord',
    value: function convertCoord(data) {
      return data.map(function (item) {
        if (item instanceof Array) {
          var _convertWgs84ToGcj = (0, _coordtransform.convertWgs84ToGcj02)(item[0], item[1]),
              _convertWgs84ToGcj2 = (0, _slicedToArray3.default)(_convertWgs84ToGcj, 2),
              _lng = _convertWgs84ToGcj2[0],
              _lat = _convertWgs84ToGcj2[1];

          return {
            count: item[2] || 1,
            lng: _lng,
            lat: _lat
          };
        }
        var value = item.value;
        if (value instanceof Array) {
          var _convertWgs84ToGcj3 = (0, _coordtransform.convertWgs84ToGcj02)(item.value[0], item.value[1]),
              _convertWgs84ToGcj4 = (0, _slicedToArray3.default)(_convertWgs84ToGcj3, 2),
              _lng2 = _convertWgs84ToGcj4[0],
              _lat2 = _convertWgs84ToGcj4[1];

          return {
            count: item[2] || 1,
            lng: _lng2,
            lat: _lat2
          };
        }

        var _convertWgs84ToGcj5 = (0, _coordtransform.convertWgs84ToGcj02)(item.lng, item.lat),
            _convertWgs84ToGcj6 = (0, _slicedToArray3.default)(_convertWgs84ToGcj5, 2),
            lng = _convertWgs84ToGcj6[0],
            lat = _convertWgs84ToGcj6[1];

        return (0, _extends3.default)({}, item, {
          lng: lng,
          lat: lat
        });
      });
    }
  }, {
    key: 'render',
    value: function render() {
      return null;
    }
  }]);
  return Heapmap;
}(_react2.default.PureComponent), _class.propTypes = {
  name: _propTypes2.default.string,
  max: _propTypes2.default.number,
  data: _propTypes2.default.arrayOf(_propTypes2.default.oneOfType([_propTypes2.default.arrayOf(_propTypes2.default.number), _propTypes2.default.shape({
    name: _propTypes2.default.string,
    value: _propTypes2.default.arrayOf(_propTypes2.default.number)
  })])),
  clusterGridSize: _propTypes2.default.number, // 聚合计算时网格的像素大小
  clusterMaxZoom: _propTypes2.default.number // 最大的聚合级别，大于该级别就不进行相应的聚合
}, _class.defaultProps = {
  max: 200,
  data: [],
  clusterGridSize: 25,
  clusterMaxZoom: 18
}, _temp);
exports.default = Heapmap;