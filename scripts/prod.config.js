const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const safeParser = require('postcss-safe-parser');
const WebpackCosPlugin = require('webpack-cos-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const CodingMicroFrontendConfigPlugin = require('@micro-frontend/micro-frontend-config-plugin');
const isWsl = require('is-wsl');
const env = require('./env')

const ASSETS_KEY = ['runtime~test-cloud', 'uikit~test-cloud', 'vendors~test-cloud', 'test-cloud'];
const conditionPlugins = [];

if (process.env.CDN_ENABLE) {
  conditionPlugins.push(
    new WebpackCosPlugin({
      auth: {
        SecretId: process.env.CDN_SECRET_ID,
        SecretKey: process.env.CDN_SECRET_KEY,
      },
      bucket: {
        Bucket: process.env.CDN_BUCKET,
        Region: process.env.CDN_REGION || 'ap-guangzhou',
      },
      cosBaseDir: process.env.CDN_BASE_DIR || '/',
      project: process.env.CDN_PROJECT_DIR || '/',
      removeMode: false,
      existCheck: process.env.CDN_SKIP_DUPLICATE || true,
      retry: process.env.CDN_RETRY || true,
      options: {
        CacheControl: process.env.CDN_CACHE_CONTROL || "max-age=2592000",
      }
    })
  );
}

if (process.env.ANALYZER) {
  conditionPlugins.push(new BundleAnalyzerPlugin());
}

module.exports = {
  output: {
    filename: '[name]-[chunkhash:8].js',
    chunkFilename: '[name]-[chunkhash:8].js',
    publicPath: process.env.PUBLIC_PATH || '/',
  },
  mode: 'production',
  devtool: false,
  devServer: undefined,
  optimization: {
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          parse: {
            ecma: 8,
          },
          compress: {
            ecma: 5,
            warnings: false,
            comparisons: false,
            inline: 2,
          },
          mangle: {
            safari10: true,
          },
          output: {
            ecma: 5,
            comments: false,
            ascii_only: true,
          },
        },
        parallel: !isWsl,
        cache: true,
        exclude: /\.min\.js$/,
      }),
      new OptimizeCSSAssetsPlugin({
        cssProcessorOptions: {
          parser: safeParser,
          discardComments: {
            removeAll: true,
          },
        },
      }),
    ],
    moduleIds: 'hashed',
    runtimeChunk: true,
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
    }
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name]-[chunkhash:8].css',
      chunkFilename: '[name]-[chunkhash:8].css',
      ignoreOrder: false,
    }),
    new CodingMicroFrontendConfigPlugin({
      productName: 'test-cloud',
      processJS: (assets) => ASSETS_KEY
        .map(k => assets[k]['js'])
        .filter(v => !!v),
      processCSS: (assets) => ASSETS_KEY
        .map(k => assets[k]['css'])
        .filter(v => !!v),
      processDescription: (assets) => process.env.CMF_DEPLOY_MESSAGE || '',
      auth: {
        SecretId: process.env.CDN_SECRET_ID,
        SecretKey: process.env.CDN_SECRET_KEY,
      },
      bucket: {
        Bucket: process.env.CDN_BUCKET,
        Region: process.env.CDN_REGION || 'ap-guangzhou',
      },
      match: process.env.CMF_ROUTE_MATCH || '',
    }),
    ...conditionPlugins,
  ],
};
