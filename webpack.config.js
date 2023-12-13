// The path to the CesiumJS source code
const cesiumSource = 'node_modules/cesium/Source'
const cesiumWorkers = '../Build/Cesium/Workers'
const thirdPrtyCesiumWorkers = '../Build/Cesium/ThirdParty/Workers'
const CopyWebpackPlugin = require('copy-webpack-plugin')
const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const assetSources = './src'
const Dotenv = require('dotenv-webpack')
module.exports = {
  context: __dirname,
  entry: {
    app: './src/index',
  },
  output: {
    filename: 'app.js',
    path: path.resolve(__dirname, 'dist'),
    sourcePrefix: '',
  },
  amd: {
    // Enable webpack-friendly use of require in Cesium
    toUrlUndefined: true,
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json'],
    alias: {
      cesium: path.resolve(__dirname, cesiumSource),
    },
    fallback: { https: false, zlib: false, http: false, url: false },
    mainFiles: ['index', 'Cesium'],
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
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|gif|jpg|jpeg|svg|xml|gltf|kml|kmz|gltf|glb|txt)$/,
        use: 'url-loader?name=./assets/images/[name].[ext]',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'public/index.html',
      filename: './index.html',
      favicon: 'public/favicon.ico',
    }),
    new Dotenv({
      path: './dev.env', // Path to .env file (this is the default)
      safe: true, // load .env.example (defaults to "false" which does not use dotenv-safe)
    }),
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
      CESIUM_BASE_URL: JSON.stringify('./'),
    }),
  ],
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    static: __dirname + '/public',
    host: 'localhost',
    port: 3000,
    historyApiFallback: true,
    open: true,
  },
}
