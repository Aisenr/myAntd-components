import React from 'react';
import { TimeInterval } from '../../components';
import '../../components/select-area/style';


export default class TimeIntervalExample extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
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
        <TimeInterval value={this.state.value} onChange={this.handleChange} />
      </div>
    );
  }
}
