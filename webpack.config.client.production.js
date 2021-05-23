// This will configure the webpack to bundle the React code to be used in production mode

//requiring  objects
const path = require('path');

const webpack = require('webpack');



const CURRENT_WORKING_DIR = process.cwd();


// let's create the config object
const config = {
    mode: "production",
    entry: [
        path.join(CURRENT_WORKING_DIR , 'frontend/client/index.js')
    ],
    output: {
        path: path.join(CURRENT_WORKING_DIR , '/dist'),
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

    // performance: {
    //     maxEntrypointSize: 512000,
    //     maxAssetSize: 512000
    // },
    //or
    performance: { hints: false }
}

module.exports = config