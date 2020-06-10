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

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _counterAnimation = require('../counter-animation');

var _counterAnimation2 = _interopRequireDefault(_counterAnimation);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * 动态信息卡片组件
 * @description 卡片形式展示图标、标题、数量信息
 * @export  InfoCard
 * @date    2017-10-17
 * @author  zbs
 */
var InfoCard = function (_React$Component) {
  (0, _inherits3.default)(InfoCard, _React$Component);

  function InfoCard() {
    (0, _classCallCheck3.default)(this, InfoCard);
    return (0, _possibleConstructorReturn3.default)(this, (InfoCard.__proto__ || (0, _getPrototypeOf2.default)(InfoCard)).apply(this, arguments));
  }

  (0, _createClass3.default)(InfoCard, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          _props$prefixCls = _props.prefixCls,
          prefixCls = _props$prefixCls === undefined ? 'bis-info-card' : _props$prefixCls,
          className = _props.className;

      return _react2.default.createElement(
        'div',
        { style: this.props.style, className: (0, _classnames2.default)(prefixCls, className) },
        _react2.default.createElement(
          'div',
          { className: prefixCls + '-title' },
          this.props.title
        ),
        _react2.default.createElement(
          'div',
          { className: prefixCls + '-img' },
          _react2.default.createElement('img', { src: this.props.iconUrl })
        ),
        _react2.default.createElement(
          'div',
          { className: prefixCls + '-font' },
          _react2.default.createElement(_counterAnimation2.default, { end: this.props.number })
        )
      );
    }
  }]);
  return InfoCard;
}(_react2.default.Component);

exports.default = InfoCard;


InfoCard.propTypes = {
  className: _propTypes2.default.string,
  style: _propTypes2.default.object,
  title: _propTypes2.default.string,
  iconUrl: _propTypes2.default.string,
  number: _propTypes2.default.number
};