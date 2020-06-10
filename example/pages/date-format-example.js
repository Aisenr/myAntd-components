import React from 'react';
import { DateFormat } from '../../components';
import '../../components/date-format/style';

export default class DateFormatExample extends React.Component {
  render() {
    return (
      <div style={{ textAlign: 'center', padding: '40px', fontSize: '40px' }}>
        组件：<div style={{ width: '367px', display: 'inline-block', lineHeight: '33px' }}><DateFormat value={undefined} format="YYYY-MM-DD hh:mm:ss" /></div>
        <br />
        方法：{DateFormat.format(new Date())}
        <br />
        <DateFormat.RangeFormat value={[1511777033562, -25200000]} format="hh:mm:ss" />
        <br />
      </div>
    );
  }
}
