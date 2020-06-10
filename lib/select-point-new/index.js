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

var _mapNew = require('../map-new');

var _mapNew2 = _interopRequireDefault(_mapNew);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SelectPointNew = (_temp = _class = function (_PureComponent) {
  (0, _inherits3.default)(SelectPointNew, _PureComponent);

  function SelectPointNew(props) {
    (0, _classCallCheck3.default)(this, SelectPointNew);

    var _this = (0, _possibleConstructorReturn3.default)(this, (SelectPointNew.__proto__ || (0, _getPrototypeOf2.default)(SelectPointNew)).call(this, props));

    _initialiseProps.call(_this);

    _this.propsToState(props, 'constructor');
    return _this;
  }

  (0, _createClass3.default)(SelectPointNew, [{
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
          label = _props.label;
      var _state = this.state,
          visible = _state.visible,
          centerPoint = _state.centerPoint,
          selectPoint = _state.selectPoint,
          points = _state.points,
          pathPoints = _state.pathPoints;

      return _react2.default.createElement(
        'div',
        { className: className, style: style },
        _react2.default.createElement(
          'a',
          { onClick: this.handleLabelClick },
          label || '位置选择'
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
            maskClosable: false
          },
          _react2.default.createElement(
            _mapNew2.default,
            {
              style: this.mapStyle,
              center: centerPoint,
              zoom: 15,
              onClick: this.handleMapClick,
              defaultCursor: 'pointer'
            },
            selectPoint.length && _react2.default.createElement(_mapNew2.default.Markers, {
              data: [{ value: selectPoint }],
              clusterMaxZoom: 6,
              symbolSize: [20, 31],
              itemStyle: { color: 'red' },
              symbolOffset: [-10, -31]
            }),
            points.length > 0 && _react2.default.createElement(_mapNew2.default.Markers, {
              data: points,
              clusterMaxZoom: 6,
              symbol: 'circle',
              symbolOffset: [-5, -5],
              symbolSize: 10
            }),
            pathPoints.length > 0 && _react2.default.createElement(_mapNew2.default.Graphs, {
              type: 'polygon',
              data: { shape: { points: pathPoints }, type: 'polygon' },
              itemStyle: this.graphStyle
            })
          )
        )
      );
    }
  }]);
  return SelectPointNew;
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
  centerPoint: [],
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
    var _props2 = _this2.props,
        onChange = _props2.onChange,
        dataType = _props2.dataType;
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
exports.default = SelectPointNew;