'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _message2 = require('antd/lib/message');

var _message3 = _interopRequireDefault(_message2);

var _modal = require('antd/lib/modal');

var _modal2 = _interopRequireDefault(_modal);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

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

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _map = require('../map');

var _map2 = _interopRequireDefault(_map);

var _radioButtonGroup = require('../radio-button-group');

var _radioButtonGroup2 = _interopRequireDefault(_radioButtonGroup);

var _iconBase = require('../select-area/iconBase64');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SelectRoute = (_temp = _class = function (_PureComponent) {
  (0, _inherits3.default)(SelectRoute, _PureComponent);

  function SelectRoute(props) {
    (0, _classCallCheck3.default)(this, SelectRoute);

    var _this = (0, _possibleConstructorReturn3.default)(this, (SelectRoute.__proto__ || (0, _getPrototypeOf2.default)(SelectRoute)).call(this, props));

    _initialiseProps.call(_this);

    _this.propsToState(props, 'constructor');
    return _this;
  }

  (0, _createClass3.default)(SelectRoute, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      this.propsToState(nextProps, 'componentWillReceiveProps');
    }
  }, {
    key: 'render',
    value: function render() {
      var startAndEndPosition = this.props.startAndEndPosition;
      var points = this.state.points;

      var newPoints = [];
      if (points.length > 0) {
        newPoints.push((0, _extends3.default)({}, points[0], {
          symbol: '',
          symbolSize: 5,
          symbolOffset: [0, 0]
        }));
        startAndEndPosition && newPoints.push((0, _extends3.default)({}, points[0], {
          symbol: _iconBase.startIcon
        }));
      }
      if (points.length > 1) {
        newPoints.push((0, _extends3.default)({}, points[points.length - 1], {
          symbol: '',
          symbolSize: 5,
          symbolOffset: [0, 0]
        }));
        startAndEndPosition && newPoints.push((0, _extends3.default)({}, points[points.length - 1], {
          symbol: _iconBase.endIcon
        }));
      }

      return _react2.default.createElement(
        'div',
        { className: this.props.className, style: this.props.style },
        _react2.default.createElement(
          'a',
          { onClick: this.handleLabelClick },
          this.props.label || '路线选择'
        ),
        _react2.default.createElement(
          _modal2.default,
          {
            title: '\u8DEF\u7EBF\u9009\u62E9',
            visible: this.state.visible,
            onOk: this.positionOk,
            onCancel: this.hideModal,
            okText: '\u786E\u8BA4',
            cancelText: '\u53D6\u6D88',
            bodyStyle: { padding: 0 },
            width: 800,
            maskClosable: false
          },
          _react2.default.createElement(_radioButtonGroup2.default, { options: this.options, style: { position: 'absolute', top: '60px', right: '5px', zIndex: '999' }, onChange: this.handleOnChange }),
          _react2.default.createElement(
            _map2.default,
            {
              style: { height: '500px' },
              center: this.state.centerPoint,
              zoom: 15,
              onClick: this.handleMapClick
            },
            _react2.default.createElement(_map2.default.Markers, {
              data: newPoints,
              clusterMaxZoom: 6
              // symbol="circle"
              , symbolOffset: [0, -17],
              symbolSize: 34
            }),
            _react2.default.createElement(_map2.default.Graph, {
              type: 'polyline',
              shape: { points: this.state.linePoints },
              itemStyle: {
                color: 'transparent',
                borderColor: 'red',
                borderWidth: 5
              }
            })
          )
        )
      );
    }
  }]);
  return SelectRoute;
}(_react.PureComponent), _class.propTypes = {
  className: _propTypes2.default.string,
  style: _propTypes2.default.object,
  value: _propTypes2.default.oneOfType([_propTypes2.default.arrayOf(_propTypes2.default.arrayOf(_propTypes2.default.number)), _propTypes2.default.object]),
  centerPoint: _propTypes2.default.arrayOf(_propTypes2.default.number),
  dataType: _propTypes2.default.oneOf(['default', 'geo']),
  onChange: _propTypes2.default.func,
  startAndEndPosition: _propTypes2.default.bool
}, _class.defaultProps = {
  className: '',
  style: {},
  value: null,
  centerPoint: [116.404, 39.915],
  dataType: 'default',
  onChange: function onChange() {},

  startAndEndPosition: true
}, _initialiseProps = function _initialiseProps() {
  var _this2 = this;

  this.propsToState = function (props, type) {
    var value = props.value,
        centerPoint = props.centerPoint,
        dataType = props.dataType;

    var linePoints = dataType === 'geo' ? _this2.geoDataConvert(value) : value;
    var newCenterPoint = void 0;
    var newPoints = void 0;

    if (linePoints && linePoints.length > 0) {
      newCenterPoint = linePoints[0];
    } else if (centerPoint && centerPoint.length > 1) {
      newCenterPoint = centerPoint;
    }

    if (linePoints && linePoints.length > 0) {
      newPoints = linePoints.map(function (item) {
        return { value: item };
      });
    }

    if (type === 'constructor') {
      _this2.state = {
        centerPoint: newCenterPoint || [116.404, 39.915],
        linePoints: linePoints || [],
        points: newPoints || [],
        visible: false
      };
    } else {
      _this2.setState({
        centerPoint: newCenterPoint || [116.404, 39.915],
        linePoints: linePoints || [],
        points: newPoints || []
      });
    }
  };

  this.geoDataConvert = function (data) {
    return data && data.coordinates;
  };

  this.handleLabelClick = function () {
    _this2.setState({
      visible: true
    });
  };

  this.positionOk = function () {
    var _props = _this2.props,
        onChange = _props.onChange,
        dataType = _props.dataType;
    var linePoints = _this2.state.linePoints;

    if (!linePoints || linePoints.length < 2) {
      _message3.default.error('至少选择三个点');
      return;
    }
    _this2.setState({
      visible: false
    });
    var resultValue = linePoints;
    onChange(dataType === 'geo' ? { type: 'LineString', coordinates: resultValue } : resultValue);
  };

  this.hideModal = function () {
    var _props2 = _this2.props,
        linePoints = _props2.value,
        onChange = _props2.onChange;

    var newPoints = void 0;
    var newLinePoints = void 0;
    if (linePoints && linePoints.length > 0) {
      newPoints = linePoints.map(function (item) {
        return { value: item };
      });
      newLinePoints = linePoints;
    } else {
      newPoints = [];
      newLinePoints = [];
    }
    onChange(linePoints);
    _this2.setState({
      linePoints: newLinePoints,
      points: newPoints,
      visible: false
    });
  };

  this.handleMapClick = function (_ref) {
    var point = _ref.point;

    var newPoints = [].concat((0, _toConsumableArray3.default)(_this2.state.points));
    var newLinePoints = [].concat((0, _toConsumableArray3.default)(_this2.state.linePoints), [point]);
    newPoints.push({ value: point });
    _this2.setState({
      points: newPoints,
      linePoints: newLinePoints
    });
  };

  this.handleOnChange = function (e) {
    var type = e.target.value;
    if (type === 'goBack') {
      var newPoints = [].concat((0, _toConsumableArray3.default)(_this2.state.points));
      var newLinePoints = [].concat((0, _toConsumableArray3.default)(_this2.state.linePoints));
      newPoints.pop();
      newLinePoints.pop();
      _this2.setState({
        linePoints: newLinePoints,
        points: newPoints
      });
    } else if (type === 'clear') {
      _this2.setState({
        linePoints: [],
        points: []
      });
    }
  };

  this.options = [{ label: '回退', value: 'goBack' }, { label: '清除', value: 'clear' }];
}, _temp);
exports.default = SelectRoute;