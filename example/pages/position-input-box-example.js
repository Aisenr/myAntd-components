import React from 'react';
import { PositionInputBox } from '../../components';
import '../../components/position-input-box/style';

export default class PositionInputBoxExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // value: {
      //   location: {
      //     type: 'Point',
      //     coordinates: [116.404, 39.915],
      //   },
      //   address: '',
      // },
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
        <PositionInputBox dataType="geo" value={this.state.value} onChange={this.onChange} />
      </div>
    );
  }
}
