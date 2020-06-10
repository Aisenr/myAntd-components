import React from 'react';
import {
  Upload,
  Button,
  Icon,
  message,
  Popconfirm,
  Progress,
  Row,
  Col,
} from 'antd';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import fetch from 'isomorphic-fetch';
import uuid from 'uuid/v4';
import InputItem from '../input-item';
import FileUpload from './index';

/**
 * 文件上传组件
 * @description 文件上传组件
 * @export  FileUpload
 * @date    2018-03-27
 * @author  zbs
 */

export default class UploadAttachment extends React.Component {

  static propTypes = {
    fileSize: PropTypes.number,
    action: PropTypes.string,
    deleteAction: PropTypes.string,
    accept: PropTypes.arrayOf(PropTypes.string),
    onChange: PropTypes.func,
    value: PropTypes.arrayOf(PropTypes.shape({
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
    fileSize: 200,
    action: null,
    deleteAction: null,
    accept: null,
    onChange() {},
    value: null,
    defaultFileList: [],
    uidKey: null,
  }

  constructor(props) {
    super(props);
    const { value: fileList, defaultFileList, onChange } = props;
    const newFileList = fileList || defaultFileList;
    this.state = {
      fileList: this.dataConvert(newFileList),
      uploadDone: true,
    };
    onChange(this.dataConvert(newFileList));
  }

  componentWillUnmount() {
    const { fileList } = this.state;
    fileList.forEach((item) => {
      if (item.status === 'uploading') {
        this.abort(item);
      }
    });
  }

  uploadingFileIdArr = [];

  dataConvert = (newFileList) => {
    return newFileList.map((item) => {
      return {
        uid: item.uid || uuid(),
        name: item.name,
        url: item.url,
        suffix: item.suffix,
        size: item.size,
        description: item.description,
        status: item.status || 'done',
      };
    });
  }

  handleFileChange = (info) => {
    const { onChange } = this.props;
    const { fileList } = info;
    const uploadStatus = info.file.status;
    if (uploadStatus === 'uploading') {
      this.uploadingCountIncrement(info.file);
      this.setState({
        uploadDone: false,
      });
    }
    const newFileList = this.fileListConvert(fileList);
    onChange(newFileList);
    if (uploadStatus === 'error') {
      message.error('上传失败');
      this.uploadingCountDecrease();
      this.setState({
        uploadDone: true,
      });
    }
    if (uploadStatus === 'done') {
      this.uploadingCountDecrease();
      this.setState({
        uploadDone: true,
      });
    }
    this.setState({
      fileList: newFileList,
    });
  }

  handleInputChange = (param, index) => {
    const { target: { value } } = param;
    const { fileList } = this.state;
    const { onChange } = this.props;
    fileList[index].description = value;
    this.setState({
      fileList: [...fileList],
    });
    onChange(this.fileListConvert(fileList));
  }

  fileListConvert = (param) => {
    return param.map((item) => {
      return {
        uid: item.uid,
        name: item.name,
        url: item.response || item.url,
        suffix: item.name.substring(item.name.lastIndexOf('.') + 1),
        size: item.size,
        description: item.description || '',
        status: item.status,
        percent: item.percent,
      };
    });
  }

  beforeUpload = (file) => {
    const { accept, fileSize } = this.props;
    const isType = accept ? accept.indexOf(file.name.substr(file.name.lastIndexOf('.') + 1)) >= 0 : true;
    const isLtSize = fileSize ? file.size / 1024 / 1024 < fileSize : true;
    if (!isType || !isLtSize) {
      message.error(`请上传${!isType ? `格式为${accept.join(',')}` : ''}${!isType && !isLtSize ? ',' : ''}${!isLtSize ? `大小不超过${fileSize}M` : ''}的图片`);
    }
    return isType && isLtSize;
  }

  abort = (file) => {
    if (this.uploadingFileIdArr.includes(file.uid)) {
      this.uploadingCountDecrease();
      this.uploadingFileIdArr.splice(this.uploadingFileIdArr.indexOf(file.uid), 1);
    }
    this.upload.abort(file);
  }

  handleDelete = (e, index) => {
    const { deleteAction, onChange } = this.props;
    const { fileList } = this.state;
    if (deleteAction) {
      fetch(`${deleteAction}?url=${this.fileListConvert(fileList)[index].url}`, {
        method: 'delete',
        credentials: 'include',
      });
    }
    this.abort(fileList[index]);
    fileList.splice(index, 1);
    onChange(this.fileListConvert(fileList));
    this.setState({
      fileList,
    });
  }

  handleNoteClick = (e) => {
    e.stopPropagation();
    e.preventDefault();
  }

  saveUpload = (node) => {
    if (node == null) {
      this.upload = null;
      return;
    }
    this.upload = node.upload;
  }

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
    const { prefixCls = 'bis-file-upload-attachment', className, style, action, fileSize } = this.props;
    const { fileList: newFileList } = this.state;
    const fileList = newFileList.map((item) => {
      return {
        ...item,
        url: item.url && (typeof (item.url) === 'string' ? item.url : item.url.fileUrl),
      };
    });
    const props = {
      action,
      fileList,
      onChange: this.handleFileChange,
      multiple: true,
      showUploadList: false,
      beforeUpload: this.beforeUpload,
    };

    return (
      <div className={classNames(prefixCls, className)} style={style} >
        <div className={`${prefixCls}-file`}>
          {
            fileList.map((item, index) => {
              const key = `${item.url}-${index}`;
              return (
                <div className={`${prefixCls}-file-list`} key={key} >
                  <div className={classNames(`${prefixCls}-file-list-info`, `${prefixCls}-file-list-${item.status}`)}>
                    <Row gutter={16}>
                      <Col xs={24} sm={24} md={12} lg={10} xl={8}>
                        {item.status === 'uploading' && <Icon type="loading" className={`${prefixCls}-file-list-info-link`} />}
                        {item.status !== 'uploading' && <Icon type="paper-clip" className={`${prefixCls}-file-list-info-link`} />}
                        {item.status === 'done' && <a href={item.url} target="_blank"><span className={`${prefixCls}-file-list-info-name`} title={item.name} >{item.name}</span></a>}
                        {item.status !== 'done' && <span className={`${prefixCls}-file-list-info-name`} title={item.name} >{item.name}</span>}

                      </Col>
                      <Col xs={24} sm={24} md={12} lg={14} xl={16}>
                        <InputItem value={item.description} className={`${prefixCls}-file-list-info-input`} size="small" placeholder="可选描述" onChange={e => this.handleInputChange(e, index)} />
                        <Popconfirm placement="top" title="确定删除这个附件吗?" onConfirm={e => this.handleDelete(e, index)} okText="确认" cancelText="取消">
                          <Icon type="delete" className={`${prefixCls}-file-list-info-delete`} />
                        </Popconfirm>
                      </Col>
                    </Row>
                  </div>
                  <div className={classNames('ant-upload-list-item-progress', `${prefixCls}-file-list-progress`)}>
                    {item.status === 'uploading' && <Progress strokeWidth={2} percent={item.percent === undefined ? 100 : parseInt(item.percent) === 100 && item.status === 'uploading' ? 99 : parseInt(item.percent)} type="line" showInfo={false} />}
                  </div>
                </div>
              );
            })
          }
        </div>
        <Upload {...props} ref={this.saveUpload} >
          <Button>
            <Icon type="upload" /> 选择文件
          </Button>
          <span className={`${prefixCls}-btn-des`} onClick={this.handleNoteClick}> 最大尺寸：{fileSize} MB</span>
        </Upload>
      </div>
    );
  }
}
