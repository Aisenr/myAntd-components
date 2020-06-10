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

var _select = require('antd/lib/select');

var _select2 = _interopRequireDefault(_select);

var _class, _temp2;

require('antd/lib/select/style');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Option = _select2.default.Option;

/**
 * 下拉选择器
 * @description 表单元素
 * @export  SelectItem
 * @date    2017-09-28
 * @author  zbs
 */
var SelectItem = (_temp2 = _class = function (_React$Component) {
  (0, _inherits3.default)(SelectItem, _React$Component);

  function SelectItem() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, SelectItem);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = SelectItem.__proto__ || (0, _getPrototypeOf2.default)(SelectItem)).call.apply(_ref, [this].concat(args))), _this), _this.handleChange = function (value) {
      _this.props.onChange(value);
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(SelectItem, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          className = _props.className,
          style = _props.style,
          items = _props.items;

      return _react2.default.createElement(
        'div',
        { className: className, style: style },
        _react2.default.createElement(
          _select2.default,
          (0, _extends3.default)({ placeholder: '\u8BF7\u9009\u62E9\u2026\u2026' }, this.props, { style: { width: '100%' }, onChange: this.handleChange }),
          items && items.map(function (item, index) {
            return _react2.default.createElement(
              Option,
              { key: item.key || index, value: item.value },
              item.text
            );
          })
        )
      );
    }
  }]);
  return SelectItem;
}(_react2.default.Component), _class.propTypes = {
  onChange: _propTypes2.default.func
}, _class.defaultProps = {
  onChange: function onChange() {}
}, _temp2);
exports.default = SelectItem;