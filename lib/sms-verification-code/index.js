'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _button = require('antd/lib/button');

var _button2 = _interopRequireDefault(_button);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

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

require('antd/lib/button/style');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _inputItem = require('../input-item');

var _inputItem2 = _interopRequireDefault(_inputItem);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SmsVerificationCode = (_temp = _class = function (_React$Component) {
  (0, _inherits3.default)(SmsVerificationCode, _React$Component);

  function SmsVerificationCode(props) {
    (0, _classCallCheck3.default)(this, SmsVerificationCode);

    var _this = (0, _possibleConstructorReturn3.default)(this, (SmsVerificationCode.__proto__ || (0, _getPrototypeOf2.default)(SmsVerificationCode)).call(this, props));

    _this.handleClick = function () {
      var re = _this.props.onClick();
      if (typeof re === 'boolean') {
        _this.countdown();
      } else {
        re.then(function () {
          _this.countdown();
        }).catch(function () {});
      }
    };

    _this.countdown = function () {
      _this.setState({
        showSecond: true,
        seconds: 60,
        sCodeBtnDisabled: true
      });
      var seconds = _this.state.seconds;
      _this.interval = window.setInterval(function () {
        seconds -= 1;
        _this.setState({
          seconds: seconds
        });
        if (seconds <= 0) {
          _this.setState({
            seconds: 60,
            sCodeBtnDisabled: false,
            showSecond: false
          });
          window.clearInterval(_this.interval);
        }
      }, 1000);
    };

    _this.state = {
      seconds: props.seconds,
      showSecond: false,
      sCodeBtnDisabled: false
    };
    return _this;
  }

  (0, _createClass3.default)(SmsVerificationCode, [{
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      window.clearInterval(this.interval);
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          _props$prefixCla = _props.prefixCla,
          prefixCla = _props$prefixCla === undefined ? 'bis-sMS-verification-code' : _props$prefixCla,
          className = _props.className,
          style = _props.style,
          onClick = _props.onClick,
          rest = (0, _objectWithoutProperties3.default)(_props, ['prefixCla', 'className', 'style', 'onClick']);

      return _react2.default.createElement(
        'div',
        { className: (0, _classnames2.default)(prefixCla, className), style: style },
        _react2.default.createElement(_inputItem2.default, (0, _extends3.default)({ className: prefixCla + '-input' }, rest)),
        _react2.default.createElement(
          _button2.default,
          { className: prefixCla + '-btn', onClick: this.handleClick, disabled: this.state.sCodeBtnDisabled },
          this.state.sCodeBtnDisabled ? '重新获取' : '获取验证码',
          this.state.showSecond && '  (' + this.state.seconds + '\u79D2)'
        )
      );
    }
  }]);
  return SmsVerificationCode;
}(_react2.default.Component), _class.propTypes = {
  onClick: _propTypes2.default.func,
  seconds: _propTypes2.default.number
}, _class.defaultProps = {
  onClick: function onClick() {},

  seconds: 60
}, _temp);
exports.default = SmsVerificationCode;