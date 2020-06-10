import React from 'react';
import { Button } from 'antd';
import { FormGroup, RichTextEditor } from '../../components';
import '../../components/form-group/style';
import '../../components/rich-text-editor/style';

export default class RichTextEditorExample extends React.Component {
  dataSource = {
    content: '',
  }

  items = [{
    label: '富文本',
    dataIndex: 'content',
    rules: ['required'],
    render: () => <RichTextEditor />,
  }, {
    label: '',
    dataIndex: 'submit',
    render: () => <div>
      <Button type="primary" htmlType="submit">提交</Button>
    </div>,
  }]

  handleSubmit = (event, values) => {
    console.log(values);
  }

  render() {
    return (
      <FormGroup
        items={this.items}
        dataSource={this.dataSource}
        onSubmit={this.handleSubmit}
      />
    );
  }
}
