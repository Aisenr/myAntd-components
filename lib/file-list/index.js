'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

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

var _class, _temp;

require('antd/lib/icon/style');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _isomorphicFetch = require('isomorphic-fetch');

var _isomorphicFetch2 = _interopRequireDefault(_isomorphicFetch);

var _inputItem = require('../input-item');

var _inputItem2 = _interopRequireDefault(_inputItem);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * 文件列表展示
 * @description 文件列表展示
 * @export  FileUpload
 * @date    2018-03-27
 * @author  zbs
 */
var FileList = (_temp = _class = function (_React$Component) {
  (0, _inherits3.default)(FileList, _React$Component);

  function FileList(props) {
    (0, _classCallCheck3.default)(this, FileList);

    var _this = (0, _possibleConstructorReturn3.default)(this, (FileList.__proto__ || (0, _getPrototypeOf2.default)(FileList)).call(this, props));

    var fileList = props.fileList;

    _this.state = {
      fileList: fileList
    };
    return _this;
  }

  (0, _createClass3.default)(FileList, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          _props$prefixCls = _props.prefixCls,
          prefixCls = _props$prefixCls === undefined ? 'bis-file-list' : _props$prefixCls,
          className = _props.className,
          style = _props.style,
          fileList = _props.fileList;

      return _react2.default.createElement(
        'div',
        { className: (0, _classnames2.default)(prefixCls, className), style: style },
        fileList.map(function (item, index) {
          var key = item.url + '-' + index;
          var size = item.size;

          var fileSize = size && size > 1000000 ? (size / 1024 / 1024).toFixed(2) + 'MB' : size > 1000 ? (size / 1024).toFixed(2) + 'KB' : size + 'B';
          return _react2.default.createElement(
            'div',
            { key: key },
            _react2.default.createElement(
              'a',
              { href: item.url, target: '_blank' },
              _react2.default.createElement(_icon2.default, { type: 'paper-clip', className: prefixCls + '-icon' }),
              item.name
            ),
            item.description && _react2.default.createElement(
              'span',
              null,
              ' - ',
              item.description
            ),
            _react2.default.createElement(
              'span',
              { className: prefixCls + '-size' },
              '(',
              fileSize,
              ')'
            )
          );
        })
      );
    }
  }]);
  return FileList;
}(_react2.default.Component), _class.propTypes = {
  fileList: _propTypes2.default.arrayOf(_propTypes2.default.shape({
    name: _propTypes2.default.string,
    url: _propTypes2.default.string,
    suffix: _propTypes2.default.string,
    size: _propTypes2.default.number,
    description: _propTypes2.default.string
  }))
}, _class.defaultProps = {
  fileList: []
}, _temp);
exports.default = FileList;