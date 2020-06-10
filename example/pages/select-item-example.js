import React from 'react';
import { SelectItem } from '../../components';

export default class SelectItemExample extends React.Component {

  items = [
    { text: '选项一', value: 'value1' },
    { text: '选项二', value: 'value2' },
    { text: '选项三', value: 'value3' },
  ]

  render() {
    return (
      <SelectItem items={this.items} style={{ width: '400px' }} />
    );
  }
}
