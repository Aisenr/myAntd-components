'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Echarts = (_temp = _class = function (_PureComponent) {
  (0, _inherits3.default)(Echarts, _PureComponent);

  function Echarts(props) {
    (0, _classCallCheck3.default)(this, Echarts);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Echarts.__proto__ || (0, _getPrototypeOf2.default)(Echarts)).call(this, props));

    _this.onresize = function () {
      try {
        _this.chart.resize();
      } catch (e) {
        console.log(e);
      }
    };

    _this.setContainer = function (item) {
      _this.container = item;
    };

    _this.events = {};
    return _this;
  }

  (0, _createClass3.default)(Echarts, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.chart = _echarts2.default.init(this.container, Echarts.defaultTheme || this.props.theme);
      this.setOptions();

      window && window.addEventListener('resize', this.onresize);
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      this.setOptions();
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      if (this.chart) {
        this.chart.dispose();
        this.chart = null;
      }

      window && window.removeEventListener('resize', this.onresize);
    }
  }, {
    key: 'getSeries',
    value: function getSeries() {
      var _this2 = this;

      var series = this.props.option.series;

      return (series instanceof Array ? series : [series]).map(function (s) {
        var data = _this2.props.data[s.name];
        if (s.map || s.geoIndex !== undefined) {
          var mapType = _this2.getSeriesMapType(s, _this2.props.option);
          return (0, _extends3.default)({}, s, {
            data: _this2.getMapSeriesData(mapType, data)
          });
        } else {
          return (0, _extends3.default)({}, s, {
            data: data
          });
        }
      });
    }
  }, {
    key: 'getMapSeriesData',
    value: function getMapSeriesData(mapType, data) {
      var map = _echarts2.default.getMap(mapType);
      return data.map(function (item) {
        var feature = map.geoJson.features.find(function (f) {
          return f.id.replace(/(00)+$/, '') === item.name;
        });
        if (feature) {
          return (0, _extends3.default)({}, item, {
            name: feature.properties.name
          });
        } else {
          return item;
        }
      });
    }
  }, {
    key: 'getOption',
    value: function getOption() {
      var _props = this.props,
          option = _props.option,
          data = _props.data;

      if (!option || !data) {
        return option;
      }

      return (0, _extends3.default)({}, option, {
        series: this.getSeries()
      });
    }
  }, {
    key: 'setOptions',
    value: function setOptions() {
      if (!this.checkMapRegister()) {
        return;
      }

      var option = this.getOption();
      if (option) {
        var _props2 = this.props,
            notMerge = _props2.notMerge,
            lazyUpdate = _props2.lazyUpdate;

        this.chart.setOption(option, notMerge, lazyUpdate);
      }

      this.registerEvents();

      this.props.loading ? this.chart.showLoading() : this.chart.hideLoading();
    }

    /**
     * 取得在option中未注册的地图
     * @returns {Array} 尚未注册的地图类型
     */

  }, {
    key: 'getUnRegistedMap',
    value: function getUnRegistedMap() {
      var unRegistedMaps = [];

      var _props$option = this.props.option,
          geo = _props$option.geo,
          series = _props$option.series;

      if (geo && geo.map && !_echarts2.default.getMap(geo.map)) {
        unRegistedMaps.push(geo.map);
      }

      if (series) {
        (series instanceof Array ? series : [series]).forEach(function (s) {
          if (s.map && !_echarts2.default.getMap(s.map)) {
            unRegistedMaps.push(s.map);
          }
        });
      }

      return unRegistedMaps;
    }
  }, {
    key: 'getSeriesMapType',
    value: function getSeriesMapType(series, option) {
      if (series.map) {
        return series.map;
      }

      if (series.geoIndex !== undefined) {
        return option.geo.map;
      }
    }

    /**
     * 注册echart事件
     */

  }, {
    key: 'registerEvents',
    value: function registerEvents() {
      for (var name in this.events) {
        if (typeof this.events[name] === 'function') {
          this.chart.off(name, this.events[name]);
        }
      }

      var events = this.props.events;

      for (var _name in events) {
        if (typeof events[_name] === 'function') {
          this.chart.on(_name, events[_name]);
        }
      }

      this.events = events;
    }

    /**
     * 检查option中的地图是否都已注册.
     * 有未注册的地图时，调用this.props.fetchMap加载地图
     * @returns {boolean} 若地图都已注册，返回true, 否则返回false
     */

  }, {
    key: 'checkMapRegister',
    value: function checkMapRegister() {
      var _this3 = this;

      var unRegistedMaps = this.getUnRegistedMap();
      if (unRegistedMaps.length > 0 && this.props.fetchMap) {
        this.props.fetchMap(unRegistedMaps).then(function (maps) {
          maps.forEach(function (map, index) {
            var mapType = unRegistedMaps[index];
            if (!_echarts2.default.getMap(mapType)) {
              _echarts2.default.registerMap(mapType, map);
            }
          });
          _this3.setOptions();
        });
        return false;
      }

      return true;
    }
  }, {
    key: 'render',
    value: function render() {
      var _props3 = this.props,
          theme = _props3.theme,
          option = _props3.option,
          data = _props3.data,
          notMerge = _props3.notMerge,
          lazyUpdate = _props3.lazyUpdate,
          events = _props3.events,
          fetchMap = _props3.fetchMap,
          loading = _props3.loading,
          rest = (0, _objectWithoutProperties3.default)(_props3, ['theme', 'option', 'data', 'notMerge', 'lazyUpdate', 'events', 'fetchMap', 'loading']);

      return _react2.default.createElement('div', (0, _extends3.default)({ ref: this.setContainer }, rest));
    }
  }]);
  return Echarts;
}(_react.PureComponent), _class.defaultProps = {
  option: {},
  events: {},
  loading: false
}, _class.propTypes = {
  theme: _propTypes2.default.string,
  option: _propTypes2.default.object,
  data: _propTypes2.default.object,
  notMerge: _propTypes2.default.bool,
  lazyUpdate: _propTypes2.default.bool,
  events: _propTypes2.default.object,
  fetchMap: _propTypes2.default.func,
  loading: _propTypes2.default.bool
}, _temp);
exports.default = Echarts;