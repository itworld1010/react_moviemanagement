import React from 'react'
import { Link } from 'react-router-dom'
import { signIn } from '../firebase'
import { split } from 'lodash';

const Login = ({ user }) => {

  return (
    <div className="sign-in-container">
      <button className='sign-in-btn' onClick={() => signIn()}><span className="title-button">MOVIE KEEPER</span><br/>Click to sign in with Google</button>
    </div>
  );
};

export default Login;
