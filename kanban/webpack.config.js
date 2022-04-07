const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('Clean-webpack-plugin');
 
module.exports = {
    mode: 'development',
	entry: './src/index.js',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'bundle.js'
	},
    devServer: {
        port: 4200,
        contentBase: path.join(__dirname, "dist")
    },
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: [
                    "style-loader",
                    {
                        loader: "css-loader",
                        options: {
                            modules: {
                                auto: /\.module\.\w+$/i,
                                exportLocalsConvention: "camelCase",
                                localIdentName:
                                    "[name]__[local]",
                            },
                        },
                    },
                ],
            },
            {
                test: /\.(png|jpe?g|gif|eot|svg|ttf|woff|woff2)$/i,
                use: [
                    {
                        loader: "file-loader",
                    },
                ],
            },
            {
                test: /\.html$/i,
                loader: "html-loader",
            },
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env"],
                    },
                },
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
        template: './src/index.html'
        }),
        new CleanWebpackPlugin()
    ],
};