'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _card = require('antd/lib/card');

var _card2 = _interopRequireDefault(_card);

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

require('antd/lib/card/style');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * 容器组件
 * @description 作为其他业务组件的容器组件，可放置子组件
 * @export  Container
 * @date    2017-09-21
 * @author  zbs
 */
var HomeContainer = function (_Component) {
  (0, _inherits3.default)(HomeContainer, _Component);

  function HomeContainer() {
    (0, _classCallCheck3.default)(this, HomeContainer);
    return (0, _possibleConstructorReturn3.default)(this, (HomeContainer.__proto__ || (0, _getPrototypeOf2.default)(HomeContainer)).apply(this, arguments));
  }

  (0, _createClass3.default)(HomeContainer, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          className = _props.className,
          style = _props.style,
          title = _props.title,
          _props$bodyStyle = _props.bodyStyle,
          bodyStyle = _props$bodyStyle === undefined ? {} : _props$bodyStyle,
          children = _props.children;

      return _react2.default.createElement(
        'div',
        { className: className, style: style },
        _react2.default.createElement(
          _card2.default,
          {
            title: title,
            bodyStyle: (0, _extends3.default)({ padding: 10 }, bodyStyle)
          },
          children
        )
      );
    }
  }]);
  return HomeContainer;
}(_react.Component);

exports.default = HomeContainer;


HomeContainer.propTypes = {
  className: _propTypes2.default.string,
  style: _propTypes2.default.object,
  title: _propTypes2.default.string,
  children: _propTypes2.default.node
};