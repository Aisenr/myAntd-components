'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

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

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _numbersDynamicUp = require('../numbers-dynamic-up');

var _numbersDynamicUp2 = _interopRequireDefault(_numbersDynamicUp);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * 数字增加或减少动画
 * @description 数字增减时，会显示 +num/-num 的动画
 * @export  CounterAnimation
 * @date    2017-09-21
 * @author  zbs
 */
var CounterAnimation = function (_PureComponent) {
  (0, _inherits3.default)(CounterAnimation, _PureComponent);

  function CounterAnimation() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, CounterAnimation);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = CounterAnimation.__proto__ || (0, _getPrototypeOf2.default)(CounterAnimation)).call.apply(_ref, [this].concat(args))), _this), _this.state = { delta: 0, style: _this.startStyle }, _this.startStyle = { transition: '1s', position: 'absolute', top: '0', right: '-30px', fontSize: 'smaller', opacity: 1 }, _this.plusStyle = { transition: '1s', position: 'absolute', top: '-30px', right: '-30px', opacity: 0, fontSize: 'smaller' }, _this.minusStyle = { transition: '1s', position: 'absolute', top: '15px', right: '-30px', opacity: 0, fontSize: 'smaller' }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(CounterAnimation, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var _this2 = this;

      var delta = nextProps.delta || nextProps.end - this.props.end;
      if (delta === 0) {
        return;
      }
      this.setState({ delta: delta, style: delta > 0 ? this.plusStyle : this.minusStyle });
      this.timeout = setTimeout(function () {
        _this2.setState({ delta: 0, style: _this2.startStyle });
        _this2.timeout = null;
      }, 1000);
    }
  }, {
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps) {
      if (nextProps.end === this.props.end) {
        return false;
      }
      return true;
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      if (this.timeout) {
        clearInterval(this.timeout);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var delta = this.state.delta;
      if (!this.props.showDifference) {
        delta = 0;
      }
      return _react2.default.createElement(
        'span',
        { className: this.props.className, style: (0, _extends3.default)({ position: 'relative', display: 'inline-block' }, this.props.style) },
        _react2.default.createElement(
          'div',
          { style: this.state.style },
          delta === 0 ? '' : delta > 0 ? '+' + delta : delta
        ),
        _react2.default.createElement(_numbersDynamicUp2.default, { end: this.props.end, duration: this.props.duration })
      );
    }
  }]);
  return CounterAnimation;
}(_react.PureComponent);

exports.default = CounterAnimation;


CounterAnimation.defaultProps = {
  end: 0,
  duration: 1,
  className: '',
  style: null,
  showDifference: true
};

CounterAnimation.propTypes = {
  className: _propTypes2.default.string,
  style: _propTypes2.default.object,
  end: _propTypes2.default.number,
  duration: _propTypes2.default.number,
  showDifference: _propTypes2.default.bool
};