// client-side webpack configuration for our dev

//requiring  objects
const path = require('path');
const webpack = require('webpack');

//clean up the dist directory 
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

//handling inserting
// const HtmlWebpackPlugin = require('html-webpack-plugin')


const CURRENT_WORKING_DIR = process.cwd();

// let's create the config object
const config = {
    name: "browser",
    mode: "development",
    devtool: 'eval-source-map',
    entry: [
        'webpack-hot-middleware/client?reload=true',
        path.resolve(CURRENT_WORKING_DIR , 'frontend/client/index.js')
    ],
    output: {
        filename: 'bundle.js',
        path: path.resolve(CURRENT_WORKING_DIR , '/dist'),
        publicPath: '/dist/' // Webpack dev middleware, if enabled, handles requests for this URL prefix
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
    resolve:  {
        alias: {
            'react-dom': '@hot-loader/react-dom'
        }
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


