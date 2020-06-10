import React from 'react';
import LzEditor from 'react-lz-editor';
import PropTypes from 'prop-types';

export default class RichTextEditor extends React.Component {
  static propTypes = {
    action: PropTypes.string,
  }

  static defaultProps = {
    action: '',
  }
  constructor(props) {
    super(props);
    this.state = {
      responseList: [],
    };
  }
  componentWillReceiveProps() {
    this.setState({ responseList: [] });
  }

  onChange=(info) => {
    const currFileList = info.fileList;
    const currFileListtemp = currFileList.filter(f => (!f.length));
    const currFileListtemp1 = currFileListtemp.map((file) => {
      if (file.response) {
        // 组件会将 file.url 作为链接进行展示
        file.url = file.response.fileUrl;
      }
      if (!file.length) {
        return file;
      }
    });

    this.setState({ responseList: currFileListtemp1 });
  }

  isContentEmpty(content) {
    const ele = document.createElement('div');
    ele.innerHTML = content;
    return ele.innerText.trim() === '';
  }

  cbReceiver = (content) => {
    const { onChange } = this.props;
    if (onChange) {
      onChange(this.isContentEmpty(content) ? '' : content);
    }
  }

  render() {
    const upLoadProps = {
      action: this.props.action,
      onChange: this.onChange,
      fileList: this.state.responseList,
    };
    return (
      <LzEditor
        {...this.props}
        color={false}
        importContent={this.props.value}
        cbReceiver={this.cbReceiver}
        uploadProps={upLoadProps}
        video={false}
        audio={false}
      />
    );
  }
}
