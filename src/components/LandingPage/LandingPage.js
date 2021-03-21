import React, { Component } from 'react';
import LandingForm from './LandingForm';
import './LandingPage.css'

export default class LandingPage extends Component {

  render() {

    return (

      <div className="landingPageClass">
        <div className="welcomeLanding">
          Welcome to Recipro
        </div>
        <div className="searchLanding">
          Explore new recipes
        </div>
        <div className="favoritesLanding">
          Save favorite recipes
        </div>
        <LandingForm />
      </div>

    )

  }
}
