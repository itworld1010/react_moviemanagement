import React from 'react'
import { Link } from 'react-router'
import { signIn } from '../firebase'
import { split } from 'lodash';
import gravity from '../images/1.mp4'

const Login = ({ user }) => {

  return (
    <div>
      <div className="video-background" >
        <video id="my-video" className="video" autoPlay="autoplay" loop="loop" muted >
          <source src={gravity} type="video/mp4" />
          Your browser doesn't support HTML5 video. Here's a <a href="#">link</a> to the video
        </video>
        <div className="shadow"></div>
      </div>
        <button className='sign-in-btn' onClick={() => signIn()}><span className="title-button">MOVIE KEEPER</span><br/>Click to sign in with Google</button>
    </div>
  );
};

export default Login;
