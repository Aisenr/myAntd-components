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

var _reactCountup = require('react-countup');

var _reactCountup2 = _interopRequireDefault(_reactCountup);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * 数字滚动增加组件
 * @description 在数字初始化，或者变动时，伴随滚动生成效果
 * @export  NumbersDynamicUp
 * @date    2017-09-21
 * @author  zbs
 */
var NumbersDynamicUp = function (_PureComponent) {
  (0, _inherits3.default)(NumbersDynamicUp, _PureComponent);

  function NumbersDynamicUp(props) {
    (0, _classCallCheck3.default)(this, NumbersDynamicUp);

    var _this = (0, _possibleConstructorReturn3.default)(this, (NumbersDynamicUp.__proto__ || (0, _getPrototypeOf2.default)(NumbersDynamicUp)).call(this, props));

    _this.state = { start: 0 };
    return _this;
  }

  (0, _createClass3.default)(NumbersDynamicUp, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      this.setState({ start: this.props.end });
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(_reactCountup2.default, { className: this.props.className, start: this.state.start, end: this.props.end, duration: this.props.duration, useGrouping: true, separator: ',' });
    }
  }]);
  return NumbersDynamicUp;
}(_react.PureComponent);

NumbersDynamicUp.defaultProps = {
  end: 0,
  duration: 0.5
};

NumbersDynamicUp.propTypes = {
  className: _propTypes2.default.string,
  end: _propTypes2.default.number,
  duration: _propTypes2.default.number
};

exports.default = NumbersDynamicUp;