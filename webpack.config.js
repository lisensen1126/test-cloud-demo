const path = require('path');
const autoprefixer = require('autoprefixer');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const prefixer = require('postcss-prefix-selector');
const postcssTranformer = require('./scripts/postcss-prefix-transformer');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const {VueLoaderPlugin} = require("vue-loader")
const env = require('./scripts/env');

const DEV = process.env.NODE_ENV == 'development';
const SplitConfig = DEV ? require('./scripts/dev.config') : require('./scripts/prod.config');

const postCssLoader = {
  loader: 'postcss-loader',
  options: {
    // Necessary for external CSS imports to work
    ident: 'postcss',
    plugins: () => [
      require('postcss-flexbugs-fixes'),
      prefixer(postcssTranformer),
      autoprefixer({
        flexbox: 'no-2009',
      }),
    ],
  },
};
const miniCssLoader = {
  loader: MiniCssExtractPlugin.loader,
  options: {
    hmr: DEV,
  },
};

module.exports = {
  entry: {
    'test-cloud': './app/business/main.js',
  },
  output: {
    ...SplitConfig.output,
    path: path.resolve(__dirname, 'dist'),
  },
  mode: SplitConfig.mode,
  optimization: SplitConfig.optimization,
  devtool: SplitConfig.devtool,
  devServer: SplitConfig.devServer,
  resolve: {
    // 设置别名
    alias: {
      '@': path.resolve(__dirname, 'app')// 这样配置后 @ 可以指向 src 目录
    },
    extensions: ['.ts', '.tsx', '.js', '.jsx','.vue'],
    modules: [
      'node_modules',
      path.resolve(__dirname, 'app'),
    ],
    plugins: [
      new TsconfigPathsPlugin({
        configFile: path.resolve(__dirname, './tsconfig.json'),
        extensions: ['.ts', '.tsx', '.js', '.jsx'],
        logLevel: 'INFO',
        baseUrl: path.resolve(__dirname, '.'),
        mainFields: ['browser', 'main'],
      }),
    ],
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)(\?\S*)?$/,
        loader: 'file-loader'
      },
      {
        test: /\.tsx?$/,
        include: [
          path.resolve(__dirname, 'app'),
          path.resolve(__dirname, 'node_modules/@coding-frontend'),
        ],
        use: [
          {
            loader: 'awesome-typescript-loader',
            options: {
              transpileOnly: false,
            },
          },
        ],
      },
      {
        test: /\.jsx?$/,
        include: [
          path.resolve(__dirname, 'app'),
          path.resolve(__dirname, 'node_modules/@coding-frontend'),
        ],
        use: [
          'thread-loader',
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: path.resolve(__dirname, './.cache/.babel'),
              cacheCompression: false,
              compact: false,
              configFile: path.resolve(__dirname, '.babelrc'),
            },
          },
        ],
      },
      {
        test: /\.scss$/,
        use: [
          miniCssLoader,
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: '[local]-[hash:base64:10]',
              },
              localsConvention: 'camelCase',
              importLoaders: 1,
            },
          },
          postCssLoader,
          {
            loader: 'sass-loader',
          },
        ],
      },
      {
        test: /\.css$/,
        use: [
          miniCssLoader,
          {
            loader: 'css-loader',
          },
          postCssLoader,
        ],
      },
      {
        test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/, /\.svg$/],
        include: [
          path.resolve(__dirname, './app'),
        ],
        loader: 'url-loader',
        options: {
          limit: 8192,
          name: '[hash:40].[ext]',
        },
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new VueLoaderPlugin(),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new webpack.DefinePlugin({
      'process.env': Object.keys(env).reduce((e, key) => {
        e[key] = JSON.stringify(env[key]);
        return e
      }, {}),
    }),
    new HtmlWebpackPlugin(),
    ...SplitConfig.plugins
  ],
  externals: {
    classnames: 'Classnames',
    sha1: 'Sha1',
    'universal-cookie': 'UniversalCookie',
  },
};