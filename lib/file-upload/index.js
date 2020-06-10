'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

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

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _uploadPicture = require('./uploadPicture.js');

var _uploadPicture2 = _interopRequireDefault(_uploadPicture);

var _uploadAttachment = require('./uploadAttachment.js');

var _uploadAttachment2 = _interopRequireDefault(_uploadAttachment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * 文件上传组件
 * @description 文件上传组件
 * @export  FileUpload
 * @date    2017-09-28
 * @author  zbs
 */
var FileUpload = (_temp = _class = function (_React$Component) {
  (0, _inherits3.default)(FileUpload, _React$Component);

  function FileUpload() {
    (0, _classCallCheck3.default)(this, FileUpload);
    return (0, _possibleConstructorReturn3.default)(this, (FileUpload.__proto__ || (0, _getPrototypeOf2.default)(FileUpload)).apply(this, arguments));
  }

  (0, _createClass3.default)(FileUpload, [{
    key: 'render',
    value: function render() {
      var listType = this.props.listType;

      return listType === 'picture-card' ? _react2.default.createElement(_uploadPicture2.default, this.props) : _react2.default.createElement(_uploadAttachment2.default, this.props);
    }
  }]);
  return FileUpload;
}(_react2.default.Component), _class.propTypes = {
  listType: _propTypes2.default.oneOf(['picture-card', 'attachment'])
}, _class.defaultProps = {
  listType: 'picture-card'
}, _class.uploadingCount = 0, _temp);
exports.default = FileUpload;