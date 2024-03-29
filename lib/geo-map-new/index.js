'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

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

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _FlatMap = require('./FlatMap');

var _FlatMap2 = _interopRequireDefault(_FlatMap);

var _ModalMap = require('./ModalMap');

var _ModalMap2 = _interopRequireDefault(_ModalMap);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var GeoMapNew = function (_React$PureComponent) {
  (0, _inherits3.default)(GeoMapNew, _React$PureComponent);

  function GeoMapNew() {
    (0, _classCallCheck3.default)(this, GeoMapNew);
    return (0, _possibleConstructorReturn3.default)(this, (GeoMapNew.__proto__ || (0, _getPrototypeOf2.default)(GeoMapNew)).apply(this, arguments));
  }

  (0, _createClass3.default)(GeoMapNew, [{
    key: 'render',
    value: function render() {
      var display = this.props.display;

      return display === 'modal' ? _react2.default.createElement(_ModalMap2.default, this.props) : _react2.default.createElement(_FlatMap2.default, this.props);
    }
  }]);
  return GeoMapNew;
}(_react2.default.PureComponent);

exports.default = GeoMapNew;