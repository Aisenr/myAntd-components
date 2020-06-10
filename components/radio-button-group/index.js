import React from 'react';

import { Radio } from 'antd';
import PropTypes from 'prop-types';

/**
 * 单选组件
 * @description 单选
 * @export  RadioButtonGroup
 * @date    2017-09-21
 * @author  zbs
 */
export default class RadioButtonGroup extends React.PureComponent {
  static propTypes = {
    value: PropTypes.any,
    options: PropTypes.array,
    onChange: PropTypes.func,
  };

  static defaultProps = {
    options: [],
  };

  render() {
    return (
      <div style={this.props.style} className={this.props.className} >
        <Radio.Group onChange={this.props.onChange} value={this.props.value} >
          {this.props.options.map((item) => {
            const { label, value } = typeof item === 'string' ? { label: item, value: item } : item;
            return (<Radio.Button key={value} value={value}>{label}</Radio.Button>);
          })}
        </Radio.Group>
      </div>
    );
  }
}
