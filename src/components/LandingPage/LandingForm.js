import React from 'react';
import { Link } from 'react-router-dom';
import './LandingForm.css';

export default class LandingForm extends React.Component {

    handSubmit = event => {
        this.props.handleRedirect()
    }

    render() {
        return (
                <div className="loginLanding">

                    <div className="landingFormClass">
                        Don't have an account? Create an account <Link to='/create-account'style={{ color: 'white' }}>here</Link>
                    </div>
                </div>

        )
    }
}