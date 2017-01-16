require('babel-register')({
  presets: ['react', 'es2015']
});

require('babel-polyfill');

global.document = require('jsdom').jsdom(`
  <head>
    <meta charset='UTF-8'>
    <title>Shoot The Breeze</title>
  </head>
  <body>
    <div id='application'></div>
  </body>
`);

global.window = document.defaultView;
global.navigator = window.navigator;
