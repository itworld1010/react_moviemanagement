import React from 'react'
import { Link } from 'react-router'

const Navigation = () => {
  return(
    <div className="Navigation">
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/mymovies">My Movies</Link></li>
        <li><Link to="/about">About</Link></li>
      </ul>
    </div>
  )
}

export default Navigation
