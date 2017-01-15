import React, { Component } from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Match, Miss } from 'react-router'
import { signIn, signOut } from '../firebase'
import { split } from 'lodash';

import SearchMovie from './SearchMovie';
import Upcoming from './Upcoming';
import MyMovies from './MyMovies';
import NotFound from './NotFound';
import Navigation from './Navigation';
import firebase from '../firebase';
import gravity from '../images/1.mp4'
import reel from '../images/reel.png'

class Application extends Component{
  constructor(){
    super()
    this.state = {
      user: null,
      movieResults: []
    }
  }

  componentWillMount() {
    firebase.auth().onAuthStateChanged(user => this.setState({ user }));
  }

  render() {
    let { user } = this.state
    let currentUser;
    let firstName;
    if (user !== null) {
      currentUser = user.displayName
      firstName = split(user.displayName, ' ')
    }

    return(
      <BrowserRouter>
        <div>
          { this.state.user ?
            <div>
              <Navigation user={this.state.user}/>
              <Match exactly pattern="/" render={() => <MyMovies user={this.state.user}/>}/>
              <Match exactly pattern="/explore" render={() => <Upcoming user={this.state.user}/>} />
              <Match exactly pattern="/search" render={() => <SearchMovie user={this.state.user}/>} />
              <Miss component={NotFound} />
            </div>
          :
            <div>
              <div className="video-background" >
                <video id="my-video" className="video" autoPlay="autoplay" loop="loop" muted >
                  <source src="https://11-lvl3-pdl.vimeocdn.com/01/178/4/100893658/271010377.mp4?expires=1484262948&token=0a651f963359e58da5521" type="video/mp4" />
                  Your browser doesn't support HTML5 video. Here's a <a href="#">link</a> to the video
                </video>
                <div className="shadow"></div>
              </div>
                <button className='sign-in-btn' onClick={() => signIn()}><span className="title-button">MOVIE KEEPER</span><br/>Click to sign in with Google</button>
            </div>
          }
        </div>
      </BrowserRouter>
    )
  }
}

render(<Application />, document.querySelector("#application"))
