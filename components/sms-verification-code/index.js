import React from 'react';
import { Button } from 'antd';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import InputItem from '../input-item';

export default class SmsVerificationCode extends React.Component {

  static propTypes = {
    onClick: PropTypes.func,
    seconds: PropTypes.number,
  }

  static defaultProps = {
    onClick() {},
    seconds: 60,
  }

  constructor(props) {
    super(props);
    this.state = {
      seconds: props.seconds,
      showSecond: false,
      sCodeBtnDisabled: false,
    };
  }

  componentWillUnmount() {
    window.clearInterval(this.interval);
  }

  handleClick = () => {
    const re = this.props.onClick();
    if (typeof re === 'boolean') {
      this.countdown();
    } else {
      re.then(() => {
        this.countdown();
      }).catch(() => {

      });
    }
  }

  countdown = () => {
    this.setState({
      showSecond: true,
      seconds: 60,
      sCodeBtnDisabled: true,
    });
    let seconds = this.state.seconds;
    this.interval = window.setInterval(() => {
      seconds -= 1;
      this.setState({
        seconds,
      });
      if (seconds <= 0) {
        this.setState({
          seconds: 60,
          sCodeBtnDisabled: false,
          showSecond: false,
        });
        window.clearInterval(this.interval);
      }
    }, 1000);
  }

  render() {
    const { prefixCla = 'bis-sMS-verification-code', className, style, onClick, ...rest } = this.props;
    return (
      <div className={classNames(prefixCla, className)} style={style}>
        <InputItem className={`${prefixCla}-input`} {...rest} />
        <Button className={`${prefixCla}-btn`} onClick={this.handleClick} disabled={this.state.sCodeBtnDisabled}>
          {this.state.sCodeBtnDisabled ? '重新获取' : '获取验证码'}{this.state.showSecond && `  (${this.state.seconds}秒)`}
        </Button>
      </div>
    );
  }
}
