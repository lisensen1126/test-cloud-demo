const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const MicroFrontendDevPlugin = require('@micro-frontend/micro-frontend-development-plugin');

module.exports = {
  output: {
    pathinfo: true,
    filename: '[name].js',
    chunkFilename: '[name].js',
    publicPath: process.env.PUBLIC_PATH || '/',
  },
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist',
    host: process.env.HOST || '127.0.0.1',
    port: process.env.PORT || 4000,
    sockHost: process.env.SOCK_HOST || '127.0.0.1',
    sockPort: process.env.SOCK_PORT || 8080,
    disableHostCheck: true,
    historyApiFallback: true,
    liveReload: true,
    hot: true,
    writeToDisk: true,
    headers: {
      "Access-Control-Allow-Origin": "*",
    }
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        uikit: {
          test: /coding-ui-kit/,
          chunks: 'all',
          enforce: true,
          priority: 10,
        },
        vendors: {
          test: /node_modules/,
          chunks: 'all',
          enforce: true,
        },
      },
    },
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new MicroFrontendDevPlugin({ name: 'test-cloud' }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[name].css',
      ignoreOrder: false,
    }),
  ],
}