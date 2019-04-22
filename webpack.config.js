var HtmlWebpackPlugin = require('html-webpack-plugin');
var path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: {
        basic: './develop-react/basic'
    },
    output: {
        path: path.resolve(__dirname, 'build/'),
        // publicPath: "/build/",
        filename: '[name]/index.js'
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /(node_modules|bower_components)/,
                loader: "babel-loader",
                options: { presets: ["@babel/env"] }
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: '../images',
                        },
                    },
                ]
            }
        ]
    },
    devServer: {
        contentBase: path.join(__dirname, "public"),
        port: 3000,
        publicPath: "http://localhost:3000/build/",
        hotOnly: true
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            filename: 'basic/index.html',
            template: 'develop-react/index.html'
        })
    ]
};
