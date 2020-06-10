import React from 'react';
import { MessageItem } from '../../components';
import '../../components/message-item/style';

export default class InfoListExample extends React.Component {

  dataSource = [
    { title: '标题', imageUrl: '../images/bncl.png', subtitle: '副标题', detail: '详情，我是详情内容' },
    { title: '标题', imageUrl: '../images/bncl.png', subtitle: '副标题', detail: '详情，我是详情内容' },
    { title: '标题', imageUrl: '../images/bncl.png', subtitle: '副标题', detail: '详情，我是详情内容' },
  ];

  render() {
    return (
      <div style={{ margin: '40px auto' }}>
        <MessageItem
          title="消息标题"
          content="消息内容"
          time={1511777033562}
        />
      </div>
    );
  }
}
