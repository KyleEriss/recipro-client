import React from 'react';
import LoginForm from './LoginForm';
import { Link } from 'react-router-dom';
import './LoginPage.css';

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
                <h2 className="loginText">
                    Login
                </h2>
                Just browsing? Use the following demo credentials:
                <br />username: TestUser
                <br />password: Password1!
                <br />
                <LoginForm
                    onLoginSuccess={this.handleLoginSuccess}
                />
                <div className='needAccountButton'>
                    Don't have an account? Create an account <Link to='/create-account' style={{ color: 'white' }}>here</Link>
                </div>
            </div>
        )
    }
}
