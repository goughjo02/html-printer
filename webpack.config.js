const path = require('path');
const HtmlWebPackPlugin = require("html-webpack-plugin");

module.exports = {
    // Uncomment this for hot rebuild
    // watch: true,
    entry:{
        basicSmall: './react/basic/small',
        basicMedium: './react/basic/medium',
        basicLarge: './react/basic/large'
    },
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: '[name]/bundle.js'
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
            filename: "./basicSmall.html",
            chunks: ['basicSmall']
        }),
        new HtmlWebPackPlugin({
            template: "./react/index.html",
            filename: "./basicMedium.html",
            chunks: ['basicMedium']
        }),
        new HtmlWebPackPlugin({
            template: "./react/index.html",
            filename: "./basicLarge.html",
            chunks: ['basicLarge']
        })
    ]
};
