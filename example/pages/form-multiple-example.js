import React from 'react';
import { Form, Button } from 'antd';
import { Container, FormGroup, Panel } from '../../components';
import '../../components/container/style';
import '../../components/panel/style';

@Form.create()
export default class FormMultipleExample extends React.Component {

  state = {
    site: {},
    constructions: [{
      constructionName: Math.random()
    }],
  };

  siteItem = [
    { label: '名称', dataIndex: 'site.siteName' },
    { label: '联系人', dataIndex: 'site.siteContactName' },
    { label: '联系电话', dataIndex: 'site.siteContactPhone' },
  ];

  getConstructionItem(index) {
    return [
      { label: '名称', dataIndex: `constructions[${index}].constructionName` },
      { label: '联系人', dataIndex: `constructions[${index}].constructionContactName` },
      { label: '联系电话', dataIndex: `constructions[${index}].constructionContactPhone` },
    ];
  }

  handleAddConstruction = () => {
    this.setState({ constructions: this.state.constructions.concat({
        constructionName: Math.random()
      }) });
  };

  handleDeleteConstruction = (index) => {
    const data = this.props.form.getFieldsValue();
    const newData = {
      ...data,
      constructions: data.constructions.filter((item, i) => i !== index),
    };
    this.props.form.setFieldsValue(newData);
    this.setState(newData);
  };

  handleSubmit = () => {
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('handleSubmit', values);
      }
    });
  };

  render() {
    return (
      <Container>
        <Form onSubmit={this.handleSubmit}>
          <Panel title="工地信息">
            <FormGroup size="lg" items={this.siteItem} form={this.props.form} dataSource={this.state} />
          </Panel>
          {this.state.constructions.map((construction, index) => (
            <Panel key={index} title="建设单位信息" extra={<Button onClick={() => this.handleDeleteConstruction(index)}>删除</Button>}>
              <FormGroup size="lg" items={this.getConstructionItem(index)} form={this.props.form} dataSource={this.state} />
            </Panel>
          ))}
          <div style={{ textAlign: 'center' }}>
            <Button onClick={this.handleAddConstruction}>添加建设单位信息</Button>
            <Button htmlType="submit" type="primary">提交</Button>
          </div>
        </Form>
      </Container>
    );
  }
}
