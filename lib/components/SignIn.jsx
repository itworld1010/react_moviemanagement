// see React Router https://react-router.now.sh/auth-workflow for how to set up login page.




import React, { Component } from 'react'
import firebase, { usersFromDatabase, signIn, signOut } from '../firebase';


export default class SignIn extends Component {
  constructor() {
    super()
    this.state = {
      user: null
    }
  }


  render(){
    return(
      <div className='active-user'>{user ?
        <p>Logged in as <span className="bold">{firstName[0]}</span> ({user.email})  <button className='auth-button button' onClick={()=> signOut()}>Sign Out</button>
        </p>
        : <button className='auth-button' onClick={() => signIn()}>Sign In</button> }
      </div>
    )
  }
}
