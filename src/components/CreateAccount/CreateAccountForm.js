import React from 'react';
import { Button, Input, Required } from '../Utils/Utils'
import AuthApiService from '../../API-Service';

export default class CreateAccountForm extends React.Component {
    static defaultProps = {
        onRegistrationSuccess: () => { }
    }

    state = { error: null }

    handleSubmit = ev => {
        ev.preventDefault()
        const { username, password } = ev.target

        this.setState({ error: null })
        AuthApiService.postUser({
            username: username.value,
            password: password.value,
        })
            .then(user => {
                username.value = ''
                password.value = ''
                this.props.onRegistrationSuccess()
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
                    {error && <p className='red'>{error}</p>}
                </div>

                <div className='username'>
                    <label htmlFor='RegistrationForm__username'>
                        Username <Required />
                    </label>

                    <Input
                        name='username'
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
                        type='password'
                        required
                        id='RegistrationForm__password'>
                    </Input>
                </div>

                <Button type='submit'>Register</Button>

            </form>
        )
    }
}