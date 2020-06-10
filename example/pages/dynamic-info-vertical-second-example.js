import React from 'react';
import { DynamicInfoVerticalSecond } from '../../components';
import '../../components/dynamic-info-vertical-second/style';

export default class DynamicInfoVerticalSecondExample extends React.Component {

  render() {
    return (
      <div style={{ fontSize: '18px' }}>
        <DynamicInfoVerticalSecond
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
