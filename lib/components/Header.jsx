import React from 'react'
import logo from '../images/reel.png'

const Header = () => {
  return(
    <div>
      <img src={logo} className="logo" alt="logo" />
      <h2>Welcome to Movie Keeper</h2>
    </div>
  )
}

export default Header
