'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _message2 = require('antd/lib/message');

var _message3 = _interopRequireDefault(_message2);

var _modal = require('antd/lib/modal');

var _modal2 = _interopRequireDefault(_modal);

var _icon = require('antd/lib/icon');

var _icon2 = _interopRequireDefault(_icon);

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

var _class, _temp, _initialiseProps;

require('antd/lib/message/style');

require('antd/lib/modal/style');

require('antd/lib/icon/style');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _mapNew = require('../map-new');

var _mapNew2 = _interopRequireDefault(_mapNew);

var _inputItem = require('../input-item');

var _inputItem2 = _interopRequireDefault(_inputItem);

var _geocoder = require('../utils/geocoder');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * 地理位置输入框组件
 * @description地理位置输入框
 * @export  PositionInputBox
 * @date    2017-09-28
 * @author  zbs
 */

var PositionInputBoxNew = (_temp = _class = function (_React$PureComponent) {
  (0, _inherits3.default)(PositionInputBoxNew, _React$PureComponent);

  function PositionInputBoxNew(props) {
    (0, _classCallCheck3.default)(this, PositionInputBoxNew);

    var _this = (0, _possibleConstructorReturn3.default)(this, (PositionInputBoxNew.__proto__ || (0, _getPrototypeOf2.default)(PositionInputBoxNew)).call(this, props));

    _initialiseProps.call(_this);

    var _props$value = props.value,
        location = _props$value.location,
        address = _props$value.address,
        dataType = props.dataType;

    var currentSelectPoint = dataType === 'geo' ? location ? location.coordinates : [] : location || [];
    _this.state = {
      visible: false,
      selectPoint: { value: currentSelectPoint, content: _react2.default.createElement('div', { className: _this.prefixCls + '-red' }), name: address },
      centerPoint: [].concat((0, _toConsumableArray3.default)(currentSelectPoint)),
      address: address,
      record: [].concat((0, _toConsumableArray3.default)(currentSelectPoint)),
      searchPoints: [],
      iconCla: 'blue'
    };
    return _this;
  }

  (0, _createClass3.default)(PositionInputBoxNew, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var _nextProps$value = nextProps.value,
          nextLocation = _nextProps$value.location,
          address = _nextProps$value.address,
          dataType = nextProps.dataType;
      var location = this.props.value.location;

      var nextSelectPoint = dataType === 'geo' ? nextLocation ? nextLocation.coordinates : [] : nextLocation || [];
      var currentSelectPoint = dataType === 'geo' ? location ? location.coordinates : [] : location || [];
      if (currentSelectPoint[0] !== nextSelectPoint[0] || currentSelectPoint[1] !== nextSelectPoint[1]) {
        this.setState({
          record: [].concat((0, _toConsumableArray3.default)(nextSelectPoint)),
          selectPoint: { value: nextSelectPoint, content: _react2.default.createElement('div', { className: this.prefixCls + '-red' }), name: address },
          address: address,
          centerPoint: [].concat((0, _toConsumableArray3.default)(nextSelectPoint))
        });
      }
    }

    /**
     * Modal确定
     */


    /**
     * 取消Modal
     */


    /**
     *  打开地图Modal
     */

  }, {
    key: 'render',
    value: function render() {
      var _state = this.state,
          visible = _state.visible,
          centerPoint = _state.centerPoint,
          selectPoint = _state.selectPoint,
          searchPoints = _state.searchPoints;
      var _props = this.props,
          readOnly = _props.readOnly,
          address = _props.value.address;

      var showPoints = [];
      selectPoint.value && selectPoint.value.length > 0 && showPoints.push(selectPoint);
      searchPoints.length > 0 && showPoints.push.apply(showPoints, (0, _toConsumableArray3.default)(searchPoints));

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
            _mapNew2.default,
            {
              style: { height: '480px' },
              center: centerPoint,
              zoom: 15,
              onClick: this.handleMapClick
            },
            _react2.default.createElement(_mapNew2.default.Autocomplete, { onChange: this.handleAutocompleteChange }),
            _react2.default.createElement(_mapNew2.default.Markers, { fitView: true, clusterGridSize: 0, symbolSize: [20, 32], symbolOffset: [-10, -32], data: showPoints, onClick: this.handleMarkClick }),
            selectPoint.value && selectPoint.value.length > 0 && _react2.default.createElement(
              _mapNew2.default.InfoWindow,
              { position: selectPoint.value, offset: [0, -30] },
              selectPoint.name
            )
          )
        )
      );
    }
  }]);
  return PositionInputBoxNew;
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
  var _this2 = this;

  this.positionOk = function () {
    _message3.default.destroy();
    var _state2 = _this2.state,
        selectPoint = _state2.selectPoint,
        record = _state2.record;
    var value = selectPoint.value,
        name = selectPoint.name;

    if (!selectPoint || value.length <= 0) {
      _message3.default.config({
        top: 155
      });
      _message3.default.error('请选择位置');
      return;
    }
    if (record[0] !== value[0] || record[1] !== value[1]) {
      var _props2 = _this2.props,
          onChange = _props2.onChange,
          dataType = _props2.dataType;

      var location = dataType === 'geo' ? { type: 'Point', coordinates: value } : value;
      onChange({ address: name, location: location });
    }
    _this2.setState({
      visible: false
    });
  };

  this.hideModal = function () {
    _message3.default.destroy();
    var _props3 = _this2.props,
        _props3$value = _props3.value,
        location = _props3$value.location,
        address = _props3$value.address,
        dataType = _props3.dataType;

    if (!location) {
      _this2.setState({
        selectPoint: { value: [] },
        visible: false
      });
      return;
    }
    var currentSelectPoint = dataType === 'geo' ? location.coordinates : location;
    _this2.setState({
      selectPoint: { value: currentSelectPoint,
        type: 'Point',
        name: address,
        content: _react2.default.createElement('div', { className: _this2.prefixCls + '-red' }),
        zIndex: 120
      },
      visible: false
    });
  };

  this.showMap = function () {
    var description = _this2.props.description;

    if (description) _this2.onSearch();
    _this2.setState({
      visible: true
    });
  };

  this.handleMapClick = function (_ref) {
    var point = _ref.point;

    (0, _geocoder.getAddress)(point).then(function (item) {
      _this2.setState({
        selectPoint: {
          value: point,
          content: _react2.default.createElement('div', { className: _this2.prefixCls + '-red' }),
          zIndex: 120,
          name: item.formattedAddress
        },
        centerPoint: [].concat((0, _toConsumableArray3.default)(point)),
        searchPoints: []
      });
    });
  };

  this.prefixCls = 'bis-position-input-box';

  this.handleAutocompleteChange = function (currentObj, objs) {
    var iconCla = _this2.state.iconCla;

    _this2.setState({
      searchPoints: objs.map(function (item, index) {
        var _item$location = item.location,
            lng = _item$location.lng,
            lat = _item$location.lat,
            name = item.name;

        return {
          content: _react2.default.createElement(
            'div',
            { className: _this2.prefixCls + '-' + iconCla },
            index + 1
          ),
          value: [lng, lat],
          name: name,
          zIndex: 110 - index
        };
      })
    });
  };

  this.handleMarkClick = function (e) {
    var _e$data = e.data,
        value = _e$data.value,
        name = _e$data.name;

    _this2.setState({
      selectPoint: { value: value, content: _react2.default.createElement('div', { className: _this2.prefixCls + '-red' }), zIndex: 120, name: name },
      searchPoints: [],
      address: name
    });
  };
}, _temp);
exports.default = PositionInputBoxNew;