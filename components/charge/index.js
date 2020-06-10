import React from 'react';
import classNames from 'classnames';
import { InputNumber, Radio } from 'antd';
import PropTypes from 'prop-types';

const RadioGroup = Radio.Group;

class Charge extends React.Component {

  constructor(props) {
    super(props);
    const moneyStatus = props.restrict && (props.value == 0 || props.value === undefined);
    this.state = {
      disabled: moneyStatus,
      amount: props.value || props.defaultValue,
      chargeStatus: moneyStatus ? 'free' : 'charge',
    };
  }

  onChangeChargeStatus = (event) => {
    this.setState({
      chargeStatus: event.target.value,
      disabled: event.target.value === 'free',
    });
    if (event.target.value === 'free') {
      this.props.onChange(null);
    } else {
      this.props.onChange(this.state.amount);
    }
  }

  chargeOnchange = (value) => {
    this.props.onChange(value);
    this.setState({
      amount: value,
    });
  }

  render() {
    const { prefixCls = 'bis-charge', className, restrict } = this.props;
    return (
      <span className={classNames(prefixCls, className)} style={this.props.style}>
        {
          restrict
          &&
          <RadioGroup onChange={this.onChangeChargeStatus} value={this.state.chargeStatus}>
            <Radio value="free">免费</Radio>
            <Radio value="charge">收费</Radio>
          </RadioGroup>
        }
        <InputNumber
          {...this.props}
          min={this.props.min || 0}
          step={0.1}
          value={this.state.amount}
          disabled={this.state.disabled}
          onChange={this.chargeOnchange}
        />
        <span>元/次</span>
      </span>
    );
  }
}

export default Charge;

Charge.defaultProps = {

};

Charge.propTypes = {
  className: PropTypes.string,
  style: PropTypes.object,
  amount: PropTypes.number,
};
