import React from 'react';
import { InfoList } from '../../components';
import '../../components/info-list/style';

export default class InfoListExample extends React.Component {

  dataSource = [
    { title: '标题', imageUrl: '../images/bncl.png', subtitle: '副标题', detail: '详情，我是详情内容' },
    { title: '标题', imageUrl: '../images/bncl.png', subtitle: '副标题', detail: '详情，我是详情内容' },
    { title: '标题', imageUrl: '../images/bncl.png', subtitle: '副标题', detail: '详情，我是详情内容' },
  ];

  render() {
    return (
      <div style={{ width: '400px', margin: '40px auto' }}>
        <InfoList
          title="InfoList列表"
          extra="更多/MORE"
          onExtraClick={e => this.onExtraClick('/disposalPlace', e)}
          dataSource={this.dataSource}
          onRowClick={this.onRowClickDisposal}
          bodyStyle={{ fontSize: '16px' }}
        />
      </div>
    );
  }
}
