'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _toArray2 = require('babel-runtime/helpers/toArray');

var _toArray3 = _interopRequireDefault(_toArray2);

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

var _coordtransform = require('./coordtransform');

var _cluster = require('./cluster');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var visualMap = {
  show: false,
  top: 'top',
  calculable: true,
  inRange: {
    color: ['blue', 'blue', 'green', 'yellow', 'red']
  }
};

var Heapmap = (_temp = _class = function (_React$PureComponent) {
  (0, _inherits3.default)(Heapmap, _React$PureComponent);

  function Heapmap(props) {
    (0, _classCallCheck3.default)(this, Heapmap);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Heapmap.__proto__ || (0, _getPrototypeOf2.default)(Heapmap)).call(this, props));

    _this.handleBoundsChange = function () {
      _this.changeBounds();
    };

    _this.series = {
      id: 'heat' + Math.floor(Math.random() * 10000000000),
      name: 'heat',
      type: 'heatmap',
      coordinateSystem: 'bmap',
      pointSize: 5,
      blurSize: 6
    };

    _this.state = {
      data: _this.convertCoord(props.data)
    };
    return _this;
  }

  (0, _createClass3.default)(Heapmap, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      setTimeout(function () {
        _this2.map = _this2.props.map.map;
        _this2.handleBoundsChange();
        _this2.map.addEventListener('zoomend', _this2.handleBoundsChange);
        _this2.map.addEventListener('moveend', _this2.handleBoundsChange);
      }, 0);
    }
  }, {
    key: 'changeBounds',
    value: function changeBounds() {
      var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.state.data;

      var mapBounds = this.map.getBounds();
      var extendedBounds = (0, _cluster.getExtendedBounds)(this.map, mapBounds, this.map.width, this.map.height);
      this.setState({
        inBoundsData: this.getInBoundsData(data, extendedBounds)
      });
    }
  }, {
    key: 'getInBoundsData',
    value: function getInBoundsData(data, bounds) {
      var inBoundsData = data.filter(function (item) {
        return bounds.containsPoint(item.$baiduPoint);
      });
      if (this.map.getZoom() < this.props.clusterMaxZoom) {
        return (0, _cluster.cluster)(this.map, inBoundsData, this.props.clusterGridSize);
      } else {
        return inBoundsData;
      }
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (nextProps.data && nextProps.data !== this.props.data) {
        var data = this.convertCoord(nextProps.data);
        this.setState({ data: data });
        this.changeBounds(data);
      }
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      this.setOptions();
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      if (this.props.map) {
        this.props.map.setOptions({
          series: [(0, _extends3.default)({}, this.series, { id: this.getSeriesId(), data: [] })]
        });
      }

      if (this.map) {
        this.map.removeEventListener('zoomend', this.handleBoundsChange);
        this.map.removeEventListener('moveend', this.handleBoundsChange);
        this.map = null;
      }
    }
  }, {
    key: 'setOptions',
    value: function setOptions() {
      var _this3 = this;

      var _props = this.props,
          min = _props.min,
          max = _props.max;

      var chartSeries = this.props.map.chart.getOption().series;
      var index = chartSeries.findIndex(function (series) {
        return series.id === _this3.getSeriesId();
      });
      this.props.map.setOptions({
        visualMap: (0, _extends3.default)({}, visualMap, { min: min, max: max, seriesIndex: [index < 0 ? chartSeries.length : index] }),
        series: [(0, _extends3.default)({}, this.series, {
          id: this.getSeriesId(),
          name: this.props.name || this.series.name,
          data: this.state.inBoundsData
        })]
      });
    }
  }, {
    key: 'getSeriesId',
    value: function getSeriesId() {
      return this.props.id || this.series.id;
    }
  }, {
    key: 'convertCoord',
    value: function convertCoord() {
      var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

      return data.map(function (item) {
        var _ref = item instanceof Array ? item : item.value,
            _ref2 = (0, _toArray3.default)(_ref),
            lng = _ref2[0],
            lat = _ref2[1],
            rest = _ref2.slice(2);

        var value = [].concat((0, _toConsumableArray3.default)((0, _coordtransform.convertWgs84ToBd09)(lng, lat)), (0, _toConsumableArray3.default)(rest));
        var newItem = item instanceof Array ? value : (0, _extends3.default)({}, item, { value: value });
        newItem.$baiduPoint = new BMap.Point(value[0], value[1]);
        return newItem;
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
  min: _propTypes2.default.number,
  max: _propTypes2.default.number,
  data: _propTypes2.default.arrayOf(_propTypes2.default.oneOfType([_propTypes2.default.arrayOf(_propTypes2.default.number), _propTypes2.default.shape({
    name: _propTypes2.default.string,
    value: _propTypes2.default.arrayOf(_propTypes2.default.number)
  })])),
  clusterGridSize: _propTypes2.default.number, // 聚合计算时网格的像素大小
  clusterMaxZoom: _propTypes2.default.number // 最大的聚合级别，大于该级别就不进行相应的聚合
}, _class.defaultProps = {
  min: 0,
  max: 200,
  data: [],
  clusterGridSize: 1,
  clusterMaxZoom: 0
}, _temp);
exports.default = Heapmap;