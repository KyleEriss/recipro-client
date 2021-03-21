import React, { Component } from 'react';
import CreateAccountForm from './CreateAccountForm';

export default class CreateAccountPage extends Component {
  static defaultProps = {
    history: {
      push: () => {},
    },
  }

  handleRegistrationSuccess = user => {
    const { history } = this.props
    history.push('/login')
  }

  render() {
    return (
      <div>
        <h2>Create Account</h2>
        <CreateAccountForm
          onRegistrationSuccess={this.handleRegistrationSuccess}
        />
      </div>
    )
  }
}
