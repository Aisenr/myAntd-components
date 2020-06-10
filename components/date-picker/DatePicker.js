import React from 'react';
import { DatePicker as AntdDatePicker } from 'antd';
import moment from 'moment';

export default class DatePicker extends React.PureComponent {

  static propTypes = AntdDatePicker.propTypes;

  static defaultProps = {
    onChange() {},
  };

  handleChange = (dateValue) => {
    const value = dateValue && (this.props.showTime ? dateValue.millisecond(0).valueOf() : dateValue.millisecond(0).second(0).minute(0).hour(0).valueOf());
    this.props.onChange(value);
  };

  render() {
    const { value } = this.props;
    const dateValue = value && moment(value);
    return <AntdDatePicker {...this.props} value={dateValue} onChange={this.handleChange} />;
  }
}
