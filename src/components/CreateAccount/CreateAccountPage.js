import React, { Component } from 'react';
import CreateAccountForm from './CreateAccountForm';
import './CreateAccountPage.css';

export default class CreateAccountPage extends Component {
  static defaultProps = {
    history: {
      push: () => {},
    },
  }

  handleRegistrationSuccess = user => {
    const { history } = this.props
    history.push('/search')
    window.location.reload(false);
  }

  render() {
    return (
      <div>
        <h2 className='createAccountText'>Create Account</h2>
        <CreateAccountForm
          onRegistrationSuccess={this.handleRegistrationSuccess}
        />
      </div>
    )
  }
}
