// server-side webpack configuration for our dev

//requiring  objects
const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');


const CURRENT_WORKING_DIR = process.cwd();


// let's create the config object
const config =  {
    name: "server",
    entry: [ path.join(CURRENT_WORKING_DIR , './backend/server/server.js') ],
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
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify(process.env.NODE_ENV || "development")
            },
        }),
  
    ],

    resolve: {
        fallback: {
          fs: false,
          os: false,
          path: false,
          net: false,
          stream: false,
          tls: false,
          crypto: false,
        }
    },

    devServer: {
        contentBase: path.join(__dirname, 'public'),
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
    },
    //or
    //performance: { hints: false }
}

module.exports = config