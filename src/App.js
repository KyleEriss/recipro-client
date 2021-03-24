import { Component } from 'react';
import { Switch } from 'react-router-dom';
import './App.css';
import LandingPage from './components/LandingPage/LandingPage';
import Header from './components/Header/Header'
import Search from './components/Search/Search';
import Favorites from './components/Favorites/Favorites';
import LoginPage from './components/Login/LoginPage';
import CreateAccountPage from './components/CreateAccount/CreateAccountPage';
import PrivateRoute from './components/Utils/PrivateRoute';
import PublicRoute from './components/Utils/PublicRoute';

export default class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <Header />
        </div>
        <div className="mainComponents">
          
          <Switch>

            <PublicRoute
              exact path="/" component={LandingPage}
            />

            <PublicRoute
              exact path="/login" component={LoginPage}
            />

            <PublicRoute
              exact path="/create-account" component={CreateAccountPage}
            />

            <PrivateRoute
              exact path="/search" component={Search}
            />

            <PrivateRoute
              exact path="/favorites" component={Favorites}
            />

          </Switch>

        </div>
      </div>
    );
  }
}
