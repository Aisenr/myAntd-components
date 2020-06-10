import React from 'react';
import { InfoCard } from '../../components';
import '../../components/info-card/style';

export default class InfoCardExample extends React.Component {
  render() {
    return (
      <div style={{ width: '400px', margin: '40px auto' }}>
        <InfoCard
          title="项目总数量"
          iconUrl="../images/xmzsl.png"
          number={500}
          style={{ backgroundColor: '#69a2fa' }}
        />
      </div>
    );
  }
}
