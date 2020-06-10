import React from 'react';
import PropTypes from 'prop-types';
import PictureUpload from './uploadPicture.js';
import UploadAttachment from './uploadAttachment.js';

/**
 * 文件上传组件
 * @description 文件上传组件
 * @export  FileUpload
 * @date    2017-09-28
 * @author  zbs
 */
export default class FileUpload extends React.Component {

  static propTypes = {
    listType: PropTypes.oneOf(['picture-card', 'attachment']),
  };

  static defaultProps = {
    listType: 'picture-card',
  };

  static uploadingCount = 0;

  render() {
    const { listType } = this.props;
    return listType === 'picture-card' ? <PictureUpload {...this.props} /> : <UploadAttachment {...this.props} />;
  }
}
