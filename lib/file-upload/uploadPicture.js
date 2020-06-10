'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _message2 = require('antd/lib/message');

var _message3 = _interopRequireDefault(_message2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _modal = require('antd/lib/modal');

var _modal2 = _interopRequireDefault(_modal);

var _upload = require('antd/lib/upload');

var _upload2 = _interopRequireDefault(_upload);

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

require('antd/lib/modal/style');

require('antd/lib/upload/style');

require('antd/lib/icon/style');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _isomorphicFetch = require('isomorphic-fetch');

var _isomorphicFetch2 = _interopRequireDefault(_isomorphicFetch);

var _index = require('./index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * 文件上传组件
 * @description 文件上传组件
 * @export  FileUpload
 * @date    2017-09-28
 * @author  zbs
 */
var UploadPicture = (_temp = _class = function (_React$Component) {
  (0, _inherits3.default)(UploadPicture, _React$Component);

  function UploadPicture(props) {
    (0, _classCallCheck3.default)(this, UploadPicture);

    var _this = (0, _possibleConstructorReturn3.default)(this, (UploadPicture.__proto__ || (0, _getPrototypeOf2.default)(UploadPicture)).call(this, props));

    _initialiseProps.call(_this);

    var fileList = props.value,
        defaultFileList = props.defaultFileList;

    var newFileList = fileList || defaultFileList;
    _this.state = {
      previewVisible: false,
      previewImage: '',
      fileList: _this.dataConvert(newFileList)
    };
    return _this;
  }

  (0, _createClass3.default)(UploadPicture, [{
    key: 'getElementIndex',
    value: function getElementIndex(arr, element) {
      for (var i = 0; i < arr.length; i++) {
        if (arr[i].uid === element.uid) return i;
      }
    }
  }, {
    key: 'dataConvert',
    value: function dataConvert(newFileList) {
      return newFileList.map(function (item, index) {
        return (0, _extends3.default)({}, item, {
          uid: item.url + '-' + index,
          name: item.name,
          url: item.url,
          suffix: item.suffix,
          size: item.size,
          description: item.description
        });
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          _props$prefixCls = _props.prefixCls,
          prefixCls = _props$prefixCls === undefined ? 'bis-file-upload' : _props$prefixCls,
          className = _props.className,
          style = _props.style,
          action = _props.action,
          defaultFileList = _props.defaultFileList,
          fileNum = _props.fileNum,
          accept = _props.accept;
      var _state = this.state,
          previewVisible = _state.previewVisible,
          previewImage = _state.previewImage,
          fileList = _state.fileList;

      var uploadButton = _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(_icon2.default, { type: 'plus' }),
        _react2.default.createElement(
          'div',
          { className: prefixCls + '-upload-text' },
          '\u70B9\u51FB\u4E0A\u4F20'
        ),
        _react2.default.createElement('img', { alt: '' })
      );
      return _react2.default.createElement(
        'div',
        { className: (0, _classnames2.default)(prefixCls, className), style: style },
        _react2.default.createElement(
          _upload2.default,
          {
            action: action,
            listType: 'picture-card',
            fileList: fileList,
            onPreview: this.handlePreview,
            onChange: this.handleChange,
            defaultFileList: defaultFileList,
            beforeUpload: this.beforeUpload,
            onRemove: this.handleRemove,
            headers: this.props.headers,
            accept: accept
          },
          fileNum > 0 && fileList.length >= this.props.fileNum ? null : uploadButton
        ),
        _react2.default.createElement(
          _modal2.default,
          {
            visible: previewVisible,
            footer: null,
            onCancel: this.handleCancel
          },
          _react2.default.createElement('img', {
            alt: 'example',
            style: { width: '100%' },
            src: previewImage
          })
        )
      );
    }
  }]);
  return UploadPicture;
}(_react2.default.Component), _class.propTypes = {
  fileSize: _propTypes2.default.number,
  action: _propTypes2.default.string,
  deleteAction: _propTypes2.default.string,
  accept: _propTypes2.default.string,
  onChange: _propTypes2.default.func,
  uidKey: _propTypes2.default.string,
  fileNum: _propTypes2.default.number,
  fileList: _propTypes2.default.arrayOf(_propTypes2.default.shape({
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
  fileSize: null,
  action: null,
  deleteAction: null,
  accept: 'image/*',
  onChange: function onChange() {},

  uidKey: null,
  fileNum: -1,
  fileList: null,
  defaultFileList: []
}, _initialiseProps = function _initialiseProps() {
  var _this2 = this;

  this.handleCancel = function () {
    return _this2.setState({
      previewVisible: false
    });
  };

  this.handlePreview = function (file) {
    _this2.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true
    });
  };

  this.handleChange = function (info) {
    var uploadStatus = info.file.status;
    if (!uploadStatus) return;
    var onChange = _this2.props.onChange;
    var fileList = info.fileList;

    var newFileList = _this2.fileListConvert(fileList);
    onChange(newFileList);
    if (uploadStatus === 'uploading') {
      _this2.uploadingCountIncrement(info.file);
    } else {
      _this2.uploadingCountDecrease();
    }
    _this2.setState({
      fileList: fileList
    });
  };

  this.fileListConvert = function (param) {
    var uidKey = _this2.props.uidKey;

    return param.map(function (item, index) {
      var response = item.response,
          itemThumbUrl = item.thumbUrl,
          rest = (0, _objectWithoutProperties3.default)(item, ['response', 'thumbUrl']);

      var _ref = response ? typeof response === 'string' ? { url: response } : (0, _extends3.default)({}, response, { url: response.fileUrl }) : { url: item.url },
          thumbUrl = _ref.thumbUrl,
          currentResponse = (0, _objectWithoutProperties3.default)(_ref, ['thumbUrl']);

      return (0, _extends3.default)({}, rest, {
        uid: uidKey ? item.response && item.response[uidKey] : item.response + '-' + index,
        name: item.name,
        suffix: item.name.substring(item.name.lastIndexOf('.') + 1),
        size: item.size,
        description: item.description || '',
        status: item.status
      }, currentResponse);
    });
  };

  this.beforeUpload = function (file) {
    var _props2 = _this2.props,
        accept = _props2.accept,
        fileSize = _props2.fileSize;

    var isType = accept ? accept.indexOf(file.name.substr(file.name.lastIndexOf('.') + 1)) >= 0 : true;
    // const isType = true;
    var isLtSize = fileSize ? file.size / 1024 / 1024 < fileSize : true;
    if (!isType || !isLtSize) {
      _message3.default.error('\u8BF7\u4E0A\u4F20' + (!isType ? '\u683C\u5F0F\u4E3A' + accept : '') + (!isType && !isLtSize ? ',' : '') + (!isLtSize ? '\u5927\u5C0F\u4E0D\u8D85\u8FC7' + fileSize + 'M' : '') + '\u7684\u56FE\u7247');
    }
    return isType && isLtSize;
  };

  this.handleRemove = function (file) {
    var _props3 = _this2.props,
        deleteAction = _props3.deleteAction,
        onChange = _props3.onChange;
    var fileList = _this2.state.fileList;

    if (deleteAction) {
      (0, _isomorphicFetch2.default)(deleteAction + '?url=' + file.response, {
        method: 'delete',
        credentials: 'include'
      });
    }
    fileList.splice(_this2.getElementIndex(fileList, file), 1);
    onChange(_this2.fileListConvert(fileList));
    _this2.setState({
      fileList: fileList
    });

    if (_this2.uploadingFileIdArr.includes(file.uid)) {
      _this2.uploadingCountDecrease();
      _this2.uploadingFileIdArr.splice(_this2.uploadingFileIdArr.indexOf(file.uid), 1);
    }
  };

  this.uploadingFileIdArr = [];

  this.uploadingCountIncrement = function (file) {
    if (_this2.uploadingFileIdArr.includes(file.uid)) {
      return;
    }
    _index2.default.uploadingCount += 1;
    _this2.uploadingFileIdArr.push(file.uid);
  };

  this.uploadingCountDecrease = function () {
    if (_index2.default.uploadingCount <= 0) return;
    _index2.default.uploadingCount -= 1;
  };
}, _temp);
exports.default = UploadPicture;