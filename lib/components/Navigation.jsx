import React from 'react'
import { Link } from 'react-router'
import { signOut } from '../firebase'
import { split } from 'lodash';

const Navigation = ({ user }) => {
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
          <button
            className='auth-button sign-out-button button'
            onClick={() => signOut()}>
            Sign Out
          </button>
        </span>
        </div>
    </div>
  );
};

export default Navigation;
