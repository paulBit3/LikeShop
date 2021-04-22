// This will configure the webpack to bundle the React code to be used in production mode

//requiring  objects
const path = require('path');
const webpack = require('webpack');

//minify our JavaScript files
const TerserPlugin = require('terser-webpack-plugin');

//clean up the dist directory 
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

//handling inserting
// const HtmlWebpackPlugin = require('html-webpack-plugin');


const CURRENT_WORKING_DIR = process.cwd();


// let's create the config object
const config = {
    mode: "production",
    entry: [
        path.resolve(CURRENT_WORKING_DIR , 'frontend/client/index.js')
    ],
    output: {
        path: path.resolve(CURRENT_WORKING_DIR , '/dist'),
        filename: 'bundle.js',
        publicPath: '/dist/'
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: [
                    'babel-loader'
                ]
            },
            {
                test:/\.(ttf|eot|svg|gif|jpg|png)(\?[\s\S]+)?$/,
                use: 'file-loader'
            }
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new CleanWebpackPlugin(),
/*         new HtmlWebpackPlugin({
            filename: 'template.js',
            inject: true,
            template: path.resolve(CURRENT_WORKING_DIR, 'template.js')
        }), */
    ],
    optimization: {
        minimize: false,
        minimizer: [ new TerserPlugin()],
    },
    devServer: {
        contentBase: path.resolve(__dirname, 'public'),
        watchContentBase: true,
        publicPath: "/dist/",
        historyApiFallback: true,
        hot: true,
        inline: true,
        port: 3000,
    },
    performance: {
        maxEntrypointSize: 512000,
        maxAssetSize: 512000
    }
}

module.exports = config