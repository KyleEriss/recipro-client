import { Link } from 'react-router-dom';

const NavLinks = {

    ReciproHeaderLink() {
        return (
            <div>
                <Link to='/' style={{ textDecoration: 'none', color: 'white'}}>Recipro</Link>
            </div>
        )
    },

    SearchLink() {
        return (
            <div>
                <Link to='/search' style={{ textDecoration: 'none', color: 'white' }}>Search</Link>
            </div>
        )
    },

    FavoritesLink() {
        return (
            <div>
                <Link to='/favorites' style={{ textDecoration: 'none', color: 'white' }}>Favorites</Link>
            </div>
        )
    },

    LogoutLink(props) {
        return (
            <div>
                <Link onClick={props.logout} to='/' style={{ textDecoration: 'none', color: 'white' }}>Logout</Link>
            </div>
        )
    },

    LoginLink() {
        return (
            <div>
                <Link to='/Login' style={{ textDecoration: 'none', color: 'white' }}>Login</Link>
            </div>
        )
    }
}

export default NavLinks

