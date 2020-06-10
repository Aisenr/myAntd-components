'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

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

var _input = require('antd/lib/input');

var _input2 = _interopRequireDefault(_input);

require('antd/lib/input/style');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Search = _input2.default.Search;

/**
 * 搜索输入框组件
 * @description 搜索输入框
 * @export  SearchInput
 * @date    2017-09-21
 * @author  zbs
 */

var SearchInput = function (_React$Component) {
  (0, _inherits3.default)(SearchInput, _React$Component);

  function SearchInput() {
    (0, _classCallCheck3.default)(this, SearchInput);
    return (0, _possibleConstructorReturn3.default)(this, (SearchInput.__proto__ || (0, _getPrototypeOf2.default)(SearchInput)).apply(this, arguments));
  }

  (0, _createClass3.default)(SearchInput, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { style: this.props.style, className: this.props.className },
        _react2.default.createElement(Search, (0, _extends3.default)({}, this.props, { style: { width: '100%' } }))
      );
    }
  }]);
  return SearchInput;
}(_react2.default.Component);

exports.default = SearchInput;


SearchInput.propTypes = {
  className: _propTypes2.default.string,
  style: _propTypes2.default.object
};