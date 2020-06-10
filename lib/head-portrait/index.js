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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * 头像组件
 * @description 显示头像
 * @export  HeadPortrait
 * @date    2017-09-21
 * @author  zbs
 */
var HeadPortrait = function (_React$Component) {
  (0, _inherits3.default)(HeadPortrait, _React$Component);

  function HeadPortrait() {
    (0, _classCallCheck3.default)(this, HeadPortrait);
    return (0, _possibleConstructorReturn3.default)(this, (HeadPortrait.__proto__ || (0, _getPrototypeOf2.default)(HeadPortrait)).apply(this, arguments));
  }

  (0, _createClass3.default)(HeadPortrait, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          _props$prefixCls = _props.prefixCls,
          prefixCls = _props$prefixCls === undefined ? 'bis-head-portrait' : _props$prefixCls,
          className = _props.className;

      return _react2.default.createElement(
        'div',
        { className: (0, _classnames2.default)(prefixCls, className), style: this.props.style },
        _react2.default.createElement(
          'div',
          { className: prefixCls + 'img', style: { width: this.props.size, height: this.props.size, borderRadius: this.props.size && this.props.size / 2, overflow: 'hidden' } },
          _react2.default.createElement('img', { alt: '', src: this.props.imageUrl || this.props.defalutImg || '/images/index/default.png', style: { width: this.props.size, height: this.props.size } })
        )
      );
    }
  }]);
  return HeadPortrait;
}(_react2.default.Component);

exports.default = HeadPortrait;


HeadPortrait.defaultProps = {
  size: 120
};

HeadPortrait.propTypes = {
  className: _propTypes2.default.string,
  style: _propTypes2.default.object,
  size: _propTypes2.default.number,
  imageUrl: _propTypes2.default.string
};