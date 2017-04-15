const path = require('path');

module.exports = {
  entry: {
    main: ['babel-polyfill', './lib/index.js']
  },
  output: {
    path: path.join(__dirname, '/public'),
    filename: '[name].bundle.js'
  },
  devServer: {
    contentBase: './public',
    historyApiFallback: {
     index: 'index.html'
    },
    hot: true
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel',
        query: {
          presets: ['es2015', 'react'],
        },
      },
      {
        test: /\.mp4$/,
        loader: 'file',
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loaders: [
          'file?hash=sha512&digest=hex&name=[hash].[ext]',
          'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false',
        ],
      },
      { test: /\.css$/, loader: 'style!css' },
      { test: /\.scss$/, loader: 'style!css!sass' },
    ],
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.json', '.scss', '.css'],
  },
};
