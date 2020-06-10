import React from 'react';
import { Upload, Button, Icon } from 'antd';
import PropTypes from 'prop-types';

/**
 * 文件上传组件(按钮形式)
 * @description 文件上传组件
 * @export  UploadButton
 * @date    2017-11-03
 * @author  zbs
 */

class UploadButton extends React.Component {

  handleChange = (info) => {
    this.props.response(info.file);
  }

  render() {
    return (
      <Upload action={this.props.action} showUploadList={false} onChange={this.handleChange}>
        <Button loading={this.props.loading}>
          <Icon type="upload" /> {this.props.title}
        </Button>
      </Upload>
    );
  }
}

export default UploadButton;

UploadButton.defaultProps = {
  action: '',
  loading: false,
  title: '',
};

UploadButton.propTypes = {
  response: PropTypes.func,
  action: PropTypes.string,
  loading: PropTypes.bool,
  title: PropTypes.string,
};
