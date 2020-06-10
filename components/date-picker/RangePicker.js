import React from 'react';
import { DatePicker as AntdDatePicker } from 'antd';
import moment from 'moment';

export default class RangePicker extends React.PureComponent {

  static propTypes = AntdDatePicker.RangePicker.propTypes;

  static defaultProps = {
    onChange() {},
  };

  handleChange = (dateValue) => {
    const { showTime } = this.props;
    const value = !showTime ? dateValue && dateValue.map(item => item.millisecond(0).second(0).minute(0).hour(0).valueOf()) : dateValue && dateValue.map(item => item.valueOf());
    this.props.onChange(value);
  };

  render() {
    const { value } = this.props;
    const dateValue = value && value.map(item => item && moment(item));
    return <AntdDatePicker.RangePicker {...this.props} value={dateValue} onChange={this.handleChange} />;
  }
}
