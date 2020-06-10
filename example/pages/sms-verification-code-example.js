import React from 'react';
import { SmsVerificationCode } from '../../components';
import '../../components/sms-verification-code/style';

export default class SmsVerificationCodeExample extends React.Component {

  handleClick = () => {
    console.log('handleClick');
    return new Promise((resolve, reject) => {
      // resolve();
      reject();
    });
    // return false;
  }

  render() {
    return (
      <div style={{ width: '540px' }}>
        <SmsVerificationCode onClick={this.handleClick} />
      </div>
    );
  }
}
