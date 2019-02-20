/*
alias npm-exec='PATH=$(npm bin):$PATH'
*/
var webpack = require('webpack');
var path = require('path');
//const plugins = require('./plugins');
const loaders = require('./loaders');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const styleLintPlugin = require('stylelint-webpack-plugin');
module.exports = {
    context: path.join(__dirname, "src"),
    devtool: "#eval-sourcemap",
    entry: "./main.js",

    devServer: {
        historyApiFallback: true,
        hot: true,
        inline: true,
        host: 'localhost', // Defaults to `localhost`
        port: 8080, // Defaults to 8080
        proxy: {
            '/api': {
                target: 'http://localhost:3000/',
                secure: false,
                pathRewrite: { '^/api': '' },
                changeOrigin: true,
            }
        }
    },

    module: {
        rules: [{
                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader',
                query: {
                    presets: ["babel-preset-env", "react"],
                    plugins: ["transform-object-rest-spread", "transform-class-properties", "babel-plugin-react-css-modules"],
                },
            },
            loaders.CSSLoader,
        ]
    },
    plugins: [
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: "[name].css",
      chunkFilename: "[id].css"
    }),
    new styleLintPlugin({
      configFile: '.stylelintrc',
      context: 'src',
      files: '**/*.css',
      failOnError: false,
      quiet: false,
    })
  
  ],
    resolve: {
        extensions: ['.js', '.jsx'],
    },
    output: {
        path: __dirname + "/src/",
        filename: "mainCreated.js"
    },
};