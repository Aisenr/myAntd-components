'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _upload = require('antd/lib/upload');

var _upload2 = _interopRequireDefault(_upload);

var _button = require('antd/lib/button');

var _button2 = _interopRequireDefault(_button);

var _icon = require('antd/lib/icon');

var _icon2 = _interopRequireDefault(_icon);

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

require('antd/lib/upload/style');

require('antd/lib/button/style');

require('antd/lib/icon/style');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * 文件上传组件(按钮形式)
 * @description 文件上传组件
 * @export  UploadButton
 * @date    2017-11-03
 * @author  zbs
 */

var UploadButton = function (_React$Component) {
  (0, _inherits3.default)(UploadButton, _React$Component);

  function UploadButton() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, UploadButton);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = UploadButton.__proto__ || (0, _getPrototypeOf2.default)(UploadButton)).call.apply(_ref, [this].concat(args))), _this), _this.handleChange = function (info) {
      _this.props.response(info.file);
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(UploadButton, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        _upload2.default,
        { action: this.props.action, showUploadList: false, onChange: this.handleChange },
        _react2.default.createElement(
          _button2.default,
          { loading: this.props.loading },
          _react2.default.createElement(_icon2.default, { type: 'upload' }),
          ' ',
          this.props.title
        )
      );
    }
  }]);
  return UploadButton;
}(_react2.default.Component);

exports.default = UploadButton;


UploadButton.defaultProps = {
  action: '',
  loading: false,
  title: ''
};

UploadButton.propTypes = {
  response: _propTypes2.default.func,
  action: _propTypes2.default.string,
  loading: _propTypes2.default.bool,
  title: _propTypes2.default.string
};