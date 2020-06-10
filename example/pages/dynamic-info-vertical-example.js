import React from 'react';
import { DynamicInfoVertical } from '../../components';
import '../../components/dynamic-info-vertical/style';

export default class DynamicInfoVerticalExample extends React.Component {

  render() {
    return (
      <div style={{ fontSize: '18px' }}>
        <DynamicInfoVertical
          title="标题"
          iconUrl="../images/bncl.png"
          number={20}
          unit="吨"
          style={{ width: '160px', border: '1px solid #23a9ea', margin: '40px auto' }}
        />
      </div>
    );
  }
}
