import React from 'react';
import { Radio } from 'antd';

const RadioGroup = Radio.Group;

/**
 * 单选框
 * @description 表单元素
 * @export  RadioItem
 * @date    2017-09-28
 * @author  zbs
 */
class RadioItem extends React.Component {
  onChange = (e) => {
    this.setState({
      value: e.target.value,
    });
    this.props.onChange(e);
  }
  render() {
    return (
      <RadioGroup {...this.props} onchange={this.onchange}>
        {
          this.props.items && this.props.items.map((item, index) => {
            return <Radio key={item.key || index} value={item.value}>{item.text}</Radio>;
          })
        }
      </RadioGroup>
    );
  }
}

export default RadioItem;
