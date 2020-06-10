import React from 'react';
import { FileList } from '../../components';
import '../../components/file-list/style';

export default class FileListExample extends React.Component {

  state = {
    fileList: [{
      name: '中国地图简介.txt',
      url: 'www.baidu.com',
      suffix: 'txt',
      size: 1230,
      description: '中国地图简介',
    }, {
      name: '中国地图简介.txt',
      url: 'www.baidu.com',
      suffix: 'txt',
      size: 1230,
      description: '',
    }],
  }

  render() {
    return (
      <div style={{ marginLeft: '40px' }}>
        文件列表：<FileList fileList={this.state.fileList} />
      </div>
    );
  }
}
