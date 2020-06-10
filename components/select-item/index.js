import React from 'react';
import { Select } from 'antd';
import PropTypes from 'prop-types';

const Option = Select.Option;

/**
 * 下拉选择器
 * @description 表单元素
 * @export  SelectItem
 * @date    2017-09-28
 * @author  zbs
 */
class SelectItem extends React.Component {

  static propTypes = {
    onChange: PropTypes.func,
  }

  static defaultProps = {
    onChange() {},
  }

  handleChange = (value) => {
    this.props.onChange(value);
  }

  render() {
    const { className, style, items } = this.props;
    return (
      <div className={className} style={style} >
        <Select placeholder="请选择……" {...this.props} style={{ width: '100%' }} onChange={this.handleChange} >
          {items && items.map((item, index) => {
            return (
              <Option key={item.key || index} value={item.value} >{item.text}</Option>
            );
          })}
        </Select>
      </div>
    );
  }
}

export default SelectItem;
