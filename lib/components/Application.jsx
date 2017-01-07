import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Match, Miss } from 'react-router'

import Homepage from './Homepage';
import MyMovies from './MyMovies';
import SignIn from './SignIn';
import NotFound from './NotFound';
import Navigation from './Navigation';
import firebase from '../firebase';

require('../style.scss');

const Root = () => {
  return(
    <BrowserRouter>
      <div>
        <Match exactly pattern="/" component={Homepage} />
        {/* <Match exactly pattern="/" component={MyMovies} /> */}
        {/* <Match exactly pattern="/" component={App} />
        <Match exactly pattern="/about" component={About} />
        <Match exactly pattern="/contact" component={Contact} />*/}
        <Miss component={NotFound} />
      </div>
    </BrowserRouter>
  )
}

render(<Root />, document.querySelector("#application"))
