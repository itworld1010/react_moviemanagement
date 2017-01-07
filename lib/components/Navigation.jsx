import React from 'react'
import { Link } from 'react-router'
import { split } from 'lodash';


const Navigation = ({ user }) => {
  let currentUser;
  let firstName;
  if (user !== null) {
    currentUser = user.displayName
    firstName = split(user.displayName, ' ')
  }

  return(
    <div className="Navigation">
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/mymovies">My Movies</Link></li>
        <li><Link to="/about">About</Link></li>
      </ul>
      <div className='active-user'>{user ?
        <p>Logged in as <span className="bold">{firstName[0]}</span> ({user.email})  <button className='auth-button button' onClick={()=> signOut()}>Sign Out</button>
        </p>
        : <button className='auth-button' onClick={() => signIn()}>Sign In</button> }
      </div>
    </div>
  )
}

export default Navigation
