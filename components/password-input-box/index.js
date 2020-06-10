import React from 'react';
import { Input } from 'antd';
import PropTypes from 'prop-types';
import classNames from 'classnames';

/**
 * 密码输入框组件
 * @description 密码输入框
 * @export  PasswordInputBox
 * @date    2017-09-28
 * @author  zbs
 */

const sizeConfig = {
  large: '40px',
  default: '32px',
  small: '24px',
};

class PasswordInputBox extends React.Component {

  static propTypes = {
    placeholder: PropTypes.string,
    onChange: PropTypes.func,
  };

  static defaultProps = {
    placeholder: '字母、数字和符号',
    size: 'default',
    onChange() {},
  }

  constructor(props) {
    super(props);
    this.state = {
      value: '',
      status: '',
    };
  }

  onChangePassword = (e) => {
    const pwd = e.target.value;
    const score = this.calculateScores(pwd);
    if (score >= 60) {
      this.state.status = 'strong';
    } else if (score >= 25) {
      this.state.status = 'medium';
    } else {
      this.state.status = 'weak';
    }
    this.props.onChange(e);
  }

  calculateScores = (value) => {
    let nowScores = 0; // 密码得分
    const totleLength = value.length;// 总长度

    /*
     * 密码长度
     */
    if (totleLength <= 4) {
      nowScores += 5;
    } else if (totleLength > 4 && totleLength <= 7) {
      nowScores += 10;
    } else {
      nowScores += 25;
    }

    /*
     * 字母
     */
    let isTwoKinds = false;
    if (value.match(/[A-Z]/) != null && value.match(/[a-z]/) != null) {
      isTwoKinds = true;
      nowScores += 20;
    } else if (value.match(/[A-Z]/) != null || value.match(/[a-z]/) != null) {
      nowScores += 10;
    }
    const alphabetLength = value.replace(/[^a-zA-Z]/g, '').length;// 将字母剔除

    /*
     * 数字
     */
    const numLength = value.replace(/\D/g, '').length;// 剔除数字
    if (numLength > 0 && numLength < 3) {
      nowScores += 10;
    } else if (numLength >= 3) {
      nowScores += 20;
    }

    // 符号
    const symbol = totleLength - alphabetLength - numLength;// 符号长度
    if (value != null && symbol === 1) {
      nowScores += 10;
    } else if (value != null && symbol > 1) {
      nowScores += 25;
    }

    // 奖励
    if (isTwoKinds && numLength > 0 && alphabetLength > 0 && symbol > 0) {
      nowScores += 5;
    } else if (numLength > 0 && alphabetLength > 0 && symbol > 0) {
      nowScores += 3;
    } else if (numLength > 0 && alphabetLength > 0) {
      nowScores += 2;
    }

    return nowScores;
  }

  render() {
    const { prefixCls = 'bis-password-input-box', className, size } = this.props;
    return (
      <div style={this.props.style} className={classNames(prefixCls, className)}>
        <Input
          className={`${prefixCls}-input-${size}`}
          type="password"
          placeholder={this.props.placeholder}
          {...this.props}
          onChange={this.onChangePassword}
        />
        <div className={classNames(`${prefixCls}-status`, this.state.status === 'weak' ? (`${prefixCls}-password`) : null)} style={{ height: sizeConfig[size], lineHeight: sizeConfig[size], width: sizeConfig[size] }} >弱</div>
        <div className={classNames(`${prefixCls}-status`, this.state.status === 'medium' ? (`${prefixCls}-password`) : null)} style={{ height: sizeConfig[size], lineHeight: sizeConfig[size], width: sizeConfig[size] }}>中</div>
        <div className={classNames(`${prefixCls}-status`, this.state.status === 'strong' ? (`${prefixCls}-password`) : null)} style={{ height: sizeConfig[size], lineHeight: sizeConfig[size], width: sizeConfig[size] }}>强</div>
      </div>
    );
  }
}

export default PasswordInputBox;
