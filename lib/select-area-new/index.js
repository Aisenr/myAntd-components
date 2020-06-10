'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _message2 = require('antd/lib/message');

var _message3 = _interopRequireDefault(_message2);

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _modal = require('antd/lib/modal');

var _modal2 = _interopRequireDefault(_modal);

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

var _mapNew = require('../map-new');

var _mapNew2 = _interopRequireDefault(_mapNew);

var _radioButtonGroup = require('../radio-button-group');

var _radioButtonGroup2 = _interopRequireDefault(_radioButtonGroup);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var RadioButtonGroupStyle = { position: 'absolute', top: '60px', right: '5px', zIndex: '999' };

var SelectAreaNew = (_temp = _class = function (_PureComponent) {
  (0, _inherits3.default)(SelectAreaNew, _PureComponent);

  function SelectAreaNew(props) {
    (0, _classCallCheck3.default)(this, SelectAreaNew);

    var _this = (0, _possibleConstructorReturn3.default)(this, (SelectAreaNew.__proto__ || (0, _getPrototypeOf2.default)(SelectAreaNew)).call(this, props));

    _initialiseProps.call(_this);

    _this.propsToState(props, 'constructor');
    return _this;
  }

  (0, _createClass3.default)(SelectAreaNew, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      this.propsToState(nextProps, 'componentWillReceiveProps');
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          className = _props.className,
          style = _props.style,
          label = _props.label,
          selectPoint = _props.selectPoint;
      var _state = this.state,
          visible = _state.visible,
          centerPoint = _state.centerPoint,
          points = _state.points,
          pathPoints = _state.pathPoints;

      return _react2.default.createElement(
        'div',
        { className: className, style: style },
        _react2.default.createElement(
          'a',
          { onClick: this.handleLabelClick },
          label
        ),
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
            maskClosable: false,
            destroyOnClose: true
          },
          _react2.default.createElement(_radioButtonGroup2.default, { options: this.options, style: RadioButtonGroupStyle, onChange: this.handleOnChange }),
          _react2.default.createElement(
            _mapNew2.default,
            {
              style: this.mapStyle,
              center: centerPoint,
              zoom: 15,
              onClick: this.handleMapClick,
              defaultCursor: 'pointer'
            },
            selectPoint.length > 0 && _react2.default.createElement(_mapNew2.default.Markers, {
              data: [{ value: selectPoint }],
              clusterMaxZoom: 6,
              symbolSize: [20, 30],
              symbolOffset: [-10, -30],
              itemStyle: { color: 'red' }
            }),
            points.length > 0 && _react2.default.createElement(_mapNew2.default.Markers, {
              data: points,
              clusterMaxZoom: 6,
              symbol: 'circle',
              symbolSize: 10,
              symbolOffset: [-5, -5]
            }),
            pathPoints.length > 0 && _react2.default.createElement(_mapNew2.default.Graphs, {
              data: { shape: { points: pathPoints }, type: 'polygon' },
              itemStyle: this.graphStyle
            })
          )
        )
      );
    }
  }]);
  return SelectAreaNew;
}(_react.PureComponent), _class.propTypes = {
  className: _propTypes2.default.string,
  style: _propTypes2.default.object,
  selectPoint: _propTypes2.default.arrayOf(_propTypes2.default.number),
  value: _propTypes2.default.oneOfType([_propTypes2.default.arrayOf(_propTypes2.default.arrayOf(_propTypes2.default.number)), _propTypes2.default.object]),
  centerPoint: _propTypes2.default.arrayOf(_propTypes2.default.number),
  onChange: _propTypes2.default.func,
  dataType: _propTypes2.default.oneOf(['default', 'geo']),
  label: _propTypes2.default.string
}, _class.defaultProps = {
  className: '',
  style: {},
  selectPoint: [],
  value: null,
  centerPoint: [],
  dataType: 'default',
  onChange: function onChange() {},

  label: '区域范围选择'
}, _initialiseProps = function _initialiseProps() {
  var _this2 = this;

  this.propsToState = function (props, type) {
    var selectPoint = props.selectPoint,
        value = props.value,
        centerPoint = props.centerPoint,
        dataType = props.dataType;

    var pathPoints = dataType === 'geo' ? _this2.geoDataConvert(value) : value;
    var newCenterPoint = void 0;
    var newPoints = void 0;
    if (selectPoint && selectPoint.length > 1) {
      newCenterPoint = selectPoint;
    } else if (pathPoints && pathPoints.length > 0) {
      newCenterPoint = pathPoints[0];
    } else if (centerPoint && centerPoint.length > 1) {
      newCenterPoint = centerPoint;
    }

    if (pathPoints && pathPoints.length > 0) {
      newPoints = pathPoints.map(function (item) {
        return { value: item };
      });
    }
    if (type === 'constructor') {
      _this2.state = {
        centerPoint: newCenterPoint,
        selectPoint: selectPoint || [],
        pathPoints: pathPoints || [],
        points: newPoints || [],
        visible: false
      };
    } else {
      _this2.setState({
        centerPoint: newCenterPoint,
        selectPoint: selectPoint || [],
        pathPoints: pathPoints || [],
        points: newPoints || []
      });
    }
  };

  this.geoDataConvert = function (data) {
    return data && data.coordinates[0];
  };

  this.mapStyle = { height: '500px' };
  this.graphStyle = {
    color: 'rgba(100,100,100,.3)',
    borderColor: 'red',
    borderWidth: 1,
    borderType: 'dashed'
  };

  this.handleMapClick = function (_ref) {
    var point = _ref.point;

    var newPoints = [].concat((0, _toConsumableArray3.default)(_this2.state.points));
    var newPathPoints = [].concat((0, _toConsumableArray3.default)(_this2.state.pathPoints), [point]);
    newPoints.push({ value: point });
    _this2.setState({
      points: newPoints,
      pathPoints: newPathPoints
    });
  };

  this.handleLabelClick = function () {
    _this2.setState({
      visible: true
    });
  };

  this.positionOk = function () {
    var _props2 = _this2.props,
        onChange = _props2.onChange,
        dataType = _props2.dataType;
    var pathPoints = _this2.state.pathPoints;

    if (!pathPoints || pathPoints.length < 3) {
      _message3.default.error('至少选择三个点');
      return;
    }
    var resultValue = pathPoints;
    resultValue.push(pathPoints[0]);
    onChange(dataType === 'geo' ? { type: 'Polygon', coordinates: [resultValue] } : resultValue);
    _this2.setState({
      visible: false
    });
  };

  this.hideModal = function () {
    var _props3 = _this2.props,
        selectPoint = _props3.selectPoint,
        pathPoints = _props3.value,
        onChange = _props3.onChange;

    var newPoints = void 0;
    var newPathPoints = void 0;
    if (pathPoints && pathPoints.length > 0) {
      newPoints = pathPoints;
      newPathPoints = pathPoints;
    } else {
      newPoints = [];
      newPathPoints = [];
    }
    onChange(pathPoints);
    _this2.setState({
      selectPoint: selectPoint && selectPoint.length > 0 ? selectPoint : [],
      pathPoints: newPathPoints,
      points: newPoints,
      visible: false
    });
  };

  this.options = [{ label: '回退', value: 'goBack' }, { label: '清除', value: 'clear' }];

  this.handleOnChange = function (e) {
    var type = e.target.value;
    if (type === 'goBack') {
      var newPoints = [].concat((0, _toConsumableArray3.default)(_this2.state.points));
      var newPathPoints = [].concat((0, _toConsumableArray3.default)(_this2.state.pathPoints));
      newPoints.pop();
      newPathPoints.pop();
      _this2.setState({
        pathPoints: newPathPoints,
        points: newPoints
      });
    } else if (type === 'clear') {
      _this2.setState({
        pathPoints: [],
        points: []
      });
    }
  };
}, _temp);
exports.default = SelectAreaNew;