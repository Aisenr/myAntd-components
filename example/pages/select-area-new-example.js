import React from 'react';
import { SelectAreaNew } from '../../components';
import '../../components/select-area-new/style';


export default class SelectAreaPointExample extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      value: { type: 'Polygon', coordinates: [[[116.40372603938806, 39.919865818358204], [116.39700477837937, 39.90975396091137], [116.41526890481585, 39.91487928787882], [116.40372603938806, 39.919865818358204]]] },
    };
  }
  handleChange = (value) => {
    console.log('value', value);
    this.setState({
      value,
    });
  }
  handleChange1 = (value) => {
    console.log('value', value);
  }

  render() {
    return (
      <div style={{ width: '1000px', fontSize: '16px', margin: '40px auto' }}>
        <SelectAreaNew selectPoint={[116.404, 39.915]} value={this.state.value} onChange={this.handleChange} dataType="geo" />
        初始状态：<SelectAreaNew dataType="geo" onChange={this.handleChange1} />
      </div>
    );
  }
}
