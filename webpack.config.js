
// webpack --config .\webpack.config.js
// npm run webpack

process.env.NODE_ENV = 'development';

const path = require('path');

const webpack = require('webpack');

const cleanWebpackPlugin = require('clean-webpack-plugin');
const htmlWebpackPlugin = require('html-webpack-plugin');

const uglifyjsWebpackPlugin = require('uglifyjs-webpack-plugin');

const config = {
    entry : {},
    output : {},
    module : {
        rules : []
    },
    plugins : [],
    resolve : { modules : [] }
};

// entry setup
config.context = path.resolve(__dirname, 'src');
config.entry.app = './app.js';

// output setup
config.output.filename = '[name].js';
config.output.path = path.resolve(__dirname, 'dist');

// module setup
config.module.rules.push({
    test : /\.js$/, 
    enforce : 'pre',
    exclude : /node_modules/,
    use : [
        { loader : 'eslint-loader', 
            options : {
                extends : [
                    'eslint:recommended'
                ],
                env : { 
                    browser : true, node : true, es6 : true
                },
                parserOptions : {
                    ecmaVersion : 6, sourceType : 'module'
                },
                //fix : true,
                rules : { quotes : ['error', 'single'] }
            }
        }
    ]
});

config.module.rules.push({
    test : /\.js$/, 
    exclude : /node_modules/,
    use : [
        { loader : 'babel-loader', 
            options : { 
                presets : [ ['airbnb', { module : false, target : { chrome : 50, explorer : 10, firefox : 45 } }] ] 
            }
        }
    ]
});

// plugins setup
config.plugins.push(new cleanWebpackPlugin(['dist']));
config.plugins.push(new webpack.DefinePlugin({
    'process.env.NODE_ENV' : JSON.stringify(process.env.NODE_ENV)
}));
config.plugins.push(new htmlWebpackPlugin({
    title : 'eslint, mocha, jest, gulp, uglify, polyfill test',
    template : path.resolve(__dirname, 'public', 'app.html'),

    filename : 'app.html'
}));
config.plugins.push(new webpack.NamedModulesPlugin());
config.plugins.push(new webpack.HotModuleReplacementPlugin());
config.plugins.push(new uglifyjsWebpackPlugin());

// resolve setup
config.resolve.modules.push('node_modules');

// watch setup
config.watch = true;
config.watchOptions = {
    ignored: [/node_modules/, 'dist']
};

// devtool
config.devtool = 'inline-source-map';

module.exports = config;