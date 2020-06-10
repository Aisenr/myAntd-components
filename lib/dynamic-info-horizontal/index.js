'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

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

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _counterAnimation = require('../counter-animation');

var _counterAnimation2 = _interopRequireDefault(_counterAnimation);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * 横向动态信息组件
 * @description 横向展示图标、标题、数量信息
 * @export  DynamicInfoHorizontal
 * @date    2017-09-21
 * @author  zbs
 */
var DynamicInfoHorizontal = function (_React$Component) {
  (0, _inherits3.default)(DynamicInfoHorizontal, _React$Component);

  function DynamicInfoHorizontal() {
    (0, _classCallCheck3.default)(this, DynamicInfoHorizontal);
    return (0, _possibleConstructorReturn3.default)(this, (DynamicInfoHorizontal.__proto__ || (0, _getPrototypeOf2.default)(DynamicInfoHorizontal)).apply(this, arguments));
  }

  (0, _createClass3.default)(DynamicInfoHorizontal, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          _props$prefixCls = _props.prefixCls,
          prefixCls = _props$prefixCls === undefined ? 'bis-dynamic-info-horizontal' : _props$prefixCls,
          className = _props.className;

      return _react2.default.createElement(
        'div',
        { className: (0, _classnames2.default)(prefixCls, className), style: this.props.style },
        _react2.default.createElement(
          'div',
          { className: prefixCls + '-panel', onClick: function onClick(e) {
              _this2.props.onClick && _this2.props.onClick(e);
            }, style: { height: this.props.style && this.props.style.height, lineHeight: this.props.style && this.props.style.height } },
          _react2.default.createElement('img', { src: this.props.iconUrl, alt: '' }),
          _react2.default.createElement(
            'span',
            { className: prefixCls + '-title' },
            this.props.title,
            '\uFF1A'
          ),
          _react2.default.createElement(
            'span',
            null,
            _react2.default.createElement(
              'span',
              { className: prefixCls + '-panel-number' },
              _react2.default.createElement(_counterAnimation2.default, { delta: this.props.delta, end: this.props.number })
            ),
            _react2.default.createElement(
              'span',
              { className: prefixCls + '-panel-unit' },
              this.props.unit
            )
          )
        )
      );
    }
  }]);
  return DynamicInfoHorizontal;
}(_react2.default.Component);

exports.default = DynamicInfoHorizontal;


DynamicInfoHorizontal.defaultProps = {
  className: '',
  style: {},
  title: '',
  onClick: null,
  iconUrl: '',
  number: 0,
  delta: 0,
  unit: ''
};

DynamicInfoHorizontal.propTypes = {
  className: _propTypes2.default.string,
  style: _propTypes2.default.object,
  title: _propTypes2.default.string,
  onClick: _propTypes2.default.func,
  iconUrl: _propTypes2.default.string,
  number: _propTypes2.default.number,
  delta: _propTypes2.default.number,
  unit: _propTypes2.default.string
};