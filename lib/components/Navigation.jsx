import React from 'react'
import { Link } from 'react-router-dom'
import { signOut } from '../firebase'
import { split } from 'lodash';

const Navigation = ({ user, showMenu, toggleMobileMenu }) => {
  let currentUser;
  let firstName;
  if (user !== null) {
    currentUser = user.displayName;
    firstName = split(user.displayName, ' ');
  }
  return (
    <div className="navigation">
      <Link className="movie-keeper-home" to="/"><h1>Movie Keeper</h1></Link>
        <div className="nav-container">
        <p className="nav-link"><Link to="/">My Movies</Link></p>
        <p className="nav-link"><Link to="/explore">Explore</Link></p>
        <p className="nav-link"><Link to="/search">Search</Link></p>
        <span>
          <img
            className='auth-button sign-out-button button'
            onClick={() => signOut()}
            src="https://firebasestorage.googleapis.com/v0/b/moviekeeper-65458.appspot.com/o/signout.png?alt=media&token=76f46743-9f75-4ea7-8b78-41e9ccf4e25a"
          >
          </img>
        </span>
        </div>
        { showMenu ?
          <div>
            <div className="mobile-menu-background" />
            <div className="mobile-menu" onClick={() => toggleMobileMenu()}>
              <button onClick={() => toggleMobileMenu()} className="mobile-nav-link"><Link  to="/">My Movies</Link></button>
              <button onClick={() => toggleMobileMenu()} className="mobile-nav-link"><Link  to="/explore">Explore</Link></button>
              <button onClick={() => toggleMobileMenu()} className="mobile-nav-link"><Link  to="/search">Search</Link></button>
              <button onClick={() => signOut()} className="mobile-nav-link"><Link to="/search">Sign Out</Link></button>
            </div>
          </div>
          :
          <div className="mobile-menu-text" onClick={() => toggleMobileMenu() }>Menu</div>
        }
    </div>
  );
};

export default Navigation;
