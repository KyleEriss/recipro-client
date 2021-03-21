import React from 'react';
import NavLinks from './NavLinks';
import './Header.css';
import TokenService from '../../token-service';

export default class Header extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loggedIn: false
        }
    }

    handleLogoutClick = () => {
        TokenService.clearAuthToken()
        window.location.reload(false);
    }

    componentDidMount() {
        this.setState({
            loggedIn: TokenService.hasAuthToken()
        })
    }

    render() {
        return (

            <div className="App-header">
                <div className="title" data-text="Reconnaissound">
                    <NavLinks.ReciproHeaderLink />
                </div>

                <ul className="itemDouble">
                    <li className="itemSearch">
                        <NavLinks.SearchLink />
                    </li>
                    <li className="itemFavorites">
                        <NavLinks.FavoritesLink />
                    </li>
                    <li className="itemLogin">
                        {TokenService.hasAuthToken()
                            ? <NavLinks.LogoutLink logout={this.handleLogoutClick} />
                            : <NavLinks.LoginLink />}
                    </li>
                </ul>
            </div>


        )
    }
}