// client-side webpack configuration for our dev

//requiring  objects
const path = require('path');
const webpack = require('webpack');



const CURRENT_WORKING_DIR = process.cwd();

// let's create the config object
const config = {
    name: "browser",
    mode: "development",
    devtool: 'eval-source-map',
    entry: [
        'react-hot-loader/patch',
        'webpack-hot-middleware/client?reload=true',
        path.join(CURRENT_WORKING_DIR , 'frontend/client/index.js')
    ],
    output: {
        path: path.join(CURRENT_WORKING_DIR , '/dist'),
        filename: 'bundle.js',
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
        //new webpack.EnvironmentPlugin(['process.env.NODE_ENV']),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify(process.env.NODE_ENV || "development")
            },
        }),
       /*  new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('development')
        }), */
    ],
    resolve:  {
        alias: {
            'react-dom': '@hot-loader/react-dom'
        }
    },
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


