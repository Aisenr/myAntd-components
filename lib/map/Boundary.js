'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

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

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var itemStyleConvertMap = {
  color: 'fillColor',
  borderColor: 'strokeColor',
  borderWidth: 'strokeWeight',
  borderType: 'strokeStyle'
};

var Boundary = (_temp = _class = function (_React$PureComponent) {
  (0, _inherits3.default)(Boundary, _React$PureComponent);

  function Boundary() {
    (0, _classCallCheck3.default)(this, Boundary);
    return (0, _possibleConstructorReturn3.default)(this, (Boundary.__proto__ || (0, _getPrototypeOf2.default)(Boundary)).apply(this, arguments));
  }

  (0, _createClass3.default)(Boundary, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      setTimeout(function () {
        _this2.map = _this2.props.map.map;
        _this2.drawBoundary(_this2.props.name);
      }, 0);
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps) {
      var _this3 = this;

      if (this.props.name !== prevProps.name) {
        if (this.polygons) {
          this.polygons.forEach(function (polygon) {
            return _this3.map.removeOverlay(polygon);
          });
        }
        this.drawBoundary(this.props.name);
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      var _this4 = this;

      if (this.polygons) {
        this.polygons.forEach(function (polygon) {
          return _this4.map.removeOverlay(polygon);
        });
        this.polygons = null;
        this.map = null;
      }
    }
  }, {
    key: 'getPolygonOption',
    value: function getPolygonOption() {
      var _this5 = this;

      var option = { enableClicking: false };
      (0, _keys2.default)(itemStyleConvertMap).forEach(function (key) {
        if (_this5.props.itemStyle[key]) {
          option[itemStyleConvertMap[key]] = _this5.props.itemStyle[key];
        }
      });
      return option;
    }
  }, {
    key: 'drawBoundary',
    value: function drawBoundary(name) {
      var _this6 = this;

      if (!name) {
        return;
      }

      new BMap.Boundary().get(name, function (_ref) {
        var boundaries = _ref.boundaries;

        if (_this6.map && _this6.props.name === name && boundaries.length > 0) {
          var polygonOption = _this6.getPolygonOption();
          _this6.polygons = boundaries.map(function (boundary) {
            return new BMap.Polygon(boundary, polygonOption);
          });
          _this6.polygons.forEach(function (polygon) {
            return _this6.map.addOverlay(polygon);
          });
        }
      });
    }
  }, {
    key: 'render',
    value: function render() {
      return null;
    }
  }]);
  return Boundary;
}(_react2.default.PureComponent), _class.propTypes = {
  name: _propTypes2.default.string.isRequired,
  itemStyle: _propTypes2.default.shape({
    color: _propTypes2.default.string,
    borderColor: _propTypes2.default.string,
    borderWidth: _propTypes2.default.number,
    borderType: _propTypes2.default.oneOf(['solid', 'dashed'])
  })
}, _class.defaultProps = {
  itemStyle: {
    color: '#00000000'
  }
}, _temp);
exports.default = Boundary;