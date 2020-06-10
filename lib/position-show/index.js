'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _modal = require('antd/lib/modal');

var _modal2 = _interopRequireDefault(_modal);

var _icon = require('antd/lib/icon');

var _icon2 = _interopRequireDefault(_icon);

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

require('antd/lib/modal/style');

require('antd/lib/icon/style');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _reactBmap = require('react-bmap');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _coordtransform = require('../position-input-box/coordtransform');

var coordtransform = _interopRequireWildcard(_coordtransform);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PositionShow = (_temp = _class = function (_React$Component) {
  (0, _inherits3.default)(PositionShow, _React$Component);

  function PositionShow(props) {
    (0, _classCallCheck3.default)(this, PositionShow);

    var _this = (0, _possibleConstructorReturn3.default)(this, (PositionShow.__proto__ || (0, _getPrototypeOf2.default)(PositionShow)).call(this, props));

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

    var _coordtransform$conve = coordtransform.convertWgs84ToBd09(selectPoint[0], selectPoint[1]),
        _coordtransform$conve2 = (0, _slicedToArray3.default)(_coordtransform$conve, 2),
        newLng = _coordtransform$conve2[0],
        nowLat = _coordtransform$conve2[1];

    var newPath = [];
    if (path) {
      var overPoint = dataType === 'geo' ? path.coordinates[0] : path;
      newPath = overPoint.map(function (item) {
        var _coordtransform$conve3 = coordtransform.convertWgs84ToBd09(item[0], item[1]),
            _coordtransform$conve4 = (0, _slicedToArray3.default)(_coordtransform$conve3, 2),
            newPathLng = _coordtransform$conve4[0],
            nowPathLat = _coordtransform$conve4[1];

        return {
          lng: newPathLng,
          lat: nowPathLat
        };
      });
    }
    _this.state = {
      lng: newLng,
      lat: nowLat,
      path: newPath || [],
      visible: false
    };
    return _this;
  }

  (0, _createClass3.default)(PositionShow, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var location = nextProps.value.location,
          dataType = nextProps.dataType,
          path = nextProps.path;

      var selectPoint = dataType === 'geo' ? location ? location.coordinates : [] : location || [];

      var _coordtransform$conve5 = coordtransform.convertWgs84ToBd09(selectPoint[0], selectPoint[1]),
          _coordtransform$conve6 = (0, _slicedToArray3.default)(_coordtransform$conve5, 2),
          newLng = _coordtransform$conve6[0],
          nowLat = _coordtransform$conve6[1];

      var newPath = [];
      if (path) {
        var overPoint = dataType === 'geo' ? path.coordinates[0] : path;
        newPath = overPoint.map(function (item) {
          var _coordtransform$conve7 = coordtransform.convertWgs84ToBd09(item[0], item[1]),
              _coordtransform$conve8 = (0, _slicedToArray3.default)(_coordtransform$conve7, 2),
              newPathLng = _coordtransform$conve8[0],
              nowPathLat = _coordtransform$conve8[1];

          return {
            lng: newPathLng,
            lat: nowPathLat
          };
        });
      }
      this.setState({
        lng: newLng,
        lat: nowLat,
        path: newPath || []
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

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
            width: 800,
            footer: null,
            destroyOnClose: true
          },
          _react2.default.createElement(
            _reactBmap.Map,
            {
              style: { height: '480px' },
              center: { lng: lng, lat: lat },
              zoom: '15',
              enableScrollWheelZoom: true,
              events: { click: function click(event) {
                  return _this2.handleSelection(event);
                } }
            },
            _react2.default.createElement(_reactBmap.Marker, { position: { lng: lng, lat: lat } }),
            _react2.default.createElement(_reactBmap.NavigationControl, { anchor: BMAP_ANCHOR_BOTTOM_RIGHT, type: BMAP_NAVIGATION_CONTROL_ZOOM }),
            path && _react2.default.createElement(_reactBmap.Polygon, {
              autoViewport: false,
              path: path
            })
          )
        )
      );
    }
  }]);
  return PositionShow;
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
exports.default = PositionShow;