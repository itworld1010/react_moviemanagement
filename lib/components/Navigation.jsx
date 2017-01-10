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
        <div className="nav-container">
        <ul>
          <li className="nav-link"><Link to="/">Home</Link></li>
          <li className="nav-link"><Link to="/mymovies">My Movies</Link></li>
          <li className="nav-link"><Link to="/about">About</Link></li>
          <li className="nav-link"><Link to="/search">Search</Link></li>
        </ul>
        <span className="log-in">Logged in as <span className="bold">{firstName[0]}</span><button className='auth-button button' onClick={()=> signOut()}>Sign Out</button>
        </span>
        </div>
    </div>
  )
}

export default Navigation
