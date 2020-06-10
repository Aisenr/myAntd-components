import React from 'react';
import { UploadButton } from '../../components';
import '../../components/upload-button/style';

export default class UploadButtonExample extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    };
  }

  response = (file) => {

  }

  render() {
    return (
      <div style={{ width: '1000px', fontSize: '16px', margin: '40px auto' }}>
        <UploadButton title="上传" action="上传地址" loading={this.state.loading} response={this.response} />
      </div>
    );
  }
}
