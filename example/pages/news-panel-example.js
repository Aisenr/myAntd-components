import React from 'react';
import { NewsPanel } from '../../components';
import '../../components/news-panel/style';

export default class NewsPanelExample extends React.Component {
  dataSource = [
    { content: '河南省', number: 1234223, unit: '万吨' },
    { content: '辽宁省', number: 4232, unit: '万吨' },
    { content: '山东省', number: 332, unit: '万吨' },
    { content: '陕西省', number: 13, unit: '万吨' },
  ]
  render() {
    return (
      <div style={{ margin: '40px auto' }}>
        <NewsPanel title="公告类" dataSource={this.dataSource} />
      </div>
    );
  }
}
