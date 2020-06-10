'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _message2 = require('antd/lib/message');

var _message3 = _interopRequireDefault(_message2);

var _modal = require('antd/lib/modal');

var _modal2 = _interopRequireDefault(_modal);

var _autoComplete = require('antd/lib/auto-complete');

var _autoComplete2 = _interopRequireDefault(_autoComplete);

var _input = require('antd/lib/input');

var _input2 = _interopRequireDefault(_input);

var _button = require('antd/lib/button');

var _button2 = _interopRequireDefault(_button);

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

var _class, _temp, _initialiseProps;

require('antd/lib/message/style');

require('antd/lib/modal/style');

require('antd/lib/auto-complete/style');

require('antd/lib/input/style');

require('antd/lib/button/style');

require('antd/lib/icon/style');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactBmap = require('react-bmap');

var _inputItem = require('../input-item');

var _inputItem2 = _interopRequireDefault(_inputItem);

var _baiduMapService = require('./baiduMapService.js');

var bmapService = _interopRequireWildcard(_baiduMapService);

var _coordtransform = require('./coordtransform');

var coordtransform = _interopRequireWildcard(_coordtransform);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * 地理位置输入框组件
 * @description地理位置输入框
 * @export  PositionInputBox
 * @date    2017-09-28
 * @author  zbs
 */

var PositionInputBox = (_temp = _class = function (_React$PureComponent) {
  (0, _inherits3.default)(PositionInputBox, _React$PureComponent);

  function PositionInputBox(props) {
    (0, _classCallCheck3.default)(this, PositionInputBox);

    var _this = (0, _possibleConstructorReturn3.default)(this, (PositionInputBox.__proto__ || (0, _getPrototypeOf2.default)(PositionInputBox)).call(this, props));

    _initialiseProps.call(_this);

    var _props$value = props.value,
        location = _props$value.location,
        address = _props$value.address,
        dataType = props.dataType;

    var selectPoint = dataType === 'geo' ? location ? location.coordinates : [] : location || [];

    var _coordtransform$conve = coordtransform.convertWgs84ToBd09(selectPoint[0], selectPoint[1]),
        _coordtransform$conve2 = (0, _slicedToArray3.default)(_coordtransform$conve, 2),
        newLng = _coordtransform$conve2[0],
        newLat = _coordtransform$conve2[1];

    _this.state = {
      visible: false,
      chooseLng: newLng,
      chooseLat: newLat,
      address: address,
      dataSource: [],
      record: [newLng, newLat]
    };
    _this.getLocalPoint();
    return _this;
  }

  (0, _createClass3.default)(PositionInputBox, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var nextLocation = nextProps.value.location,
          dataType = nextProps.dataType;
      var location = this.props.value.location;
      var _state = this.state,
          centerLng = _state.centerLng,
          centerLat = _state.centerLat;

      var nextSelectPoint = dataType === 'geo' ? nextLocation ? nextLocation.coordinates : [] : nextLocation || [];
      var selectPoint = dataType === 'geo' ? location ? location.coordinates : [] : location || [];
      if (selectPoint[0] !== nextSelectPoint[0] || selectPoint[1] !== nextSelectPoint[1]) {
        var _coordtransform$conve3 = coordtransform.convertWgs84ToBd09(nextSelectPoint[0], nextSelectPoint[1]),
            _coordtransform$conve4 = (0, _slicedToArray3.default)(_coordtransform$conve3, 2),
            newLng = _coordtransform$conve4[0],
            nowLat = _coordtransform$conve4[1];

        var _coordtransform$conve5 = coordtransform.convertWgs84ToBd09(116.404, 39.915),
            _coordtransform$conve6 = (0, _slicedToArray3.default)(_coordtransform$conve5, 2),
            newCenterLng = _coordtransform$conve6[0],
            nowCenterLat = _coordtransform$conve6[1];

        this.setState({
          record: [newLng, nowLat],
          chooseLng: newLng,
          chooseLat: nowLat,
          centerLng: newLng || centerLng || newCenterLng,
          centerLat: nowLat || centerLat || nowCenterLat
        });
      }
    }

    /**
     * 搜索
     */


    /**
     * 获取当前位置
     */


    /**
     * Modal确定
     */


    /**
     * 取消Modal
     */


    /**
     *  打开地图Modal
     */


    /**
     * 地图选点
     * @param data
     */


    /**
     * 输入框变化出发
     */

  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _state2 = this.state,
          dataSource = _state2.dataSource,
          visible = _state2.visible,
          centerLng = _state2.centerLng,
          centerLat = _state2.centerLat,
          chooseLng = _state2.chooseLng,
          chooseLat = _state2.chooseLat,
          newAddress = _state2.address;
      var _props = this.props,
          readOnly = _props.readOnly,
          address = _props.value.address;

      return _react2.default.createElement(
        'div',
        { style: this.props.style, className: this.props.className },
        _react2.default.createElement(_inputItem2.default, { value: address, readOnly: readOnly, placeholder: readOnly ? '点击右侧图标选择地址' : '请输入地址', style: { width: '100%' }, addonAfter: _react2.default.createElement(_icon2.default, { onClick: this.showMap, style: { color: 'red', fontSize: '20px' }, type: 'environment' }) }),
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
            destroyOnClose: true
          },
          _react2.default.createElement(
            'div',
            { style: { padding: '10px 15px', position: 'absolute', top: '45px', zIndex: 999 } },
            _react2.default.createElement(
              _autoComplete2.default,
              {
                dataSource: dataSource.map(this.renderOption),
                style: { width: '315px' },
                placeholder: '\u8BF7\u8F93\u5165\u5730\u5740',
                readOnly: readOnly,
                onSelect: this.handleSelect,
                onSearch: this.handleSearch
              },
              _react2.default.createElement(_input2.default, {
                suffix: _react2.default.createElement(
                  _button2.default,
                  { style: { right: '-12px', backgroundColor: '#eee' }, onClick: this.onSearch },
                  _react2.default.createElement(_icon2.default, { type: 'search' })
                )
              })
            )
          ),
          _react2.default.createElement(
            _reactBmap.Map,
            {
              style: { height: '480px' },
              center: { lng: centerLng, lat: centerLat },
              zoom: '15',
              enableScrollWheelZoom: true,
              events: { click: function click(event) {
                  return _this2.handleSelection(event);
                } }
            },
            chooseLng && _react2.default.createElement(_reactBmap.Marker, { position: { lng: chooseLng, lat: chooseLat } }),
            _react2.default.createElement(_reactBmap.NavigationControl, { anchor: BMAP_ANCHOR_BOTTOM_RIGHT, type: 'BMAP_NAVIGATION_CONTROL_ZOOM' }),
            chooseLng && _react2.default.createElement(_reactBmap.InfoWindow, { offset: new BMap.Size(0, -32), position: { lng: chooseLng, lat: chooseLat }, text: newAddress, title: '\u5730\u5740:', width: 0, height: 0 })
          )
        )
      );
    }
  }]);
  return PositionInputBox;
}(_react2.default.PureComponent), _class.propTypes = {
  className: _propTypes2.default.string,
  style: _propTypes2.default.object,
  value: _propTypes2.default.shape({
    location: _propTypes2.default.oneOfType([_propTypes2.default.arrayOf(_propTypes2.default.number), _propTypes2.default.object]),
    address: _propTypes2.default.string
  }),
  readOnly: _propTypes2.default.bool,
  description: _propTypes2.default.string,
  onChange: _propTypes2.default.func,
  dataType: _propTypes2.default.oneOf(['default', 'geo'])
}, _class.defaultProps = {
  className: '',
  style: {},
  value: {
    location: null,
    address: ''
  },
  description: null,
  readOnly: false,
  onChange: function onChange() {},

  dataType: 'default'
}, _initialiseProps = function _initialiseProps() {
  var _this3 = this;

  this.onSearch = function () {
    bmapService.getAddressPoint(_this3.state.address).then(function (data) {
      _this3.setState({
        centerLng: data[0],
        centerLat: data[1],
        chooseLng: data[0],
        chooseLat: data[1]
      });
    });
  };

  this.getLocalPoint = function () {
    var geolocation = new BMap.Geolocation();

    var _coordtransform$conve7 = coordtransform.convertWgs84ToBd09(116.404, 39.915),
        _coordtransform$conve8 = (0, _slicedToArray3.default)(_coordtransform$conve7, 2),
        newCenterLng = _coordtransform$conve8[0],
        nowCenterLat = _coordtransform$conve8[1];

    geolocation.getCurrentPosition(function (result) {
      _this3.setState({
        centerLng: result.point.lng || newCenterLng,
        centerLat: result.point.lat || nowCenterLat
      });
    });
  };

  this.positionOk = function () {
    _message3.default.destroy();
    var _state3 = _this3.state,
        address = _state3.address,
        chooseLng = _state3.chooseLng,
        chooseLat = _state3.chooseLat,
        record = _state3.record;

    if (chooseLng == null || chooseLat == null || isNaN(chooseLng)) {
      _message3.default.config({
        top: 155
      });
      _message3.default.error('请选择位置');
      return;
    }
    if (record[0] !== chooseLng || record[1] !== chooseLat) {
      var _props2 = _this3.props,
          onChange = _props2.onChange,
          dataType = _props2.dataType;

      var resultValue = coordtransform.convertBd09ToWgs84(chooseLng, chooseLat);
      var location = dataType === 'geo' ? { type: 'Point', coordinates: resultValue } : resultValue;
      onChange({ address: address, location: location });
    }
    _this3.setState({
      visible: false
    });
  };

  this.hideModal = function () {
    _message3.default.destroy();
    var _props3 = _this3.props,
        location = _props3.value.location,
        dataType = _props3.dataType;

    if (!location) {
      _this3.setState({
        chooseLng: null,
        chooseLat: null,
        visible: false
      });
      return;
    }

    var _ref = dataType === 'geo' ? location.coordinates : location,
        _ref2 = (0, _slicedToArray3.default)(_ref, 2),
        lng = _ref2[0],
        lat = _ref2[1];

    var _coordtransform$conve9 = coordtransform.convertWgs84ToBd09(lng, lat),
        _coordtransform$conve10 = (0, _slicedToArray3.default)(_coordtransform$conve9, 2),
        newLng = _coordtransform$conve10[0],
        nowLat = _coordtransform$conve10[1];

    _this3.setState({
      chooseLng: newLng,
      chooseLat: nowLat,
      visible: false
    });
  };

  this.showMap = function () {
    var description = _this3.props.description;

    if (description) _this3.onSearch();
    _this3.setState({
      visible: true
    });
  };

  this.handleSelection = function (data) {
    var _data$point = data.point,
        lng = _data$point.lng,
        lat = _data$point.lat;

    bmapService.getPointAddress(lng, lat).then(function (address) {
      _this3.setState({
        address: address,
        chooseLng: lng,
        chooseLat: lat
      });
    });
  };

  this.handleSearch = function (value) {
    bmapService.placeSuggestionJsonp({ query: value, region: '全国' }).then(function (result) {
      _this3.setState({
        dataSource: result.result,
        address: value
      });
    });
  };

  this.handleSelect = function (value) {
    var _state$dataSource = _this3.state.dataSource,
        dataSource = _state$dataSource === undefined ? [] : _state$dataSource;

    var param = dataSource.filter(function (item) {
      return '' + item.city + item.district + item.business + item.name === value;
    });
    _this3.setState({
      address: value,
      centerLng: param[0] && param[0].location.lng,
      centerLat: param[0] && param[0].location.lat
    });
  };

  this.renderOption = function (item) {
    return '' + item.city + item.district + item.business + item.name;
  };
}, _temp);
exports.default = PositionInputBox;