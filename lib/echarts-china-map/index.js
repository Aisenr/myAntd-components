'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

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

var _class, _temp2;

exports.hasDrillDownMap = hasDrillDownMap;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _echarts = require('echarts');

var _echarts2 = _interopRequireDefault(_echarts);

var _isomorphicFetch = require('isomorphic-fetch');

var _isomorphicFetch2 = _interopRequireDefault(_isomorphicFetch);

var _echarts3 = require('../echarts');

var _echarts4 = _interopRequireDefault(_echarts3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * 判断当前地图是否还能够向下钻取
 * @param mapType 地图类型
 * @returns {boolean} 可向下钻取时返回true
 */
function hasDrillDownMap(mapType, drillDownToLast) {
  var names = mapType.split('-');
  var delta = drillDownToLast ? 1 : 0;
  return names.length < 3 + delta && ['北京', '天津', '上海', '重庆', '香港', '澳门', '台湾'].indexOf(names[names.length - 1 - delta]) < 0;
}

/**
 * 可向下钻取的中国地图，地图命名规则为“国-省-市”
 */
var EchartsChinaMap = (_temp2 = _class = function (_PureComponent) {
  (0, _inherits3.default)(EchartsChinaMap, _PureComponent);

  function EchartsChinaMap() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, EchartsChinaMap);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = EchartsChinaMap.__proto__ || (0, _getPrototypeOf2.default)(EchartsChinaMap)).call.apply(_ref, [this].concat(args))), _this), _this.onClickMap = function (params) {
      var mapType = _this.props.mapType;

      var nextMapType = mapType + '-' + params.name;
      if (mapType && hasDrillDownMap(mapType, true) && _this.props.onMapTypeChange) {
        _this.props.onMapTypeChange(nextMapType, _this.getAreaId(_echarts2.default.getMap(mapType), params.name), hasDrillDownMap(nextMapType, true));
      }
    }, _this.fetchMap = function (mapTypes) {
      return _promise2.default.all(mapTypes.map(function (mapType) {
        var map = _echarts2.default.getMap(mapType);
        if (map) {
          return _promise2.default.resolve(map);
        }

        var index = mapType.lastIndexOf('-');
        var upperMapName = mapType.slice(0, index);
        if (!hasDrillDownMap(upperMapName) && hasDrillDownMap(upperMapName, true)) {
          return _this.fetchMap([upperMapName]).then(function (_ref2) {
            var _ref3 = (0, _slicedToArray3.default)(_ref2, 1),
                upperMap = _ref3[0];

            if (!upperMap) {
              return _promise2.default.reject();
            }

            var name = mapType.slice(index + 1);
            var feature = (upperMap.UTF8Encoding ? upperMap : upperMap.geoJson).features.find(function (f) {
              return f.properties.name === name;
            });
            if (!feature) {
              return _promise2.default.reject();
            }

            var data = {
              UTF8Encoding: !!upperMap.UTF8Encoding,
              type: 'FeatureCollection',
              features: [feature]
            };
            return _promise2.default.resolve(data);
          });
        }

        return _this.props.fetchMap(mapType);
      }));
    }, _this.events = { click: _this.onClickMap }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  /**
   * 点击地图上的行政区域时，如果该行政区域能够下钻，则调用this.props.onMapTypeChange(mapType),
   * 在this.props.onMapTypeChange中可以根据mapType重新设置echart的option
   * @param params
   */


  (0, _createClass3.default)(EchartsChinaMap, [{
    key: 'getAreaId',
    value: function getAreaId(map, mapType) {
      var feature = map.geoJson.features.find(function (f) {
        return f.properties.name === mapType;
      });
      return feature.id.replace(/(00)+$/, '');
    }

    /**
     * 获取地图数据
     * @param mapTypes 要获取地图数据的地图类型数组
     * @returns {Promise.<*>}
     */

  }, {
    key: 'getOption',
    value: function getOption() {
      var option = this.props.option;

      return (0, _extends3.default)({}, option, {
        tooltip: (0, _extends3.default)({
          trigger: 'item'
        }, option.tooltip),
        dataRange: (0, _extends3.default)({
          x: 'left',
          y: 'bottom',
          text: ['高', '低'],
          calculable: true
        }, option.tooltip, {
          min: this.props.min,
          max: this.props.max
        }),
        geo: (0, _extends3.default)({}, option.geo, {
          map: this.props.mapType
        }),
        series: option.series || [{
          name: 'map',
          type: 'map',
          geoIndex: 0,
          data: []
        }]
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          mapType = _props.mapType,
          min = _props.min,
          max = _props.max,
          onMapTypeChange = _props.onMapTypeChange,
          fetchMap = _props.fetchMap,
          data = _props.data,
          rest = (0, _objectWithoutProperties3.default)(_props, ['mapType', 'min', 'max', 'onMapTypeChange', 'fetchMap', 'data']);

      var re = data && data.length > 0 ? { map: this.props.data } : undefined;
      return _react2.default.createElement(_echarts4.default, (0, _extends3.default)({}, rest, { events: this.events, option: this.getOption(), data: re, fetchMap: this.fetchMap }));
    }
  }]);
  return EchartsChinaMap;
}(_react.PureComponent), _class.propTypes = (0, _extends3.default)({}, _echarts4.default.propTypes, {
  mapType: _propTypes2.default.string,
  data: _propTypes2.default.arrayOf(_propTypes2.default.shape({
    name: _propTypes2.default.string,
    value: _propTypes2.default.number
  })),
  min: _propTypes2.default.number,
  max: _propTypes2.default.number,
  option: _propTypes2.default.shape({
    tooltip: _propTypes2.default.object,
    dataRange: _propTypes2.default.object
  }),
  onMapTypeChange: _propTypes2.default.func,
  fetchMap: _propTypes2.default.func
}), _class.defaultProps = {
  mapType: '中国',
  data: [],
  min: 0,
  max: 100,
  option: {},
  fetchMap: function fetchMap(mapType) {
    return (0, _isomorphicFetch2.default)('/map/china/' + mapType + '.json').then(function (res) {
      return res.json();
    });
  } }, _temp2);
exports.default = EchartsChinaMap;