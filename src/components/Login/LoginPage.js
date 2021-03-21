import React from 'react';
import LoginForm from './LoginForm';

export default class LoginPage extends React.Component {
    static defaultProps = {
        location: {},
        history: {
            push: () => { },
        },
    }

    handleLoginSuccess = user => {
        const { history } = this.props
        history.push('/search')
        window.location.reload(false);
    }

    render() {
        return (
            <div className='LoginPage'>
                <h2>Login</h2>
                <LoginForm
                    onLoginSuccess={this.handleLoginSuccess}
                />
            </div>
        )
    }
}
