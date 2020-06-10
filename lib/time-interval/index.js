'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _timePicker = require('antd/lib/time-picker');

var _timePicker2 = _interopRequireDefault(_timePicker);

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

var _class, _temp, _initialiseProps;

require('antd/lib/time-picker/style');

require('antd/lib/radio/style');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var RadioGroup = _radio2.default.Group;

var TimeInterval = (_temp = _class = function (_React$Component) {
  (0, _inherits3.default)(TimeInterval, _React$Component);

  function TimeInterval(props) {
    (0, _classCallCheck3.default)(this, TimeInterval);

    var _this = (0, _possibleConstructorReturn3.default)(this, (TimeInterval.__proto__ || (0, _getPrototypeOf2.default)(TimeInterval)).call(this, props));

    _initialiseProps.call(_this);

    var restrict = props.restrict,
        value = props.value,
        defaultValue = props.defaultValue;

    var newDisabled = restrict && value[0] == null && value[1] == null;
    var startTime = value[0] ? (0, _moment2.default)(value[0]) : (0, _moment2.default)(defaultValue[0]) ? (0, _moment2.default)(defaultValue[0]) : (0, _moment2.default)('00:00', 'HH:mm');
    var endTime = value[1] ? (0, _moment2.default)(value[1]) : (0, _moment2.default)(defaultValue[1]) ? (0, _moment2.default)(defaultValue[1]) : (0, _moment2.default)('00:00', 'HH:mm');
    _this.state = {
      disabled: newDisabled,
      startTime: startTime,
      endTime: endTime,
      chooseValue: newDisabled ? 1 : 2
    };
    return _this;
  }

  (0, _createClass3.default)(TimeInterval, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var restrict = nextProps.restrict,
          value = nextProps.value,
          defaultValue = nextProps.defaultValue;

      var newDisabled = restrict && value[0] == null && value[1] == null;
      var startTime = value[0] ? (0, _moment2.default)(value[0]) : (0, _moment2.default)(defaultValue[0]) ? (0, _moment2.default)(defaultValue[0]) : (0, _moment2.default)('00:00', 'HH:mm');
      var endTime = value[1] ? (0, _moment2.default)(value[1]) : (0, _moment2.default)(defaultValue[1]) ? (0, _moment2.default)(defaultValue[1]) : (0, _moment2.default)('00:00', 'HH:mm');
      this.state = {
        disabled: newDisabled,
        startTime: startTime,
        endTime: endTime,
        chooseValue: newDisabled ? 1 : 2
      };
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          _props$prefixCls = _props.prefixCls,
          prefixCls = _props$prefixCls === undefined ? 'bis-time-interval' : _props$prefixCls,
          className = _props.className,
          restrict = _props.restrict,
          style = _props.style;
      var _state = this.state,
          chooseValue = _state.chooseValue,
          disabled = _state.disabled,
          startTime = _state.startTime,
          endTime = _state.endTime;

      return _react2.default.createElement(
        'span',
        { className: (0, _classnames2.default)(prefixCls, className), style: style },
        restrict && _react2.default.createElement(
          RadioGroup,
          { onChange: this.onChangeTimeState, defaultValue: 1, value: chooseValue },
          _react2.default.createElement(
            _radio2.default,
            { value: 1 },
            '\u5168\u5929'
          ),
          _react2.default.createElement(
            _radio2.default,
            { value: 2 },
            '\u9650\u65F6'
          )
        ),
        _react2.default.createElement(_timePicker2.default, { disabled: disabled, onChange: this.onChangeStart, value: startTime, format: 'HH:mm' }),
        ' \u81F3 ',
        _react2.default.createElement(_timePicker2.default, { disabled: disabled, onChange: this.onChangeEnd, value: endTime, format: 'HH:mm' })
      );
    }
  }]);
  return TimeInterval;
}(_react2.default.Component), _class.propTypes = {
  value: _propTypes2.default.arrayOf(_propTypes2.default.number),
  defaultValue: _propTypes2.default.arrayOf(_propTypes2.default.number),
  restrict: _propTypes2.default.bool,
  onChange: _propTypes2.default.func
}, _class.defaultProps = {
  value: [],
  defaultValue: [],
  restrict: false,
  onChange: function onChange() {}
}, _initialiseProps = function _initialiseProps() {
  var _this2 = this;

  this.onChangeStart = function (time) {
    var onChange = _this2.props.onChange;
    var endTime = _this2.state.endTime;

    var value = [time.valueOf(), endTime.valueOf()];
    onChange(value);
  };

  this.onChangeEnd = function (time) {
    var onChange = _this2.props.onChange;
    var startTime = _this2.state.startTime;

    var value = [startTime.valueOf(), time.valueOf()];
    onChange(value);
  };

  this.onChangeTimeState = function (e) {
    var _props2 = _this2.props,
        defaultValue = _props2.defaultValue,
        onChange = _props2.onChange;
    var _state2 = _this2.state,
        startTime = _state2.startTime,
        endTime = _state2.endTime;

    if (e.target.value === 2) {
      var start = startTime || (0, _moment2.default)(defaultValue[0]) || (0, _moment2.default)('00:00', 'HH:mm');
      var end = endTime || (0, _moment2.default)(defaultValue[1]) || (0, _moment2.default)('00:00', 'HH:mm');
      var value = [start.valueOf(), end.valueOf()];
      onChange(value);
    } else {
      onChange([null, null]);
    }
  };
}, _temp);
exports.default = TimeInterval;