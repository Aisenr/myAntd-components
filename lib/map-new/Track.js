'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _message2 = require('antd/lib/message');

var _message3 = _interopRequireDefault(_message2);

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

require('antd/lib/message/style');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Track = (_temp = _class = function (_React$PureComponent) {
  (0, _inherits3.default)(Track, _React$PureComponent);

  function Track(props) {
    (0, _classCallCheck3.default)(this, Track);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Track.__proto__ || (0, _getPrototypeOf2.default)(Track)).call(this, props));

    if (typeof window !== 'undefined') {
      if (!props.map) {
        console.warn('没有地图实例；组件必须作为 Map 的子组件使用');
      } else {
        _this.map = props.map;
        _this.createTrack(props);
      }
    }
    return _this;
  }

  (0, _createClass3.default)(Track, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var areaCode = this.props.areaCode;

      if (areaCode !== nextProps.areaCode) this.createTrack(nextProps);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {}
  }, {
    key: 'createTrack',
    value: function createTrack() {
      var _this2 = this;

      AMapUI.load(['ui/misc/PathSimplifier'], function (PathSimplifier) {
        if (!PathSimplifier.supportCanvas) {
          _message3.default.error('当前环境不支持 Canvas！');
          return;
        }
        // 启动页面
        _this2.initTrack(PathSimplifier);
      });
    }
  }, {
    key: 'initTrack',
    value: function initTrack(PathSimplifier) {
      var _props = this.props,
          data = _props.data,
          pathNavigator = _props.pathNavigator,
          rest = (0, _objectWithoutProperties3.default)(_props, ['data', 'pathNavigator']);

      var pathSimplifierIns = new PathSimplifier((0, _extends3.default)({
        map: this.map }, rest));

      var newData = [];
      var pathNavigators = [];
      data.forEach(function (item, index) {
        var itemPathNavigator = item.pathNavigator,
            type = item.type,
            itemRest = (0, _objectWithoutProperties3.default)(item, ['pathNavigator', 'type']);

        pathNavigators.push({
          pathIndex: index,
          pathNavigator: itemPathNavigator || pathNavigator
        });
        newData.push(type === 'earthLine' ? (0, _extends3.default)({}, itemRest, { path: PathSimplifier.getGeodesicPath.apply(PathSimplifier, (0, _toConsumableArray3.default)(itemRest.path)) }) : itemRest);
      });
      pathSimplifierIns.setData(newData);
      pathNavigators.forEach(function (item) {
        var navigator = pathSimplifierIns.createPathNavigator(item.pathIndex, item.pathNavigator);
        navigator.start();
      });
    }
  }, {
    key: 'render',
    value: function render() {
      return null;
    }
  }]);
  return Track;
}(_react2.default.PureComponent), _class.propTypes = {
  zIndex: _propTypes2.default.number,
  data: _propTypes2.default.array,
  getPath: _propTypes2.default.func,
  getZIndex: _propTypes2.default.func,
  getHoverTitle: _propTypes2.default.func,
  autoSetFitView: _propTypes2.default.bool,
  renderOptions: _propTypes2.default.object,
  pathNavigator: _propTypes2.default.object
}, _class.defaultProps = {
  zIndex: 100,
  data: [],
  getPath: function getPath(pathData, pathIndex) {
    // 返回轨迹数据中的节点坐标信息，[AMap.LngLat, AMap.LngLat...] 或者 [[lng|number,lat|number],...]
    return pathData.path;
  },
  getZIndex: function getZIndex() {},
  getHoverTitle: function getHoverTitle() {},

  autoSetFitView: true,
  renderOptions: {},
  pathNavigator: {
    loop: true, // 循环播放
    speed: 1000000
  }
}, _temp);
exports.default = Track;