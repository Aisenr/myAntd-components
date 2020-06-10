import React from 'react';
import classNames from 'classnames';
import { TimePicker, Radio } from 'antd';
import moment from 'moment';
import PropTypes from 'prop-types';

const RadioGroup = Radio.Group;

export default class TimeInterval extends React.Component {

  static propTypes = {
    value: PropTypes.arrayOf(PropTypes.number),
    defaultValue: PropTypes.arrayOf(PropTypes.number),
    restrict: PropTypes.bool,
    onChange: PropTypes.func,
  }

  static defaultProps = {
    value: [],
    defaultValue: [],
    restrict: false,
    onChange() {},
  };

  constructor(props) {
    super(props);
    const { restrict, value, defaultValue } = props;
    const newDisabled = restrict && value[0] == null && value[1] == null;
    const startTime = value[0] ? moment(value[0]) : moment(defaultValue[0]) ? moment(defaultValue[0]) : moment('00:00', 'HH:mm');
    const endTime = value[1] ? moment(value[1]) : moment(defaultValue[1]) ? moment(defaultValue[1]) : moment('00:00', 'HH:mm');
    this.state = {
      disabled: newDisabled,
      startTime,
      endTime,
      chooseValue: newDisabled ? 1 : 2,
    };
  }

  componentWillReceiveProps(nextProps) {
    const { restrict, value, defaultValue } = nextProps;
    const newDisabled = restrict && value[0] == null && value[1] == null;
    const startTime = value[0] ? moment(value[0]) : moment(defaultValue[0]) ? moment(defaultValue[0]) : moment('00:00', 'HH:mm');
    const endTime = value[1] ? moment(value[1]) : moment(defaultValue[1]) ? moment(defaultValue[1]) : moment('00:00', 'HH:mm');
    this.state = {
      disabled: newDisabled,
      startTime,
      endTime,
      chooseValue: newDisabled ? 1 : 2,
    };
  }

  onChangeStart = (time) => {
    const { onChange } = this.props;
    const { endTime } = this.state;
    const value = [time.valueOf(), endTime.valueOf()];
    onChange(value);
  }

  onChangeEnd = (time) => {
    const { onChange } = this.props;
    const { startTime } = this.state;
    const value = [startTime.valueOf(), time.valueOf()];
    onChange(value);
  }

  onChangeTimeState = (e) => {
    const { defaultValue, onChange } = this.props;
    const { startTime, endTime } = this.state;
    if (e.target.value === 2) {
      const start = startTime || moment(defaultValue[0]) || moment('00:00', 'HH:mm');
      const end = endTime || moment(defaultValue[1]) || moment('00:00', 'HH:mm');
      const value = [start.valueOf(), end.valueOf()];
      onChange(value);
    } else {
      onChange([null, null]);
    }
  }

  render() {
    const { prefixCls = 'bis-time-interval', className, restrict, style } = this.props;
    const { chooseValue, disabled, startTime, endTime } = this.state;
    return (
      <span className={classNames(prefixCls, className)} style={style}>
        {
          restrict
          &&
          <RadioGroup onChange={this.onChangeTimeState} defaultValue={1} value={chooseValue}>
            <Radio value={1}>全天</Radio>
            <Radio value={2}>限时</Radio>
          </RadioGroup>
        }
        <TimePicker disabled={disabled} onChange={this.onChangeStart} value={startTime} format="HH:mm" /> 至 <TimePicker disabled={disabled} onChange={this.onChangeEnd} value={endTime} format="HH:mm" />
      </span>
    );
  }
}
