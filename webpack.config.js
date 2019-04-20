const path = require('path');
const HtmlWebPackPlugin = require("html-webpack-plugin");

const htmlPlugin = new HtmlWebPackPlugin({
    template: "./react/index.html",
    filename: "./index.html"
});
module.exports = {
    // Uncomment this for hot rebuild
    // watch: true,
    entry: './react/basic',
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'page-builder.bundle.js'
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
    plugins: [htmlPlugin]
};
