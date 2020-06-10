'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

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

var _parseCode = require('../parse-code');

var _parseCode2 = _interopRequireDefault(_parseCode);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Boundary = (_temp = _class = function (_React$PureComponent) {
  (0, _inherits3.default)(Boundary, _React$PureComponent);

  function Boundary(props) {
    (0, _classCallCheck3.default)(this, Boundary);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Boundary.__proto__ || (0, _getPrototypeOf2.default)(Boundary)).call(this, props));

    if (typeof window !== 'undefined') {
      if (!props.map) {
        console.warn('没有地图实例；组件必须作为 Map 的子组件使用');
      } else {
        _this.map = props.map;
        _this.createBoundary(props);
      }
    }
    return _this;
  }

  (0, _createClass3.default)(Boundary, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var areaCode = this.props.areaCode;

      if (areaCode !== nextProps.areaCode) this.createBoundary(nextProps);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      if (this.polygon) {
        this.map.remove([this.polygon]);
      }
      if (this.polygonCover) {
        this.map.remove([this.polygonCover]);
      }
    }
  }, {
    key: 'createBoundary',
    value: function createBoundary(props) {
      var areaCode = props.areaCode;

      var option = {
        subdistrict: 0,
        showbiz: false,
        extensions: 'all'
      };
      var newAreaCode = areaCode.toString();
      if (newAreaCode === '' || newAreaCode == null) {
        option.level = 'country';
        this.initBoundary('中国', option, props);
      } else if (newAreaCode.length >= 6) {
        option.level = 'district';
        this.initBoundary(newAreaCode, option, props);
      } else {
        option.level = newAreaCode.length === 2 ? 'province' : 'city';
        var obj = _parseCode2.default.getObj(newAreaCode);
        this.initBoundary(obj.label, option, props);
      }
    }
  }, {
    key: 'initBoundary',
    value: function initBoundary(searchParam, option, props) {
      var _this2 = this;

      var _props$itemStyle = props.itemStyle,
          color = _props$itemStyle.color,
          borderColor = _props$itemStyle.borderColor,
          borderWidth = _props$itemStyle.borderWidth,
          borderType = _props$itemStyle.borderType,
          useCover = props.useCover,
          fitView = props.fitView;

      AMap.service('AMap.DistrictSearch', function () {
        var district = new AMap.DistrictSearch(option);
        district.search(searchParam, function (status, result) {
          var bounds = result.districtList[0].boundaries;

          if (_this2.polygon) {
            _this2.map.remove([_this2.polygon]);
          }
          if (_this2.polygonCover) {
            _this2.map.remove([_this2.polygonCover]);
          }
          if (bounds) {
            _this2.polygon = new AMap.Polygon({
              map: _this2.map,
              strokeWeight: borderWidth,
              strokeStyle: borderType,
              path: useCover ? [[[-180, 90], [-180, -90], [180, -90], [180, 90]]].concat((0, _toConsumableArray3.default)(bounds)) : bounds,
              fillColor: color,
              strokeColor: borderColor,
              bubble: true
            });
            if (useCover) {
              _this2.polygonCover = new AMap.Polygon({
                bubble: true,
                path: bounds
              });
              fitView && _this2.map.setFitView([_this2.polygonCover]);
            } else {
              fitView && _this2.map.setFitView([_this2.polygon]);
            }
          }
        });
      });
    }
  }, {
    key: 'render',
    value: function render() {
      return null;
    }
  }]);
  return Boundary;
}(_react2.default.PureComponent), _class.propTypes = {
  areaCode: _propTypes2.default.string.isRequired,
  itemStyle: _propTypes2.default.shape({
    color: _propTypes2.default.string,
    borderColor: _propTypes2.default.string,
    borderWidth: _propTypes2.default.number,
    borderType: _propTypes2.default.oneOf(['solid', 'dashed'])
  }),
  useCover: _propTypes2.default.bool,
  fitView: _propTypes2.default.bool
}, _class.defaultProps = {
  areaCode: '',
  itemStyle: {
    color: 'rgba(255, 255, 255, 0)',
    borderColor: '#CC66CC',
    borderWidth: 1,
    borderType: 'solid'
  },
  useCover: false,
  fitView: true
}, _temp);
exports.default = Boundary;