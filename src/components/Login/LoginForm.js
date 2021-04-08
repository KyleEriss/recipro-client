import React from 'react';
import AuthApiService from '../../API-Service';
import TokenService from '../../token-service';
import { Button, Input, Required } from '../Utils/Utils';
import './LoginForm.css';

export default class LoginForm extends React.Component {

    static defaultProps = {
        onLoginSuccess: () => { }
    }

    state = { error: null }

    handleSubmitJwtAuth = ev => {
        ev.preventDefault()
        this.setState({ error: null })
        const { username, password } = ev.target

        AuthApiService.postLogin({
            username: username.value,
            password: password.value,
        })
            .then(res => {
                username.value = ''
                password.value = ''
                TokenService.saveAuthToken(res.authToken)
                this.props.onLoginSuccess()
            })
            .catch(res => {
                this.setState({ error: res.error })
            })
    }

    render() {
        const { error } = this.state
        return (
            <form
                className='LoginForm'
                onSubmit={this.handleSubmitJwtAuth}
            >
                <div role='alert'>
                    {error && <p className='red'>{error}</p>}
                </div>
                <div className='username'>
                    <label htmlFor='LoginForm__username'>
                        Username <Required />
                    </label>
                    <Input
                        name='username'
                        required
                        id='LoginForm__username'>
                    </Input>
                </div>
                <div className='password'>
                    <label htmlFor='LoginForm__password'>
                        Password <Required />
                    </label>
                    <Input
                        name='password'
                        type='password'
                        required
                        id='LoginForm__password'>
                    </Input>
                </div>
                <Button type='submit'>
                    Login
                </Button>
            </form>
        )
    }
}