'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

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

require('antd/lib/card/style');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * 局部容器组件
 * @description 作为某一局部单元的容器
 * @export  HomePanel
 * @date    2017-09-28
 * @author  zbs
 */
var HomePanel = function (_Component) {
  (0, _inherits3.default)(HomePanel, _Component);

  function HomePanel() {
    (0, _classCallCheck3.default)(this, HomePanel);
    return (0, _possibleConstructorReturn3.default)(this, (HomePanel.__proto__ || (0, _getPrototypeOf2.default)(HomePanel)).apply(this, arguments));
  }

  (0, _createClass3.default)(HomePanel, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { className: this.props.className, style: this.props.style },
        _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(
            'h4',
            null,
            this.props.title
          )
        ),
        _react2.default.createElement('div', { style: { height: '2px', background: '#bdbdbd', marginTop: '3px', marginBottom: '20px' } }),
        _react2.default.createElement(
          _card2.default,
          {
            bodyStyle: { padding: 10 },
            hoverable: true,
            bordered: false
          },
          this.props.children
        )
      );
    }
  }]);
  return HomePanel;
}(_react.Component);

exports.default = HomePanel;


HomePanel.propTypes = {
  className: _propTypes2.default.string,
  style: _propTypes2.default.object,
  title: _propTypes2.default.string,
  children: _propTypes2.default.element
};