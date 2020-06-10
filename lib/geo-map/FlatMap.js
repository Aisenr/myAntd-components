'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

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

/**
 * 平面显示地理对象
 * @description 路线图、区域图
 * @export  FlatMap
 * @date    2017-03-05
 * @author  zbs
 */
var FlatMap = (_temp = _class = function (_PureComponent) {
  (0, _inherits3.default)(FlatMap, _PureComponent);

  function FlatMap(props) {
    (0, _classCallCheck3.default)(this, FlatMap);

    var _this = (0, _possibleConstructorReturn3.default)(this, (FlatMap.__proto__ || (0, _getPrototypeOf2.default)(FlatMap)).call(this, props));

    _this.propsToState(props, 'constructor');
    return _this;
  }

  (0, _createClass3.default)(FlatMap, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      this.propsToState(nextProps, 'componentWillReceiveProps');
    }
  }, {
    key: 'propsToState',
    value: function propsToState(props, type) {
      var dataType = props.dataType,
          pathPoints = props.pathPoints,
          linePoints = props.linePoints,
          positionPoint = props.positionPoint;

      var newCenterPoint = {
        lng: 116.3972282409668,
        lat: 39.90960456049752
      };
      var newPathPoints = [];
      if (pathPoints) {
        var data = dataType === 'geo' ? pathPoints.coordinates[0] : pathPoints;
        newPathPoints = data.map(function (item) {
          var _coordtransform$conve = coordtransform.convertWgs84ToBd09(item[0], item[1]),
              _coordtransform$conve2 = (0, _slicedToArray3.default)(_coordtransform$conve, 2),
              newPathLng = _coordtransform$conve2[0],
              nowPathLat = _coordtransform$conve2[1];

          return {
            lng: newPathLng,
            lat: nowPathLat
          };
        });
        newCenterPoint = newPathPoints[0];
      }
      var newLinePoints = [];
      if (linePoints) {
        var _data = dataType === 'geo' ? linePoints.coordinates : linePoints;
        newLinePoints = _data.map(function (item) {
          var _coordtransform$conve3 = coordtransform.convertWgs84ToBd09(item[0], item[1]),
              _coordtransform$conve4 = (0, _slicedToArray3.default)(_coordtransform$conve3, 2),
              newPathLng = _coordtransform$conve4[0],
              nowPathLat = _coordtransform$conve4[1];

          return {
            lng: newPathLng,
            lat: nowPathLat
          };
        });
        newCenterPoint = newLinePoints[0];
      }

      var newPositionPoint = [];
      if (positionPoint) {
        var _data2 = dataType === 'geo' ? positionPoint.coordinates : positionPoint;
        newPositionPoint = coordtransform.convertWgs84ToBd09(_data2[0], _data2[1]);
        newCenterPoint = {
          lng: newPositionPoint[0],
          lat: newPositionPoint[1]
        };
      }

      if (type === 'constructor') {
        this.state = {
          centerPoint: newCenterPoint,
          pathPoints: newPathPoints,
          linePoints: newLinePoints,
          positionPoint: newPositionPoint
        };
      } else {
        this.setState({
          centerPoint: newCenterPoint,
          pathPoints: newPathPoints,
          linePoints: newLinePoints,
          positionPoint: newPositionPoint
        });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          _props$prefixCls = _props.prefixCls,
          prefixCls = _props$prefixCls === undefined ? 'bis-route-map' : _props$prefixCls,
          className = _props.className,
          style = _props.style;
      var _state = this.state,
          centerPoint = _state.centerPoint,
          linePoints = _state.linePoints,
          pathPoints = _state.pathPoints,
          positionPoint = _state.positionPoint;

      return _react2.default.createElement(
        'div',
        { className: (0, _classnames2.default)(prefixCls, className), style: style },
        _react2.default.createElement(
          _reactBmap.Map,
          {
            center: centerPoint,
            style: { height: style.height || '200px' },
            zoom: '15',
            enableScrollWheelZoom: true
          },
          _react2.default.createElement(_reactBmap.NavigationControl, { anchor: BMAP_ANCHOR_BOTTOM_RIGHT, type: BMAP_NAVIGATION_CONTROL_ZOOM }),
          positionPoint.length > 0 && _react2.default.createElement(_reactBmap.Marker, { position: { lng: positionPoint[0], lat: positionPoint[1] } }),
          linePoints.length > 0 && _react2.default.createElement(_reactBmap.Polyline, { path: linePoints }),
          pathPoints.length > 0 && _react2.default.createElement(_reactBmap.Polygon, { path: pathPoints })
        )
      );
    }
  }]);
  return FlatMap;
}(_react.PureComponent), _class.propTypes = {
  className: _propTypes2.default.string,
  style: _propTypes2.default.object,
  dataType: _propTypes2.default.oneOf(['default', 'geo']),
  pathPoints: _propTypes2.default.oneOfType([_propTypes2.default.arrayOf(_propTypes2.default.arrayOf(_propTypes2.default.number)), _propTypes2.default.object]),
  linePoints: _propTypes2.default.oneOfType([_propTypes2.default.arrayOf(_propTypes2.default.arrayOf(_propTypes2.default.number)), _propTypes2.default.object]),
  positionPoint: _propTypes2.default.oneOfType([_propTypes2.default.arrayOf(_propTypes2.default.number), _propTypes2.default.object])
}, _class.defaultProps = {
  className: '',
  style: {},
  dataType: 'default',
  pathPoints: null,
  linePoints: null,
  positionPoint: null
}, _temp);
exports.default = FlatMap;