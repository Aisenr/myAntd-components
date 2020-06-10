import React from 'react';
import { PasswordInputBox } from '../../components';
import '../../components/password-input-box/style';

export default class PasswordInputBoxExample extends React.Component {

	constructor (props) {
		super(props);
		this.state = {
			password: '',
		}
	}

	handleOnChange = (e) => {
		this.setState({
			password: e.target.value,
		})
	}

  render() {
    return (
      <div style={{ width: '1000px', fontSize: '16px', margin: '40px auto' }}>
        <PasswordInputBox value={this.state.password} onChange={this.handleOnChange} />
      </div>
    );
  }
}
