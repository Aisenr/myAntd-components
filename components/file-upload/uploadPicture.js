import React from 'react';
import {
  Upload,
  Icon,
  Modal,
  message,
} from 'antd';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import fetch from 'isomorphic-fetch';
import FileUpload from './index';

/**
 * 文件上传组件
 * @description 文件上传组件
 * @export  FileUpload
 * @date    2017-09-28
 * @author  zbs
 */
export default class UploadPicture extends React.Component {

  static propTypes = {
    fileSize: PropTypes.number,
    action: PropTypes.string,
    deleteAction: PropTypes.string,
    accept: PropTypes.string,
    onChange: PropTypes.func,
    uidKey: PropTypes.string,
    fileNum: PropTypes.number,
    fileList: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string,
      url: PropTypes.string,
      suffix: PropTypes.string,
      size: PropTypes.number,
      description: PropTypes.string,
    })),
    defaultFileList: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string,
      url: PropTypes.string,
      suffix: PropTypes.string,
      size: PropTypes.number,
      description: PropTypes.string,
    })),
  }
  static defaultProps = {
    fileSize: null,
    action: null,
    deleteAction: null,
    accept: 'image/*',
    onChange() {},
    uidKey: null,
    fileNum: -1,
    fileList: null,
    defaultFileList: [],
  };

  constructor(props) {
    super(props);
    const { value: fileList, defaultFileList } = props;
    const newFileList = fileList || defaultFileList;
    this.state = {
      previewVisible: false,
      previewImage: '',
      fileList: this.dataConvert(newFileList),
    };
  }

  handleCancel = () => this.setState({
    previewVisible: false,
  })

  handlePreview = (file) => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    });
  }

  handleChange = (info) => {
    const uploadStatus = info.file.status;
    if (!uploadStatus) return;
    const { onChange } = this.props;
    const { fileList } = info;
    const newFileList = this.fileListConvert(fileList);
    onChange(newFileList);
    if (uploadStatus === 'uploading') {
      this.uploadingCountIncrement(info.file);
    } else {
      this.uploadingCountDecrease();
    }
    this.setState({
      fileList,
    });
  }

  fileListConvert = (param) => {
    const { uidKey } = this.props;
    return param.map((item, index) => {
      const { response, thumbUrl: itemThumbUrl, ...rest } = item;
      const { thumbUrl, ...currentResponse } = response ? (typeof (response) === 'string' ? { url: response } : { ...response, url: response.fileUrl }) : { url: item.url };
      return {
        ...rest,
        uid: uidKey ? item.response && item.response[uidKey] : `${item.response}-${index}`,
        name: item.name,
        suffix: item.name.substring(item.name.lastIndexOf('.') + 1),
        size: item.size,
        description: item.description || '',
        status: item.status,
        ...currentResponse,
      };
    });
  }

  beforeUpload = (file) => {
    const { accept, fileSize } = this.props;
    const isType = accept ? accept.indexOf(file.name.substr(file.name.lastIndexOf('.') + 1)) >= 0 : true;
    // const isType = true;
    const isLtSize = fileSize ? file.size / 1024 / 1024 < fileSize : true;
    if (!isType || !isLtSize) {
      message.error(`请上传${!isType ? `格式为${accept}` : ''}${!isType && !isLtSize ? ',' : ''}${!isLtSize ? `大小不超过${fileSize}M` : ''}的图片`);
    }
    return isType && isLtSize;
  }

  handleRemove = (file) => {
    const { deleteAction, onChange } = this.props;
    const { fileList } = this.state;
    if (deleteAction) {
      fetch(`${deleteAction}?url=${file.response}`, {
        method: 'delete',
        credentials: 'include',
      });
    }
    fileList.splice(this.getElementIndex(fileList, file), 1);
    onChange(this.fileListConvert(fileList));
    this.setState({
      fileList,
    });

    if (this.uploadingFileIdArr.includes(file.uid)) {
      this.uploadingCountDecrease();
      this.uploadingFileIdArr.splice(this.uploadingFileIdArr.indexOf(file.uid), 1);
    }
  }

  getElementIndex(arr, element) {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].uid === element.uid) return i;
    }
  }

  dataConvert(newFileList) {
    return newFileList.map((item, index) => {
      return {
        ...item,
        uid: `${item.url}-${index}`,
        name: item.name,
        url: item.url,
        suffix: item.suffix,
        size: item.size,
        description: item.description,
      };
    });
  }
  uploadingFileIdArr = [];
  uploadingCountIncrement = (file) => {
    if (this.uploadingFileIdArr.includes(file.uid)) {
      return;
    }
    FileUpload.uploadingCount += 1;
    this.uploadingFileIdArr.push(file.uid);
  }

  uploadingCountDecrease = () => {
    if (FileUpload.uploadingCount <= 0) return;
    FileUpload.uploadingCount -= 1;
  }

  render() {
    const { prefixCls = 'bis-file-upload', className, style, action, defaultFileList, fileNum, accept } = this.props;
    const { previewVisible, previewImage, fileList } = this.state;
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className={`${prefixCls}-upload-text`}>点击上传</div>
        <img alt="" />
      </div>
    );
    return (
      <div className={classNames(prefixCls, className)} style={style} >
        <Upload
          action={action}
          listType="picture-card"
          fileList={fileList}
          onPreview={this.handlePreview}
          onChange={this.handleChange}
          defaultFileList={defaultFileList}
          beforeUpload={this.beforeUpload}
          onRemove={this.handleRemove}
          headers={this.props.headers}
          accept={accept}
        >
          {
            fileNum > 0 && fileList.length >= this.props.fileNum ? null : uploadButton
          }
        </Upload>
        <Modal
          visible={previewVisible}
          footer={null}
          onCancel={this.handleCancel}
        >
          <img
            alt="example"
            style={{ width: '100%' }}
            src={previewImage}
          />
        </Modal>
      </div>
    );
  }
}
