import React from 'react';
import { CounterAnimation } from '../../components';
import '../../components/area-select/style';

export default class AreaSelectExample extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      value: 10,
    };
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        value: 20,
      });
    }, 2000);
  }

  render() {
    return (
      <div style={{ textAlign: 'center', padding: '40px', fontSize: '40px' }}>
        <CounterAnimation end={this.state.value} />
      </div>
    );
  }
}
