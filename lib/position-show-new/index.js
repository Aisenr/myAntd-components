'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _modal = require('antd/lib/modal');

var _modal2 = _interopRequireDefault(_modal);

var _icon = require('antd/lib/icon');

var _icon2 = _interopRequireDefault(_icon);

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

require('antd/lib/modal/style');

require('antd/lib/icon/style');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _mapNew = require('../map-new');

var _mapNew2 = _interopRequireDefault(_mapNew);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PositionShowNew = (_temp = _class = function (_React$Component) {
  (0, _inherits3.default)(PositionShowNew, _React$Component);

  function PositionShowNew(props) {
    (0, _classCallCheck3.default)(this, PositionShowNew);

    var _this = (0, _possibleConstructorReturn3.default)(this, (PositionShowNew.__proto__ || (0, _getPrototypeOf2.default)(PositionShowNew)).call(this, props));

    _this.positionOk = function () {
      _this.setState({
        visible: false
      });
    };

    _this.hideModal = function () {
      _this.setState({
        visible: false
      });
    };

    _this.showMap = function () {
      _this.setState({
        visible: true
      });
    };

    var location = props.value.location,
        dataType = props.dataType,
        path = props.path;

    var selectPoint = dataType === 'geo' ? location ? location.coordinates : [] : location || [];
    var newPath = dataType === 'geo' && path ? path.coordinates[0] : path;
    _this.state = {
      lng: selectPoint[0],
      lat: selectPoint[1],
      path: newPath,
      visible: false
    };
    return _this;
  }

  (0, _createClass3.default)(PositionShowNew, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var location = nextProps.value.location,
          dataType = nextProps.dataType,
          path = nextProps.path;

      var selectPoint = dataType === 'geo' ? location ? location.coordinates : [] : location || [];
      var newPath = dataType === 'geo' && path ? path.coordinates[0] : path;
      this.setState({
        lng: selectPoint[0],
        lat: selectPoint[1],
        path: newPath
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          _props$prefixCls = _props.prefixCls,
          prefixCls = _props$prefixCls === undefined ? 'bis-position-show' : _props$prefixCls,
          className = _props.className,
          style = _props.style,
          address = _props.value.address;
      var _state = this.state,
          visible = _state.visible,
          lng = _state.lng,
          lat = _state.lat,
          path = _state.path;

      return _react2.default.createElement(
        'div',
        { className: (0, _classnames2.default)(prefixCls, className), style: style },
        _react2.default.createElement(
          'span',
          null,
          address
        ),
        _react2.default.createElement(_icon2.default, { onClick: this.showMap, style: { color: 'red', fontSize: '20px', marginLeft: '10px' }, type: 'environment' }),
        _react2.default.createElement(
          _modal2.default,
          {
            title: '\u5730\u7406\u4F4D\u7F6E',
            visible: visible,
            onOk: this.positionOk,
            onCancel: this.hideModal,
            okText: '\u786E\u8BA4',
            cancelText: '\u53D6\u6D88',
            bodyStyle: { padding: 0 },
            width: 960,
            footer: null,
            destroyOnClose: true
          },
          _react2.default.createElement(
            _mapNew2.default,
            {
              style: { height: '480px' },
              center: [lng, lat],
              zoom: 15
            },
            _react2.default.createElement(_mapNew2.default.Markers, { fitView: true, data: [[lng, lat]], symbolSize: [20, 31], symbolOffset: [-10, -31] }),
            _react2.default.createElement(_mapNew2.default.ToolBar, null),
            path && _react2.default.createElement(_mapNew2.default.Graphs, {
              data: [{
                type: 'polygon',
                shape: { points: path }
              }]
            })
          )
        )
      );
    }
  }]);
  return PositionShowNew;
}(_react2.default.Component), _class.propTypes = {
  className: _propTypes2.default.string,
  style: _propTypes2.default.object,
  value: _propTypes2.default.shape({
    address: _propTypes2.default.string,
    location: _propTypes2.default.oneOfType([_propTypes2.default.arrayOf(_propTypes2.default.number), _propTypes2.default.object])
  }),
  path: _propTypes2.default.oneOfType([_propTypes2.default.arrayOf(_propTypes2.default.number), _propTypes2.default.object]),
  dataType: _propTypes2.default.oneOf(['default', 'geo'])
}, _class.defaultProps = {
  className: '',
  style: {},
  value: {},
  path: null,
  dataType: 'default'
}, _temp);
exports.default = PositionShowNew;