import React from 'react';
import { RankList } from '../../components';
import '../../components/rank-list/style';

export default class RankListExample extends React.Component {
  dataSource = [
    { content: '河南省', number: 1234223, unit: '万吨' },
    { content: '辽宁省', number: 4232, unit: '万吨' },
    { content: '山东省', number: 332, unit: '万吨' },
    { content: '陕西省', number: 13, unit: '万吨' },
    { content: '河南省', number: 1234223, unit: '万吨' },
    { content: '辽宁省', number: 4232, unit: '万吨' },
    { content: '山东省', number: 332, unit: '万吨' },
    { content: '陕西省', number: 13, unit: '万吨' },
    { content: '河南省', number: 1234223, unit: '万吨' },
    { content: '辽宁省', number: 4232, unit: '万吨' },
    { content: '山东省', number: 332, unit: '万吨' },
    { content: '陕西省', number: 13, unit: '万吨' },
  ]

  handleRowClick = (e1, e2, e3) => {
    console.log('handleRowClick', e1, e2, e3);
  }

  handleExtraClick = (e1, e2, e3) => {
    console.log('handleExtraClick', e1, e2, e3);
  }

  render() {
    return (
      <div>
        <RankList title="普通排名" dataSource={this.dataSource} onRowClick={this.handleRowClick} />
        <RankList title="带有更多的排名" dataSource={this.dataSource} extra="更多" onExtraClick={this.handleExtraClick} />
        <RankList title="没有数据的排名" dataSource={[]} extra="更多" />
      </div>
    );
  }
}
