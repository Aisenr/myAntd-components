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

var _class, _temp;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactLzEditor = require('react-lz-editor');

var _reactLzEditor2 = _interopRequireDefault(_reactLzEditor);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var RichTextEditor = (_temp = _class = function (_React$Component) {
  (0, _inherits3.default)(RichTextEditor, _React$Component);

  function RichTextEditor(props) {
    (0, _classCallCheck3.default)(this, RichTextEditor);

    var _this = (0, _possibleConstructorReturn3.default)(this, (RichTextEditor.__proto__ || (0, _getPrototypeOf2.default)(RichTextEditor)).call(this, props));

    _this.onChange = function (info) {
      var currFileList = info.fileList;
      var currFileListtemp = currFileList.filter(function (f) {
        return !f.length;
      });
      var currFileListtemp1 = currFileListtemp.map(function (file) {
        if (file.response) {
          // 组件会将 file.url 作为链接进行展示
          file.url = file.response.fileUrl;
        }
        if (!file.length) {
          return file;
        }
      });

      _this.setState({ responseList: currFileListtemp1 });
    };

    _this.cbReceiver = function (content) {
      var onChange = _this.props.onChange;

      if (onChange) {
        onChange(_this.isContentEmpty(content) ? '' : content);
      }
    };

    _this.state = {
      responseList: []
    };
    return _this;
  }

  (0, _createClass3.default)(RichTextEditor, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps() {
      this.setState({ responseList: [] });
    }
  }, {
    key: 'isContentEmpty',
    value: function isContentEmpty(content) {
      var ele = document.createElement('div');
      ele.innerHTML = content;
      return ele.innerText.trim() === '';
    }
  }, {
    key: 'render',
    value: function render() {
      var upLoadProps = {
        action: this.props.action,
        onChange: this.onChange,
        fileList: this.state.responseList
      };
      return _react2.default.createElement(_reactLzEditor2.default, (0, _extends3.default)({}, this.props, {
        color: false,
        importContent: this.props.value,
        cbReceiver: this.cbReceiver,
        uploadProps: upLoadProps,
        video: false,
        audio: false
      }));
    }
  }]);
  return RichTextEditor;
}(_react2.default.Component), _class.propTypes = {
  action: _propTypes2.default.string
}, _class.defaultProps = {
  action: ''
}, _temp);
exports.default = RichTextEditor;