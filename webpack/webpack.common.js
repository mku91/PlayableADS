const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require("terser-webpack-plugin");
const webpack = require('webpack');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
    mode: 'production',
    entry: './src/index.js',
    optimization: {
        minimizer: true,
        minimizer: [new TerserPlugin()]
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, '../dist')
    },
    target: 'web',
    plugins: [
        new CleanWebpackPlugin(),
        new CopyPlugin({
            patterns: [
                {
                    from: 'assets/',
                    to: 'assets/'
                }
            ]
        }),
        new HtmlWebpackPlugin({
            title: 'Playable',
            minify: false,
        }),
        new webpack.ProgressPlugin()
    ]
}