// server-side webpack configuration for our dev

//requiring  objects
const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');

//clean up the dist directory 
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

//handling inserting
// const HtmlWebpackPlugin = require('html-webpack-plugin');




const CURRENT_WORKING_DIR = process.cwd();


// let's create the config object
const config =  {
    name: "server",
    entry: [ path.resolve(CURRENT_WORKING_DIR , './backend/server/server.js') ],
    target: "node",
    //output bundled code in server.generated.js in the dist folder
    output: {
        path: path.join(CURRENT_WORKING_DIR , '/dist/'),
        filename: "server.generated.js",
        publicPath: '/dist/',
        libraryTarget: "commonjs2"
    },
    externals: [nodeExternals()],
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [ 'babel-loader' ]
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