/**
 * Default dev server configuration
 */
const webpack = require('webpack');
const WebpackBaseConfig = require('./Base');

class WebpackDevConfig extends WebpackBaseConfig {
  constructor() {
    super();
    this.config = {
      devtool: 'cheap-module-source-map',
      entry: [
        'webpack-dev-server/client?http://localhost:8080/',
        'webpack/hot/only-dev-server',
        'react-hot-loader/patch',
        'babel-polyfill',
        './client.js',
      ],
    };

    this.config.plugins = this.config.plugins.concat([
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoEmitOnErrorsPlugin(),
    ]);

    this.config.module.rules = this.config.module.rules.concat([
      {
        test: /^.((?!cssmodule).)*\.(sass|scss)$/,
        loaders: [
          { loader: 'style-loader' },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            },
          },
        ],
      },
      {
        test: /^.((?!cssmodule).)*\.less$/,
        loaders: [
          { loader: 'style-loader' },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
            },
          },
          {
            loader: 'less-loader',
            options: {
              sourceMap: true,
            },
          },
        ],
      },
    ]);
  }
}

module.exports = WebpackDevConfig;
