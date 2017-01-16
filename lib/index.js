require ('./components/Application')
require('./style.scss');

import { render } from 'react-dom';
import React from 'react';

import Application from './components/Application';
import firebase from './firebase';

require('./style.scss');

render(<Application />, document.getElementById('application'));
