'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

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
 * 路线图
 * @description 路线图
 * @export  RouteMap
 * @date    2017-12-27
 * @author  zbs
 */
var RouteMap = (_temp = _class = function (_React$Component) {
  (0, _inherits3.default)(RouteMap, _React$Component);

  function RouteMap(props) {
    (0, _classCallCheck3.default)(this, RouteMap);

    var _this = (0, _possibleConstructorReturn3.default)(this, (RouteMap.__proto__ || (0, _getPrototypeOf2.default)(RouteMap)).call(this, props));

    var newPath = [];
    if (props.path) {
      newPath = props.path.map(function (item) {
        var _coordtransform$conve = coordtransform.convertWgs84ToBd09(item.lng, item.lat),
            _coordtransform$conve2 = (0, _slicedToArray3.default)(_coordtransform$conve, 2),
            newPathLng = _coordtransform$conve2[0],
            nowPathLat = _coordtransform$conve2[1];

        return {
          lng: newPathLng,
          lat: nowPathLat
        };
      });
    }
    _this.state = {
      path: newPath
    };
    return _this;
  }

  (0, _createClass3.default)(RouteMap, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var newPath = [];
      if (nextProps.path) {
        newPath = nextProps.path.map(function (item) {
          var _coordtransform$conve3 = coordtransform.convertWgs84ToBd09(item.lng, item.lat),
              _coordtransform$conve4 = (0, _slicedToArray3.default)(_coordtransform$conve3, 2),
              newPathLng = _coordtransform$conve4[0],
              nowPathLat = _coordtransform$conve4[1];

          return {
            lng: newPathLng,
            lat: nowPathLat
          };
        });
      }
      this.setState({
        path: newPath
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          _props$prefixCls = _props.prefixCls,
          prefixCls = _props$prefixCls === undefined ? 'bis-route-map' : _props$prefixCls,
          className = _props.className;

      return _react2.default.createElement(
        'div',
        { className: (0, _classnames2.default)(prefixCls, className), style: this.props.style },
        _react2.default.createElement(
          _reactBmap.Map,
          {
            center: { lng: this.state.path.length > 0 ? this.state.path[0].lng : 116.3972282409668, lat: this.state.path.length > 0 ? this.state.path[0].lat : 39.90960456049752 },
            style: { height: this.props.style.height || '200px' },
            zoom: '11',
            enableScrollWheelZoom: true
          },
          _react2.default.createElement(_reactBmap.NavigationControl, { anchor: BMAP_ANCHOR_BOTTOM_RIGHT, type: BMAP_NAVIGATION_CONTROL_ZOOM }),
          this.state.path.length > 0 && _react2.default.createElement(_reactBmap.Polyline, { path: this.state.path })
        )
      );
    }
  }]);
  return RouteMap;
}(_react2.default.Component), _class.defaultProps = {
  className: '',
  style: {},
  path: []
}, _class.propTypes = {
  className: _propTypes2.default.string,
  style: _propTypes2.default.object,
  path: _propTypes2.default.arrayOf(_propTypes2.default.number)
}, _temp);
exports.default = RouteMap;