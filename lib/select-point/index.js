'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

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

require('antd/lib/modal/style');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _map = require('../map');

var _map2 = _interopRequireDefault(_map);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SelectPoint = (_temp = _class = function (_PureComponent) {
  (0, _inherits3.default)(SelectPoint, _PureComponent);

  function SelectPoint(props) {
    (0, _classCallCheck3.default)(this, SelectPoint);

    var _this = (0, _possibleConstructorReturn3.default)(this, (SelectPoint.__proto__ || (0, _getPrototypeOf2.default)(SelectPoint)).call(this, props));

    _initialiseProps.call(_this);

    _this.propsToState(props, 'constructor');
    return _this;
  }

  (0, _createClass3.default)(SelectPoint, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      this.propsToState(nextProps, 'componentWillReceiveProps');
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { className: this.props.className, style: this.props.style },
        _react2.default.createElement(
          'a',
          { onClick: this.handleLabelClick },
          this.props.label || '位置选择'
        ),
        _react2.default.createElement(
          _modal2.default,
          {
            title: '\u5730\u7406\u4F4D\u7F6E',
            visible: this.state.visible,
            onOk: this.positionOk,
            onCancel: this.hideModal,
            okText: '\u786E\u8BA4',
            cancelText: '\u53D6\u6D88',
            bodyStyle: { padding: 0 },
            width: 800,
            maskClosable: false
          },
          _react2.default.createElement(
            _map2.default,
            {
              style: this.mapStyle,
              center: this.state.centerPoint,
              zoom: 15,
              onClick: this.handleMapClick
            },
            _react2.default.createElement(_map2.default.Markers, {
              data: [{ value: this.state.selectPoint }],
              clusterMaxZoom: 6,
              symbolSize: 30,
              itemStyle: { color: 'red' }
            }),
            _react2.default.createElement(_map2.default.Markers, {
              data: this.state.points,
              clusterMaxZoom: 6,
              symbol: 'circle',
              symbolSize: 10
            }),
            _react2.default.createElement(_map2.default.Graph, {
              type: 'polygon',
              shape: { points: this.state.pathPoints },
              itemStyle: this.graphStyle
            })
          )
        )
      );
    }
  }]);
  return SelectPoint;
}(_react.PureComponent), _class.propTypes = {
  className: _propTypes2.default.string,
  style: _propTypes2.default.object,
  value: _propTypes2.default.oneOfType([_propTypes2.default.arrayOf(_propTypes2.default.number), _propTypes2.default.object]),
  pathPoints: _propTypes2.default.arrayOf(_propTypes2.default.arrayOf(_propTypes2.default.number)),
  centerPoint: _propTypes2.default.arrayOf(_propTypes2.default.number),
  dataType: _propTypes2.default.oneOf(['default', 'geo']),
  onChange: _propTypes2.default.func
}, _class.defaultProps = {
  className: '',
  style: {},
  value: null,
  pathPoints: [],
  centerPoint: [116.404, 39.915],
  dataType: 'default',
  onChange: function onChange() {}
}, _initialiseProps = function _initialiseProps() {
  var _this2 = this;

  this.propsToState = function (props, type) {
    var value = props.value,
        pathPoints = props.pathPoints,
        centerPoint = props.centerPoint,
        dataType = props.dataType;

    var selectPoint = dataType === 'geo' ? _this2.geoDataConvert(value) : value;
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
    return data && data.coordinates;
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

    _this2.setState({
      selectPoint: point
    });
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
    var selectPoint = _this2.state.selectPoint;

    _this2.setState({
      visible: false
    });
    onChange(dataType === 'geo' ? { type: 'Point', coordinates: selectPoint } : selectPoint);
  };

  this.hideModal = function () {
    var selectPoint = _this2.props.value;

    _this2.setState({
      selectPoint: selectPoint && selectPoint.length > 0 ? selectPoint : [],
      visible: false
    });
  };
}, _temp);
exports.default = SelectPoint;