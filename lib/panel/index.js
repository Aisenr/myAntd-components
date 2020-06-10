'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _spin = require('antd/lib/spin');

var _spin2 = _interopRequireDefault(_spin);

var _card = require('antd/lib/card');

var _card2 = _interopRequireDefault(_card);

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

require('antd/lib/spin/style');

require('antd/lib/card/style');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * 局部容器组件
 * @description 作为某一局部单元的容器
 * @export  Panel
 * @date    2017-09-28
 * @author  zbs
 */
var Panel = (_temp = _class = function (_Component) {
  (0, _inherits3.default)(Panel, _Component);

  function Panel() {
    (0, _classCallCheck3.default)(this, Panel);
    return (0, _possibleConstructorReturn3.default)(this, (Panel.__proto__ || (0, _getPrototypeOf2.default)(Panel)).apply(this, arguments));
  }

  (0, _createClass3.default)(Panel, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          _props$prefixCls = _props.prefixCls,
          prefixCls = _props$prefixCls === undefined ? 'bis-panel' : _props$prefixCls,
          className = _props.className,
          style = _props.style,
          loading = _props.loading,
          bodyStyle = _props.bodyStyle,
          title = _props.title,
          extra = _props.extra,
          cardStyle = _props.cardStyle,
          children = _props.children;

      return _react2.default.createElement(
        'div',
        { className: (0, _classnames2.default)(prefixCls, className), style: style },
        _react2.default.createElement(
          _spin2.default,
          { spinning: loading },
          _react2.default.createElement(
            _card2.default,
            {
              bodyStyle: bodyStyle,
              title: title,
              extra: extra,
              style: cardStyle
            },
            children
          )
        )
      );
    }
  }]);
  return Panel;
}(_react.Component), _class.propTypes = {
  className: _propTypes2.default.string,
  style: _propTypes2.default.object,
  title: _propTypes2.default.string,
  children: _propTypes2.default.node,
  extra: _propTypes2.default.node,
  loading: _propTypes2.default.bool,
  bodyStyle: _propTypes2.default.object,
  cardStyle: _propTypes2.default.object
}, _class.defaultProps = {
  bodyStyle: {},
  loading: false
}, _temp);
exports.default = Panel;