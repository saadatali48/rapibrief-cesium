const path = require('path')
const cesiumSource = 'node_modules/cesium/Source'
const cesiumWorkers = '../Build/Cesium/Workers'
const thirdPrtyCesiumWorkers = '../Build/Cesium/ThirdParty/Workers'
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const assetSources = './src'
const dotenv = require('dotenv')
const env = dotenv.config({ path: './prod.env' }).parsed
const envKeys = Object.keys(env).reduce((prev, next) => {
  prev[`process.env.${next}`] = JSON.stringify(env[next])
  return prev
}, {})

module.exports = [
  {
    mode: 'production',
    context: __dirname,
    entry: {
      app: './src/index.tsx',
    },
    output: {
      path: path.resolve(__dirname, 'release'),
      filename: '[name].bundle.js',

      // Needed to compile multiline strings in Cesium
      sourcePrefix: '',
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.json'],
      fallback: {
        https: false,
        zlib: false,
        http: false,
        url: false,
        fs: false,
        assert: false,
        crypto: false,
        stream: require.resolve('stream-browserify'),
        buffer: require.resolve('buffer'),
        os: false,
      },
      mainFields: ['module', 'main'],
    },
    module: {
      rules: [
        {
          test: /\.ts|\.jsx$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: [
                '@babel/preset-env',
                '@babel/preset-react',
                '@babel/preset-typescript',
              ],
            },
          },
        },

        {
          test: /\.css$/,
          use: ['style-loader', { loader: 'css-loader' }],
          sideEffects: true,
        },
        {
          test: /\.(png|gif|jpg|jpeg|svg|xml|kmz|kml|gltf|glb|txt)$/,
          exclude: /node_modules/,
          use: 'url-loader?name=./Assets/Images/[name].[ext]',
        },
        {
          // Remove pragmas
          test: /\.js$/,
          enforce: 'pre',
          include: path.resolve(__dirname, 'node_modules/cesium/Source'),
          sideEffects: false,
          use: [
            {
              loader: 'strip-pragma-loader',
              options: {
                pragmas: {
                  debug: false,
                },
              },
            },
          ],
        },
      ],
    },
    optimization: {
      usedExports: true,
      splitChunks: {
        cacheGroups: {
          commons: {
            test: /[\\/]node_modules[\\/]cesium/,
            name: 'Cesium',
            chunks: 'all',
          },
        },
      },
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: 'public/index.html',
        favicon: 'public/favicon.ico',
      }),

      new webpack.ProvidePlugin({
        Buffer: ['buffer', 'Buffer'],
      }),
      new webpack.ProvidePlugin({
        process: 'process/browser',
      }),
      new webpack.DefinePlugin(envKeys),

      // Copy Cesium Assets, Widgets, and Workers to a static directory
      new CopyWebpackPlugin({
        patterns: [
          { from: path.join(cesiumSource, cesiumWorkers), to: 'Workers' },
          { from: path.join(cesiumSource, 'Assets'), to: 'Assets' },
          { from: path.join(cesiumSource, 'Widgets'), to: 'Widgets' },
          { from: path.join(cesiumSource, 'ThirdParty'), to: 'ThirdParty' },
        ],
      }),
      new webpack.DefinePlugin({
        // Define relative base path in cesium for loading assets
        CESIUM_BASE_URL: JSON.stringify(''),
      }),
    ],
  },
]
