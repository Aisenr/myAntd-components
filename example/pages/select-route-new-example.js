import React from 'react';
import { SelectRouteNew } from '../../components';
import '../../components/select-route/style';

export default class SelectRouteExample extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      value: {
        type: 'LineString',
        coordinates: [[116.34062782447768, 39.95285096018603], [116.48345615612376, 39.94112635635715], [116.37638779247231, 39.88320338312631]],
      },
    };
  }

  handleChange = (value) => {
    console.log(value);
    this.setState({
      value,
    });
  }

  render() {
    return (
      <div style={{ width: '1000px', fontSize: '16px', margin: '40px auto' }}>
        <SelectRouteNew startAndEndPosition={false} dataType="geo" selectPoint={[116.404, 39.915]} onChange={this.handleChange} />
      </div>
    );
  }
}
