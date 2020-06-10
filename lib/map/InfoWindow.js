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

var _class, _temp2;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _coordtransform = require('./coordtransform');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var defaultIconUrl = '//webmap1.map.bdstatic.com/wolfman/static/common/images/markers_new2x_fbb9e99.png';

var InfoWindow = (_temp2 = _class = function (_React$PureComponent) {
  (0, _inherits3.default)(InfoWindow, _React$PureComponent);

  function InfoWindow() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, InfoWindow);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = InfoWindow.__proto__ || (0, _getPrototypeOf2.default)(InfoWindow)).call.apply(_ref, [this].concat(args))), _this), _this.handleClose = function () {
      _this.destroy();
      _this.props.onClose();
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(InfoWindow, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      setTimeout(function () {
        return _this2.initialize();
      }, 0);
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      var _this3 = this;

      if (!this.infoWindow) {
        this.initialize();
      }

      _reactDom2.default.render(this.props.children, this.infoWindow.getContent());
      var position = (0, _coordtransform.convertWgs84ToBd09)(this.props.position[0], this.props.position[1]);
      this.marker.setPosition(new BMap.Point(position[0], position[1]));
      this.marker.openInfoWindow(this.infoWindow);

      // 如果窗口内容的高度发生变化，则重绘窗口
      setTimeout(function () {
        if (_this3.infoWindow) {
          var height = _this3.infoWindow.getContent().clientHeight;
          if (_this3.infoWindowHeight !== height) {
            _this3.infoWindowHeight = height;
            _this3.infoWindow.redraw();
          }
        }
      }, 0);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.destroy();
    }
  }, {
    key: 'initialize',
    value: function initialize() {
      if (this.infoWindow) {
        return;
      }

      this.infoWindow = new BMap.InfoWindow(document.createElement('div'), {
        width: this.props.width,
        height: this.props.height,
        offset: new BMap.Size(this.props.offset[0], this.props.offset[1]),
        enableCloseOnClick: false
      });
      _reactDom2.default.render(this.props.children, this.infoWindow.getContent());

      this.infoWindow.addEventListener('close', this.handleClose);
      this.infoWindow.getContent().addEventListener('click', function (event) {
        // Hack 为了确保InfoWindow中的事件能够正确触发，同时需要设定enableCloseOnClick: false
        event.stopPropagation = function () {};
      });

      var position = (0, _coordtransform.convertWgs84ToBd09)(this.props.position[0], this.props.position[1]);
      var icon = new BMap.Icon(defaultIconUrl, new BMap.Size(0, 0), { infoWindowAnchor: new BMap.Size(0, -10) });
      this.marker = new BMap.Marker(new BMap.Point(position[0], position[1]), { enableClicking: false, icon: icon, shadow: null });
      this.props.map.map.addOverlay(this.marker);
      this.marker.openInfoWindow(this.infoWindow);
    }
  }, {
    key: 'destroy',
    value: function destroy() {
      if (this.infoWindow) {
        this.infoWindow.removeEventListener('close', this.handleClose);
        _reactDom2.default.unmountComponentAtNode(this.infoWindow.getContent());
        this.props.map.map.removeOverlay(this.marker);
        this.infoWindow = null;
        this.marker = null;
      }
    }
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
}, _temp2);
exports.default = InfoWindow;