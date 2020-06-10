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

var _ellipsis = require('../ellipsis');

var _ellipsis2 = _interopRequireDefault(_ellipsis);

var _dateFormat = require('../date-format');

var _dateFormat2 = _interopRequireDefault(_dateFormat);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * 消息组件
 * @description 显示消息标题、消息体、日期信息
 * @export  MessageItem
 * @date    2017-09-21
 * @author  zbs
 */
var MessageItem = function (_React$Component) {
  (0, _inherits3.default)(MessageItem, _React$Component);

  function MessageItem() {
    (0, _classCallCheck3.default)(this, MessageItem);
    return (0, _possibleConstructorReturn3.default)(this, (MessageItem.__proto__ || (0, _getPrototypeOf2.default)(MessageItem)).apply(this, arguments));
  }

  (0, _createClass3.default)(MessageItem, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          _props$prefixCls = _props.prefixCls,
          prefixCls = _props$prefixCls === undefined ? 'bis-message-item' : _props$prefixCls,
          className = _props.className;

      return _react2.default.createElement(
        'div',
        { style: this.props.style, className: (0, _classnames2.default)(prefixCls, className) },
        _react2.default.createElement(
          'div',
          { className: prefixCls + '-outer' },
          _react2.default.createElement(
            'div',
            { className: prefixCls + '-title' },
            this.props.title
          ),
          _react2.default.createElement(
            'div',
            { className: prefixCls + '-below' },
            _react2.default.createElement(
              'span',
              { className: prefixCls + '-content' },
              _react2.default.createElement(_ellipsis2.default, { value: this.props.content })
            ),
            _react2.default.createElement(
              'span',
              { className: prefixCls + '-time' },
              _react2.default.createElement(_dateFormat2.default, { value: this.props.time, format: 'YYYY-MM-DD HH:mm' })
            )
          )
        )
      );
    }
  }]);
  return MessageItem;
}(_react2.default.Component);

exports.default = MessageItem;


MessageItem.propTypes = {
  className: _propTypes2.default.string,
  style: _propTypes2.default.object,
  title: _propTypes2.default.string,
  content: _propTypes2.default.string,
  time: _propTypes2.default.number
};