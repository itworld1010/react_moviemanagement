import React from 'react'
import { Link } from 'react-router'
import { signIn, signOut } from '../firebase'
import { split } from 'lodash';

const Navigation = ({ user }) => {
  let currentUser;
  let firstName;
  if (user !== null) {
    currentUser = user.displayName
    firstName = split(user.displayName, ' ')
  }
  return (
    <div className="navigation">
      <h1>Movie Keeper</h1>
        <div className="nav-container">
        <ul>
        <li className="nav-link"><Link to="/">My Movies</Link></li>
          <li className="nav-link"><Link to="/explore">Explore</Link></li>
          <li className="nav-link"><Link to="/search">Search</Link></li>
          {/* <li className="nav-link"><Link to="/about">About</Link></li> */}
        </ul>
        <span className="log-in"><button className='auth-button sign-out-button button' onClick={()=> signOut()}>Sign Out</button>
        </span>
        </div>
    </div>
  )
}

export default Navigation
