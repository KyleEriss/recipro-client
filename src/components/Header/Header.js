import React from 'react';
import NavLinks from './NavLinks';
import TokenService from '../../token-service';
import AuthApiService from '../../API-Service';
import './Header.css';

export default class Header extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loggedIn: false
        }
    }

    state = {
        favoritesItems: null
    }

    componentDidMount() {
        this.setState({
            loggedIn: TokenService.hasAuthToken()
        })
        setInterval(() => {
            if (this.state.loggedIn) {
                AuthApiService.getRecipes().then((res) => {
                    this.setState({ favoritesItems: res.length })
                })
            }
        }, 1000);
    }

    handleLogoutClick = () => {
        TokenService.clearAuthToken()
        window.location.reload(false);
    }

    render() {
        return (
            <div className="borderClass">
                <div className="App-header">
                    <div className="title" data-text="Recipro">
                        <NavLinks.ReciproHeaderLink />
                    </div>
                    <ul className="itemDouble">
                        <li className="itemSearch">
                            <NavLinks.SearchLink />
                        </li>

                        <li className="itemFavorites">
                            <NavLinks.FavoritesLink />
                            {this.state.favoritesItems ? (
                                <div className='numberOfItems'>
                                    {this.state.favoritesItems}
                                </div>

                            ) : (
                                <div></div>
                            )}
                        </li>

                        <li className="itemLogin">
                            {TokenService.hasAuthToken()
                                ? <NavLinks.LogoutLink logout={this.handleLogoutClick} />
                                : <NavLinks.LoginLink />}
                        </li>
                    </ul>
                </div>
            </div>





        )
    }
}