'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _input = require('antd/lib/input');

var _input2 = _interopRequireDefault(_input);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

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

require('antd/lib/input/style');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * 密码输入框组件
 * @description 密码输入框
 * @export  PasswordInputBox
 * @date    2017-09-28
 * @author  zbs
 */

var sizeConfig = {
  large: '40px',
  default: '32px',
  small: '24px'
};

var PasswordInputBox = (_temp = _class = function (_React$Component) {
  (0, _inherits3.default)(PasswordInputBox, _React$Component);

  function PasswordInputBox(props) {
    (0, _classCallCheck3.default)(this, PasswordInputBox);

    var _this = (0, _possibleConstructorReturn3.default)(this, (PasswordInputBox.__proto__ || (0, _getPrototypeOf2.default)(PasswordInputBox)).call(this, props));

    _this.onChangePassword = function (e) {
      var pwd = e.target.value;
      var score = _this.calculateScores(pwd);
      if (score >= 60) {
        _this.state.status = 'strong';
      } else if (score >= 25) {
        _this.state.status = 'medium';
      } else {
        _this.state.status = 'weak';
      }
      _this.props.onChange(e);
    };

    _this.calculateScores = function (value) {
      var nowScores = 0; // 密码得分
      var totleLength = value.length; // 总长度

      /*
       * 密码长度
       */
      if (totleLength <= 4) {
        nowScores += 5;
      } else if (totleLength > 4 && totleLength <= 7) {
        nowScores += 10;
      } else {
        nowScores += 25;
      }

      /*
       * 字母
       */
      var isTwoKinds = false;
      if (value.match(/[A-Z]/) != null && value.match(/[a-z]/) != null) {
        isTwoKinds = true;
        nowScores += 20;
      } else if (value.match(/[A-Z]/) != null || value.match(/[a-z]/) != null) {
        nowScores += 10;
      }
      var alphabetLength = value.replace(/[^a-zA-Z]/g, '').length; // 将字母剔除

      /*
       * 数字
       */
      var numLength = value.replace(/\D/g, '').length; // 剔除数字
      if (numLength > 0 && numLength < 3) {
        nowScores += 10;
      } else if (numLength >= 3) {
        nowScores += 20;
      }

      // 符号
      var symbol = totleLength - alphabetLength - numLength; // 符号长度
      if (value != null && symbol === 1) {
        nowScores += 10;
      } else if (value != null && symbol > 1) {
        nowScores += 25;
      }

      // 奖励
      if (isTwoKinds && numLength > 0 && alphabetLength > 0 && symbol > 0) {
        nowScores += 5;
      } else if (numLength > 0 && alphabetLength > 0 && symbol > 0) {
        nowScores += 3;
      } else if (numLength > 0 && alphabetLength > 0) {
        nowScores += 2;
      }

      return nowScores;
    };

    _this.state = {
      value: '',
      status: ''
    };
    return _this;
  }

  (0, _createClass3.default)(PasswordInputBox, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          _props$prefixCls = _props.prefixCls,
          prefixCls = _props$prefixCls === undefined ? 'bis-password-input-box' : _props$prefixCls,
          className = _props.className,
          size = _props.size;

      return _react2.default.createElement(
        'div',
        { style: this.props.style, className: (0, _classnames2.default)(prefixCls, className) },
        _react2.default.createElement(_input2.default, (0, _extends3.default)({
          className: prefixCls + '-input-' + size,
          type: 'password',
          placeholder: this.props.placeholder
        }, this.props, {
          onChange: this.onChangePassword
        })),
        _react2.default.createElement(
          'div',
          { className: (0, _classnames2.default)(prefixCls + '-status', this.state.status === 'weak' ? prefixCls + '-password' : null), style: { height: sizeConfig[size], lineHeight: sizeConfig[size], width: sizeConfig[size] } },
          '\u5F31'
        ),
        _react2.default.createElement(
          'div',
          { className: (0, _classnames2.default)(prefixCls + '-status', this.state.status === 'medium' ? prefixCls + '-password' : null), style: { height: sizeConfig[size], lineHeight: sizeConfig[size], width: sizeConfig[size] } },
          '\u4E2D'
        ),
        _react2.default.createElement(
          'div',
          { className: (0, _classnames2.default)(prefixCls + '-status', this.state.status === 'strong' ? prefixCls + '-password' : null), style: { height: sizeConfig[size], lineHeight: sizeConfig[size], width: sizeConfig[size] } },
          '\u5F3A'
        )
      );
    }
  }]);
  return PasswordInputBox;
}(_react2.default.Component), _class.propTypes = {
  placeholder: _propTypes2.default.string,
  onChange: _propTypes2.default.func
}, _class.defaultProps = {
  placeholder: '字母、数字和符号',
  size: 'default',
  onChange: function onChange() {}
}, _temp);
exports.default = PasswordInputBox;