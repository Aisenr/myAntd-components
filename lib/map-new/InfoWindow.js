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

var InfoWindow = (_temp = _class = function (_React$PureComponent) {
  (0, _inherits3.default)(InfoWindow, _React$PureComponent);

  function InfoWindow(props) {
    (0, _classCallCheck3.default)(this, InfoWindow);

    var _this = (0, _possibleConstructorReturn3.default)(this, (InfoWindow.__proto__ || (0, _getPrototypeOf2.default)(InfoWindow)).call(this, props));

    if (typeof window !== 'undefined') {
      if (!props.map) {
        console.warn('没有地图实例；组件必须作为 Map 的子组件使用');
      } else {
        _this.map = props.map;
        _this.createInfoWindow(props);
      }
    }
    return _this;
  }

  (0, _createClass3.default)(InfoWindow, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (nextProps.position && nextProps.position !== this.props.position) {
        this.createInfoWindow(nextProps);
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      if (this.infoWindow) {
        this.map.remove(this.infoWindow);
      }
    }
  }, {
    key: 'createInfoWindow',
    value: function createInfoWindow(props) {
      var map = props.map,
          position = props.position,
          offset = props.offset,
          children = props.children;

      if (this.infoWindow) {
        this.map.remove(this.infoWindow);
      }
      this.infoWindow = new AMap.InfoWindow({
        offset: new AMap.Pixel(offset[0], offset[1])
      });
      this.node = document.createElement('div');
      _reactDom2.default.render(children, this.node);
      this.infoWindow.setContent(this.node);
      var newPosition = (0, _coordtransform.convertWgs84ToGcj02)(position[0], position[1]);
      this.infoWindow.open(map, newPosition);
    }

    // handleClose = () => {
    //   this.destroy();
    //   this.props.onClose();
    // };
    //
    // destroy() {
    //   if (this.infoWindow) {
    //     this.infoWindow.removeEventListener('close', this.handleClose);
    //     ReactDOM.unmountComponentAtNode(this.infoWindow.getContent());
    //     this.props.map.map.removeOverlay(this.marker);
    //     this.infoWindow = null;
    //     this.marker = null;
    //   }
    // }

  }, {
    key: 'render',
    value: function render() {
      return null;
    }
  }]);
  return InfoWindow;
}(_react2.default.PureComponent), _class.propTypes = {
  position: _propTypes2.default.arrayOf(_propTypes2.default.number).isRequired,
  width: _propTypes2.default.number,
  height: _propTypes2.default.number,
  offset: _propTypes2.default.arrayOf(_propTypes2.default.number),
  onClose: _propTypes2.default.func
}, _class.defaultProps = {
  width: 0,
  height: 0,
  offset: [0, 0],
  onClose: function onClose() {}
}, _temp);
exports.default = InfoWindow;