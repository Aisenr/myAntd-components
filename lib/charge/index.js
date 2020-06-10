'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _inputNumber = require('antd/lib/input-number');

var _inputNumber2 = _interopRequireDefault(_inputNumber);

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

var _radio = require('antd/lib/radio');

var _radio2 = _interopRequireDefault(_radio);

require('antd/lib/input-number/style');

require('antd/lib/radio/style');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var RadioGroup = _radio2.default.Group;

var Charge = function (_React$Component) {
  (0, _inherits3.default)(Charge, _React$Component);

  function Charge(props) {
    (0, _classCallCheck3.default)(this, Charge);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Charge.__proto__ || (0, _getPrototypeOf2.default)(Charge)).call(this, props));

    _this.onChangeChargeStatus = function (event) {
      _this.setState({
        chargeStatus: event.target.value,
        disabled: event.target.value === 'free'
      });
      if (event.target.value === 'free') {
        _this.props.onChange(null);
      } else {
        _this.props.onChange(_this.state.amount);
      }
    };

    _this.chargeOnchange = function (value) {
      _this.props.onChange(value);
      _this.setState({
        amount: value
      });
    };

    var moneyStatus = props.restrict && (props.value == 0 || props.value === undefined);
    _this.state = {
      disabled: moneyStatus,
      amount: props.value || props.defaultValue,
      chargeStatus: moneyStatus ? 'free' : 'charge'
    };
    return _this;
  }

  (0, _createClass3.default)(Charge, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          _props$prefixCls = _props.prefixCls,
          prefixCls = _props$prefixCls === undefined ? 'bis-charge' : _props$prefixCls,
          className = _props.className,
          restrict = _props.restrict;

      return _react2.default.createElement(
        'span',
        { className: (0, _classnames2.default)(prefixCls, className), style: this.props.style },
        restrict && _react2.default.createElement(
          RadioGroup,
          { onChange: this.onChangeChargeStatus, value: this.state.chargeStatus },
          _react2.default.createElement(
            _radio2.default,
            { value: 'free' },
            '\u514D\u8D39'
          ),
          _react2.default.createElement(
            _radio2.default,
            { value: 'charge' },
            '\u6536\u8D39'
          )
        ),
        _react2.default.createElement(_inputNumber2.default, (0, _extends3.default)({}, this.props, {
          min: this.props.min || 0,
          step: 0.1,
          value: this.state.amount,
          disabled: this.state.disabled,
          onChange: this.chargeOnchange
        })),
        _react2.default.createElement(
          'span',
          null,
          '\u5143/\u6B21'
        )
      );
    }
  }]);
  return Charge;
}(_react2.default.Component);

exports.default = Charge;


Charge.defaultProps = {};

Charge.propTypes = {
  className: _propTypes2.default.string,
  style: _propTypes2.default.object,
  amount: _propTypes2.default.number
};