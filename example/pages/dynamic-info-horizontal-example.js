import React from 'react';
import { DynamicInfoHorizontal } from '../../components';
import '../../components/dynamic-info-horizontal/style';

export default class DynamicInfoHorizontalExample extends React.Component {

  render() {
    return (
      <div style={{ fontSize: '18px' }}>
        <DynamicInfoHorizontal
          title="标题"
          iconUrl="../images/bncl.png"
          number={20} unit="吨"
          style={{ width: '340px', border: '1px solid #23a9ea', borderLeft: '10px solid #23a9ea', margin: '40px auto' }}
        />
      </div>
    );
  }
}
