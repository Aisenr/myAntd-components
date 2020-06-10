'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

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

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _coordtransform = require('./utils/coordtransform');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ContextMenu = (_temp = _class = function (_React$PureComponent) {
  (0, _inherits3.default)(ContextMenu, _React$PureComponent);

  function ContextMenu(props) {
    (0, _classCallCheck3.default)(this, ContextMenu);

    var _this = (0, _possibleConstructorReturn3.default)(this, (ContextMenu.__proto__ || (0, _getPrototypeOf2.default)(ContextMenu)).call(this, props));

    _this.defaultMenu = function (items) {
      _this.contextMenu = new AMap.ContextMenu();
      items.forEach(function (item, index) {
        _this.contextMenu.addItem(item.text, function () {
          return item.onClick(_this.contextMenuPositon);
        }, index);
      });
    };

    _this.customizeMenu = function (content) {
      _this.node = document.createElement('div');
      _reactDom2.default.render(content, _this.node);
      _this.contextMenu = new AMap.ContextMenu({ isCustom: true, content: _this.node });
    };

    if (typeof window !== 'undefined') {
      if (!props.map) {
        console.warn('没有地图实例；组件必须作为 Map 的子组件使用');
      } else {
        _this.map = props.map;
        _this.createContextMenu(props);
      }
    }
    return _this;
  }

  // componentWillReceiveProps(nextProps) {
  // const { areaCode } = this.props;
  // if (areaCode !== nextProps.areaCode) this.createBoundary(nextProps);
  // }

  (0, _createClass3.default)(ContextMenu, [{
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      if (this.contextMenu) {
        this.contextMenu.close();
      }
    }
  }, {
    key: 'createContextMenu',
    value: function createContextMenu(props) {
      var _this2 = this;

      if (this.contextMenu) {
        this.contextMenu.close();
      }
      var content = props.content,
          items = props.items;

      if (content) {
        this.customizeMenu(content);
      } else if (items.length > 0) {
        this.defaultMenu(items);
      }
      this.map.on('rightclick', function (e) {
        var _e$lnglat = e.lnglat,
            lng = _e$lnglat.lng,
            lat = _e$lnglat.lat;

        var newLngLat = (0, _coordtransform.convertGcj02ToWgs84)(lng, lat);
        ContextMenu.contextMenuPositon = newLngLat;
        _this2.contextMenu.open(_this2.map, e.lnglat);
        _this2.contextMenuPositon = newLngLat; // 右键菜单位置
      });
    }
  }, {
    key: 'render',
    value: function render() {
      return null;
    }
  }]);
  return ContextMenu;
}(_react2.default.PureComponent), _class.propTypes = {
  items: _propTypes2.default.arrayOf(_propTypes2.default.shape({
    text: _propTypes2.default.string,
    onClick: function onClick() {}
  })),
  content: _propTypes2.default.object
}, _class.defaultProps = {
  items: [],
  content: null
}, _temp);
exports.default = ContextMenu;


ContextMenu.contextMenuPositon = {};