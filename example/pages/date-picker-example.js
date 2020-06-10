import React from 'react';
import { DatePicker } from '../../components';
import '../../components/date-picker/style';

export default class DatePickerExample extends React.Component {

  state = {
    dateValue: 1522324232044,
    rangePickerValue: [1520337286204, 1524311686204],
  }

  handleDatePickerChange = (value) => {
    this.setState({
      dateValue: value,
    });
  }

  handleRangePickerChange = (value) => {
    console.log(value);
    this.setState({
      rangePickerValue: value,
    });
  }

  handleMonthPickerChange = (value) => {
    console.log(value);
    this.setState({
      monthPickerValue: value,
    });
  }

  render() {
    const { dateValue, rangePickerValue, monthPickerValue } = this.state;
    return (
      <div style={{ textAlign: 'center', padding: '40px', fontSize: '40px' }}>
        DatePicker: <DatePicker value={dateValue} onChange={this.handleDatePickerChange} />
        <br />
        RangePicker: <DatePicker.RangePicker value={rangePickerValue} showTime onChange={this.handleRangePickerChange} />
        <br />
        MonthPicker: <DatePicker.MonthPicker value={monthPickerValue} onChange={this.handleMonthPickerChange} />
        <br />
      </div>
    );
  }
}
