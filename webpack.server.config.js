
// webpack-dev-server --config .\webpack.config.js
// npm run webpack-dev-server

process.env.NODE_ENV = 'development';

const path = require('path');

const config = require('./webpack.config.js');

config.devServer = {
    contentBase : path.join(__dirname, 'dist'),
    compress : true, port : 9900,
    open : true,

    publicPath : '/',
    index : 'app.html'
};

module.exports = config;