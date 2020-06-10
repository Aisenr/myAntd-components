import React from 'react';
import { SelectPoint } from '../../components';
import '../../components/select-point/style';


export default class SelectPointExample extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      value: { type: 'Point', coordinates: [116.404, 39.915] },
    };
  }

  handleChange = (value) => {
    console.log('value', value);
    this.setState({
      value,
    });
  }

  render() {
    return (
      <div style={{ width: '1000px', fontSize: '16px', margin: '40px auto' }}>
        <SelectPoint value={this.state.value} dataType="geo" onChange={this.handleChange} pathPoints={[[116.34062782447768, 39.95285096018603], [116.48345615612376, 39.94112635635715], [116.37638779247231, 39.88320338312631]]} />
      </div>
    );
  }
}
