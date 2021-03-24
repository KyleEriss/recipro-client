import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../Utils/Utils';
import './LandingForm.css';

export default class LandingForm extends React.Component {

    handSubmit = event => {
        this.props.handleRedirect()
    }

    render() {
        return (
                <div className="loginLanding">
                    <Link to='/create-account'>
                        <Button>Create Account</Button>
                    </Link>

                    <div className="landingFormClass">
                        Already have an account? Log in <Link to='/login'>here</Link>
                        <br />
                        <br />Just browsing?
                        <br />
                        <br />Feel free to login with these demo credentials
                        <br />
                        <br />username: TestUser
                        <br />password: Password1!
                    </div>
                </div>

        )
    }
}