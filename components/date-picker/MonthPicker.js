import React from 'react';
import { DatePicker as AntdDatePicker } from 'antd';
import moment from 'moment';
import 'moment/locale/zh-cn';

moment.locale('zh-cn');

export default class MonthPicker extends React.PureComponent {

  static propTypes = AntdDatePicker.RangePicker.propTypes;

  static defaultProps = {
    onChange() {},
  };

  handleChange = (dateValue) => {
    this.props.onChange(dateValue && dateValue.millisecond(0).second(0).minute(0).hour(0).date(1).valueOf());
  };

  render() {
    const { value } = this.props;
    return <AntdDatePicker.MonthPicker placeholder="请选择月份" {...this.props} value={value && moment(value)} onChange={this.handleChange} />;
  }
}
