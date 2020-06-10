'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _message2 = require('antd/lib/message');

var _message3 = _interopRequireDefault(_message2);

var _upload = require('antd/lib/upload');

var _upload2 = _interopRequireDefault(_upload);

var _button = require('antd/lib/button');

var _button2 = _interopRequireDefault(_button);

var _progress = require('antd/lib/progress');

var _progress2 = _interopRequireDefault(_progress);

var _row = require('antd/lib/row');

var _row2 = _interopRequireDefault(_row);

var _popconfirm = require('antd/lib/popconfirm');

var _popconfirm2 = _interopRequireDefault(_popconfirm);

var _col = require('antd/lib/col');

var _col2 = _interopRequireDefault(_col);

var _icon = require('antd/lib/icon');

var _icon2 = _interopRequireDefault(_icon);

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

var _class, _temp, _initialiseProps;

require('antd/lib/message/style');

require('antd/lib/upload/style');

require('antd/lib/button/style');

require('antd/lib/progress/style');

require('antd/lib/row/style');

require('antd/lib/popconfirm/style');

require('antd/lib/col/style');

require('antd/lib/icon/style');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _isomorphicFetch = require('isomorphic-fetch');

var _isomorphicFetch2 = _interopRequireDefault(_isomorphicFetch);

var _v = require('uuid/v4');

var _v2 = _interopRequireDefault(_v);

var _inputItem = require('../input-item');

var _inputItem2 = _interopRequireDefault(_inputItem);

var _index = require('./index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * 文件上传组件
 * @description 文件上传组件
 * @export  FileUpload
 * @date    2018-03-27
 * @author  zbs
 */

var UploadAttachment = (_temp = _class = function (_React$Component) {
  (0, _inherits3.default)(UploadAttachment, _React$Component);

  function UploadAttachment(props) {
    (0, _classCallCheck3.default)(this, UploadAttachment);

    var _this = (0, _possibleConstructorReturn3.default)(this, (UploadAttachment.__proto__ || (0, _getPrototypeOf2.default)(UploadAttachment)).call(this, props));

    _initialiseProps.call(_this);

    var fileList = props.value,
        defaultFileList = props.defaultFileList,
        onChange = props.onChange;

    var newFileList = fileList || defaultFileList;
    _this.state = {
      fileList: _this.dataConvert(newFileList),
      uploadDone: true
    };
    onChange(_this.dataConvert(newFileList));
    return _this;
  }

  (0, _createClass3.default)(UploadAttachment, [{
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      var _this2 = this;

      var fileList = this.state.fileList;

      fileList.forEach(function (item) {
        if (item.status === 'uploading') {
          _this2.abort(item);
        }
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      var _props = this.props,
          _props$prefixCls = _props.prefixCls,
          prefixCls = _props$prefixCls === undefined ? 'bis-file-upload-attachment' : _props$prefixCls,
          className = _props.className,
          style = _props.style,
          action = _props.action,
          fileSize = _props.fileSize;
      var newFileList = this.state.fileList;

      var fileList = newFileList.map(function (item) {
        return (0, _extends3.default)({}, item, {
          url: item.url && (typeof item.url === 'string' ? item.url : item.url.fileUrl)
        });
      });
      var props = {
        action: action,
        fileList: fileList,
        onChange: this.handleFileChange,
        multiple: true,
        showUploadList: false,
        beforeUpload: this.beforeUpload
      };

      return _react2.default.createElement(
        'div',
        { className: (0, _classnames2.default)(prefixCls, className), style: style },
        _react2.default.createElement(
          'div',
          { className: prefixCls + '-file' },
          fileList.map(function (item, index) {
            var key = item.url + '-' + index;
            return _react2.default.createElement(
              'div',
              { className: prefixCls + '-file-list', key: key },
              _react2.default.createElement(
                'div',
                { className: (0, _classnames2.default)(prefixCls + '-file-list-info', prefixCls + '-file-list-' + item.status) },
                _react2.default.createElement(
                  _row2.default,
                  { gutter: 16 },
                  _react2.default.createElement(
                    _col2.default,
                    { xs: 24, sm: 24, md: 12, lg: 10, xl: 8 },
                    item.status === 'uploading' && _react2.default.createElement(_icon2.default, { type: 'loading', className: prefixCls + '-file-list-info-link' }),
                    item.status !== 'uploading' && _react2.default.createElement(_icon2.default, { type: 'paper-clip', className: prefixCls + '-file-list-info-link' }),
                    item.status === 'done' && _react2.default.createElement(
                      'a',
                      { href: item.url, target: '_blank' },
                      _react2.default.createElement(
                        'span',
                        { className: prefixCls + '-file-list-info-name', title: item.name },
                        item.name
                      )
                    ),
                    item.status !== 'done' && _react2.default.createElement(
                      'span',
                      { className: prefixCls + '-file-list-info-name', title: item.name },
                      item.name
                    )
                  ),
                  _react2.default.createElement(
                    _col2.default,
                    { xs: 24, sm: 24, md: 12, lg: 14, xl: 16 },
                    _react2.default.createElement(_inputItem2.default, { value: item.description, className: prefixCls + '-file-list-info-input', size: 'small', placeholder: '\u53EF\u9009\u63CF\u8FF0', onChange: function onChange(e) {
                        return _this3.handleInputChange(e, index);
                      } }),
                    _react2.default.createElement(
                      _popconfirm2.default,
                      { placement: 'top', title: '\u786E\u5B9A\u5220\u9664\u8FD9\u4E2A\u9644\u4EF6\u5417?', onConfirm: function onConfirm(e) {
                          return _this3.handleDelete(e, index);
                        }, okText: '\u786E\u8BA4', cancelText: '\u53D6\u6D88' },
                      _react2.default.createElement(_icon2.default, { type: 'delete', className: prefixCls + '-file-list-info-delete' })
                    )
                  )
                )
              ),
              _react2.default.createElement(
                'div',
                { className: (0, _classnames2.default)('ant-upload-list-item-progress', prefixCls + '-file-list-progress') },
                item.status === 'uploading' && _react2.default.createElement(_progress2.default, { strokeWidth: 2, percent: item.percent === undefined ? 100 : parseInt(item.percent) === 100 && item.status === 'uploading' ? 99 : parseInt(item.percent), type: 'line', showInfo: false })
              )
            );
          })
        ),
        _react2.default.createElement(
          _upload2.default,
          (0, _extends3.default)({}, props, { ref: this.saveUpload }),
          _react2.default.createElement(
            _button2.default,
            null,
            _react2.default.createElement(_icon2.default, { type: 'upload' }),
            ' \u9009\u62E9\u6587\u4EF6'
          ),
          _react2.default.createElement(
            'span',
            { className: prefixCls + '-btn-des', onClick: this.handleNoteClick },
            ' \u6700\u5927\u5C3A\u5BF8\uFF1A',
            fileSize,
            ' MB'
          )
        )
      );
    }
  }]);
  return UploadAttachment;
}(_react2.default.Component), _class.propTypes = {
  fileSize: _propTypes2.default.number,
  action: _propTypes2.default.string,
  deleteAction: _propTypes2.default.string,
  accept: _propTypes2.default.arrayOf(_propTypes2.default.string),
  onChange: _propTypes2.default.func,
  value: _propTypes2.default.arrayOf(_propTypes2.default.shape({
    name: _propTypes2.default.string,
    url: _propTypes2.default.string,
    suffix: _propTypes2.default.string,
    size: _propTypes2.default.number,
    description: _propTypes2.default.string
  })),
  defaultFileList: _propTypes2.default.arrayOf(_propTypes2.default.shape({
    name: _propTypes2.default.string,
    url: _propTypes2.default.string,
    suffix: _propTypes2.default.string,
    size: _propTypes2.default.number,
    description: _propTypes2.default.string
  }))
}, _class.defaultProps = {
  fileSize: 200,
  action: null,
  deleteAction: null,
  accept: null,
  onChange: function onChange() {},

  value: null,
  defaultFileList: [],
  uidKey: null
}, _initialiseProps = function _initialiseProps() {
  var _this4 = this;

  this.uploadingFileIdArr = [];

  this.dataConvert = function (newFileList) {
    return newFileList.map(function (item) {
      return {
        uid: item.uid || (0, _v2.default)(),
        name: item.name,
        url: item.url,
        suffix: item.suffix,
        size: item.size,
        description: item.description,
        status: item.status || 'done'
      };
    });
  };

  this.handleFileChange = function (info) {
    var onChange = _this4.props.onChange;
    var fileList = info.fileList;

    var uploadStatus = info.file.status;
    if (uploadStatus === 'uploading') {
      _this4.uploadingCountIncrement(info.file);
      _this4.setState({
        uploadDone: false
      });
    }
    var newFileList = _this4.fileListConvert(fileList);
    onChange(newFileList);
    if (uploadStatus === 'error') {
      _message3.default.error('上传失败');
      _this4.uploadingCountDecrease();
      _this4.setState({
        uploadDone: true
      });
    }
    if (uploadStatus === 'done') {
      _this4.uploadingCountDecrease();
      _this4.setState({
        uploadDone: true
      });
    }
    _this4.setState({
      fileList: newFileList
    });
  };

  this.handleInputChange = function (param, index) {
    var value = param.target.value;
    var fileList = _this4.state.fileList;
    var onChange = _this4.props.onChange;

    fileList[index].description = value;
    _this4.setState({
      fileList: [].concat((0, _toConsumableArray3.default)(fileList))
    });
    onChange(_this4.fileListConvert(fileList));
  };

  this.fileListConvert = function (param) {
    return param.map(function (item) {
      return {
        uid: item.uid,
        name: item.name,
        url: item.response || item.url,
        suffix: item.name.substring(item.name.lastIndexOf('.') + 1),
        size: item.size,
        description: item.description || '',
        status: item.status,
        percent: item.percent
      };
    });
  };

  this.beforeUpload = function (file) {
    var _props2 = _this4.props,
        accept = _props2.accept,
        fileSize = _props2.fileSize;

    var isType = accept ? accept.indexOf(file.name.substr(file.name.lastIndexOf('.') + 1)) >= 0 : true;
    var isLtSize = fileSize ? file.size / 1024 / 1024 < fileSize : true;
    if (!isType || !isLtSize) {
      _message3.default.error('\u8BF7\u4E0A\u4F20' + (!isType ? '\u683C\u5F0F\u4E3A' + accept.join(',') : '') + (!isType && !isLtSize ? ',' : '') + (!isLtSize ? '\u5927\u5C0F\u4E0D\u8D85\u8FC7' + fileSize + 'M' : '') + '\u7684\u56FE\u7247');
    }
    return isType && isLtSize;
  };

  this.abort = function (file) {
    if (_this4.uploadingFileIdArr.includes(file.uid)) {
      _this4.uploadingCountDecrease();
      _this4.uploadingFileIdArr.splice(_this4.uploadingFileIdArr.indexOf(file.uid), 1);
    }
    _this4.upload.abort(file);
  };

  this.handleDelete = function (e, index) {
    var _props3 = _this4.props,
        deleteAction = _props3.deleteAction,
        onChange = _props3.onChange;
    var fileList = _this4.state.fileList;

    if (deleteAction) {
      (0, _isomorphicFetch2.default)(deleteAction + '?url=' + _this4.fileListConvert(fileList)[index].url, {
        method: 'delete',
        credentials: 'include'
      });
    }
    _this4.abort(fileList[index]);
    fileList.splice(index, 1);
    onChange(_this4.fileListConvert(fileList));
    _this4.setState({
      fileList: fileList
    });
  };

  this.handleNoteClick = function (e) {
    e.stopPropagation();
    e.preventDefault();
  };

  this.saveUpload = function (node) {
    if (node == null) {
      _this4.upload = null;
      return;
    }
    _this4.upload = node.upload;
  };

  this.uploadingCountIncrement = function (file) {
    if (_this4.uploadingFileIdArr.includes(file.uid)) {
      return;
    }
    _index2.default.uploadingCount += 1;
    _this4.uploadingFileIdArr.push(file.uid);
  };

  this.uploadingCountDecrease = function () {
    if (_index2.default.uploadingCount <= 0) return;
    _index2.default.uploadingCount -= 1;
  };
}, _temp);
exports.default = UploadAttachment;