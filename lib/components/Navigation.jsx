import React from 'react'
import { Link } from 'react-router'
import { split } from 'lodash';
import { signIn, signOut } from '../firebase'
import gravity from '../images/1.mp4'


const Navigation = ({ user }) => {
  let currentUser;
  let firstName;
  if (user !== null) {
    currentUser = user.displayName
    firstName = split(user.displayName, ' ')
  }

  return(
    <div className="Navigation">
      <div className='active-user'>{user ?
        <div>
        <ul>
          <li className="nav-link"><Link to="/">Home</Link></li>
          <li className="nav-link"><Link to="/mymovies">My Movies</Link></li>
          <li className="nav-link"><Link to="/about">About</Link></li>
          <li className="nav-link"><Link to="/search">Search</Link></li>
        </ul>
        <span className="log-in">Logged in as <span className="bold">{firstName[0]}</span><button className='auth-button button' onClick={()=> signOut()}>Sign Out</button>
        </span>
        </div>
        :
        <div>
        <div className="video-background" >
          <video id="my-video" className="video" autoPlay="autoplay" loop="loop" muted >
            <source src={gravity} type="video/mp4" />
          Your browser doesn't support HTML5 video. Here's a <a href="#">link</a> to the video
          </video>
          <div className="shadow"></div>
        </div>
        <button className='sign-in-btn' onClick={() => signIn()}>Sign In</button>
        </div>}
      </div>
    </div>
  )
}

export default Navigation
