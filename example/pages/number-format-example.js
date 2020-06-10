import React from 'react';
import { NumberFormat } from '../../components';
import '../../components/news-panel/style';

export default class numberFormatExample extends React.Component {
  render() {
    return (
      <div style={{ width: '100px', fontSize: '18px', margin: '40px auto' }}>
        <NumberFormat value={0} decimalPlaces={2} />
      </div>
    );
  }
}
