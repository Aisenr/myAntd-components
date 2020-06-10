import React from 'react';
import { ListTable, DateFormat } from '../../components';
import '../../components/list-table/style';

const columns = [{
  title: 'NO',
  dataIndex: 'id',
  key: 'id',
  render: (text, record, index) => index + 1,
}, {
  title: '标题',
  dataIndex: 'title',
  key: 'title',
}, {
  title: '来源',
  dataIndex: 'orgin',
  key: 'orgin',
  width: 160,
}, {
  title: '日期',
  dataIndex: 'lastModifiedDate',
  key: 'lastModifiedDate',
  render: () => <span>222222222222444444444444448888888888888</span>,
  width: 120,
},
];

const noticeAll = [
  { title: '标题一', orgin: '来源一', lastModifiedDate: '日期一' },
  { title: '标题二', orgin: '来源二', lastModifiedDate: '日期二' },
  { title: '标题三', orgin: '来源三', lastModifiedDate: '日期三' },
];

export default class ListTableExample extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      noticeLoading: true,
    };
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        noticeLoading: false,
      });
    }, 2000);
  }

  render() {
    return (
      <div style={{ width: '400px', margin: '40px auto' }}>
        <ListTable
          loading={this.state.noticeLoading}
          dataSource={noticeAll}
          columns={columns}
          colorDeepened="even"
        />
      </div>
    );
  }
}
