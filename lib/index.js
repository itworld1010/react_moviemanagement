import React from 'react';
import { render } from 'react-dom';

import Application from './components/Application';
import firebase from './firebase';

require('./style.scss');

render(<Application />, document.getElementById('application'));
