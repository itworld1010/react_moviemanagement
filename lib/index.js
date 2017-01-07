import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Match, Miss } from 'react-router'


import Application from './components/Application';
import NotFound from './components/NotFound';
import Navigation from './components/Navigation';
import firebase from './firebase';

require('./style.scss');

const Root = () => {
  return(
    <BrowserRouter>
      <div>
        <Navigation />
        <Match exactly pattern="/public/" component={Application} />
        {/* <Match exactly pattern="/" component={App} />
        <Match exactly pattern="/about" component={About} />
        <Match exactly pattern="/contact" component={Contact} />*/}
        <Miss component={NotFound} />
      </div>
    </BrowserRouter>
  )
}

render(<Root />, document.querySelector("#application"))
