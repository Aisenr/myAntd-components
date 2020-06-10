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

var _class, _temp;

require('antd/lib/card/style');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * 整体详情组件
 * @description 包含轮播、key-value详情与介绍信息
 * @export  OverallDetails
 * @date    2017-09-21
 * @author  zbs
 */
var OverallDetails = (_temp = _class = function (_React$Component) {
  (0, _inherits3.default)(OverallDetails, _React$Component);

  function OverallDetails() {
    (0, _classCallCheck3.default)(this, OverallDetails);
    return (0, _possibleConstructorReturn3.default)(this, (OverallDetails.__proto__ || (0, _getPrototypeOf2.default)(OverallDetails)).apply(this, arguments));
  }

  (0, _createClass3.default)(OverallDetails, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          _props$prefixCls = _props.prefixCls,
          prefixCls = _props$prefixCls === undefined ? 'bis-overall-details' : _props$prefixCls,
          className = _props.className;

      return _react2.default.createElement(
        _card2.default,
        (0, _extends3.default)({}, this.props, {
          className: (0, _classnames2.default)(prefixCls, className)
        }),
        _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(
            'div',
            { className: prefixCls + '-childrenOne' },
            this.props.children[0]
          ),
          _react2.default.createElement(
            'div',
            { className: prefixCls + '-childrenTwo' },
            this.props.children[1]
          )
        ),
        _react2.default.createElement(
          'div',
          { className: prefixCls + '-introductionContainer' },
          (this.props.introductionTitle || this.props.introduction) && _react2.default.createElement(
            'div',
            null,
            _react2.default.createElement('div', { className: prefixCls + '-space' }),
            _react2.default.createElement(
              'div',
              { className: prefixCls + '-introductionTitle' },
              this.props.introductionTitle
            ),
            _react2.default.createElement(
              'div',
              { className: prefixCls + '-introduction' },
              this.props.introduction
            )
          )
        )
      );
    }
  }]);
  return OverallDetails;
}(_react2.default.Component), _class.propTypes = {
  style: _propTypes2.default.object,
  introduction: _propTypes2.default.string,
  children: _propTypes2.default.array,
  introductionTitle: _propTypes2.default.string,
  title: _propTypes2.default.string
}, _class.defaultProps = {
  style: { margin: '20px' },
  introductionTitle: '',
  introduction: '',
  children: [],
  title: ''
}, _temp);
exports.default = OverallDetails;