const path = require('path');
// Handles the css files
const ExtractTextPlugin = require('extract-text-webpack-plugin');
// Spits out an index.html file in the build
const HtmlWebPackPlugin = require('html-webpack-plugin');

// Configure webpack
const config = {
    entry: "./client/index.js",
    output:
    {
        path: path.resolve(__dirname, 'public'),
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                // for js and jsx files, without node_modules
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                // for the css files
                test: /\.css$/,
                use: ExtractTextPlugin.extract(
                    {
                        fallback: 'style-loader',
                        use: 'css-loader'
                    }
                )
            }
        ]
    },
    devServer: {
        contentBase: "./server",
        historyApiFallback: true,
        watchContentBase: true,
        compress: true,
        port: 5000,
        proxy: {
            '/api': 'http://localhost:3000'
        }
    },
    plugins: [
        // Take the index.html file as a template 
        // and create a new one in the build folder
        new HtmlWebPackPlugin({
            template: "./server/index.html",
            filename: "index.html"
        }),
        // Name the css file sent to the build folder style.css
        new ExtractTextPlugin({
            filename: "style.css"
        })
    ]
};

module.exports = config;