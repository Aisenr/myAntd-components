import React from 'react';
import { PositionInputBoxNew } from '../../components';
import '../../components/position-input-box-new/style';

export default class PositionInputBoxNewExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: {
        location: {
          type: 'Point',
          coordinates: [116.404, 39.915],
        },
        address: '北京',
      },
    };
  }

  onChange = (value) => {
    console.log('value', value);
    this.setState({
      value,
    });
  }
  render() {
    return (
      <div style={{ width: '1000px', fontSize: '16px', margin: '40px auto' }}>
        <PositionInputBoxNew dataType="geo" value={this.state.value} onChange={this.onChange} />
      </div>
    );
  }
}
