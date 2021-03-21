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
                    </div>
                </div>

        )
    }
}