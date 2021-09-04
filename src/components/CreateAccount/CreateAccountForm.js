import React from 'react';
import { Button, Input, Required } from '../Utils/Utils'
import AuthApiService from '../../API-Service';
import TokenService from '../../token-service';
import './CreateAccountForm.css';

export default class CreateAccountForm extends React.Component {
    static defaultProps = {
        onRegistrationSuccess: () => { }
    }

    state = { 
        error: null,
        loggedIn: false
     }

    handleSubmit = ev => {
        ev.preventDefault()
        this.setState({error: ''})
        const { username, password, passwordConfirm } = ev.target

        if (password.value !== passwordConfirm.value) {
            return this.setState({ error: 'Passwords do not match' });
        }

        this.setState({ error: null })
        AuthApiService.postUser({
            username: username.value,
            password: password.value,
        })
            .then(user => {
                username.value = ''
                password.value = ''
                TokenService.saveAuthToken(user.authToken)
                this.setState({loggedIn: true})
                setTimeout(() => {
                    this.props.onRegistrationSuccess()
                }, 2000);
            })
            .catch(res => {
                this.setState({ error: res.error })
            })
    }

    render() {
        const { error } = this.state
        return (
            <form
                className='RegistrationForm'
                onSubmit={this.handleSubmit}
            >
                <div role='alert'>
                    {error && <p className='errorMessage'>{error}</p>}
                </div>
                <div>
                    {this.state.loggedIn ? (
                        <div className='successMessage'>Success! Redirecting...</div>
                    ) : (
                        <div></div>
                    )}
                </div>

                <div className='username'>
                    <label htmlFor='RegistrationForm__username'>
                        Username <Required />
                    </label>

                    <Input
                        name='username'
                        placeholder='enter username'
                        type='text'
                        required
                        id='RegistrationForm__username'>
                    </Input>
                </div>

                <div className='password'>
                    <label htmlFor='RegistrationForm__password'>
                        Password <Required />
                    </label>
                    <Input
                        name='password'
                        placeholder='capletter/number/symbol required'
                        type='password'
                        required
                        id='RegistrationForm__password'>
                    </Input>

                    <label htmlFor='RegistrationForm__passwordConfirm'>
                        Password <Required />
                    </label>
                    <Input
                        name='passwordConfirm'
                        placeholder='confirm password'
                        type='password'
                        required
                        id='RegistrationForm__passwordConfirm'>
                    </Input>
                </div>

                <Button type='submit'>Register</Button>

            </form>
        )
    }
}
