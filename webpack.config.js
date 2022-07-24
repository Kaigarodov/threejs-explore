const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const DevServerWebpack = require('webpack-dev-server')

module.exports = {
    entry: path.resolve(__dirname, './src/index.js'),

    output: {
        path: path.resolve(__dirname, './dist'),
        filename: '[name].bundle.js',
        clean: true
    },

    plugins: [
        new HtmlWebpackPlugin({ template: './src/index.html' })
    ],

    devServer: {
        hot: true
    },

    devtool: 'source-map',

    mode: 'development'

}