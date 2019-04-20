const path = require('path');
const HtmlWebPackPlugin = require("html-webpack-plugin");

module.exports = {
    // Uncomment this for hot rebuild
    // watch: true,
    entry:{
        basic: './react/basic'
    },
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: '[name].js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    'file-loader'
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: "./react/index.html",
            filename: "./basic.html",
            chunks: ['basic']
        })
    ]
};
