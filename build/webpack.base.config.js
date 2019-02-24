const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader')

const isProd = process.env.NODE_ENV === 'production'

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
  devtool: isProd ? false : '#cheap-module-source-map',
  output: {
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/dist/',
    filename: '[name].[chunkhash].js'
  },
  resolve: {
    alias: {
      'static': resolve('static'),
      '@': resolve('src')
    }
  },
  module: {
    noParse: /es6-promise\.js$/, // avoid webpack shimming process
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          compilerOptions: {
            preserveWhitespace: false
          }
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpg|gif|svg|eot|ttf|woff|otf)([\\?]?.*)$/,
        loader: 'url-loader',
        options: {
          limit: 1000000,
          name: '[name].[ext]?[hash]'
        }
      },
      {
        test: /\.less$/,
        use: isProd
          ? ExtractTextPlugin.extract({
              use: [
                {
                  loader: 'postcss-loader',
                  options: {
                    minimize: true,
                    plugins: [
                      require('autoprefixer')({
                      browsers: ['last 7 versions', 'last 10 Chrome versions', 'last 5 Firefox versions', 'Safari >= 6', 'ie> 8']
                    })]
                  }
                }, 'less-loader', {
                  loader: 'sass-resources-loader',
                  options: {
                    minimize: true,
                    resources: path.resolve(__dirname, '../src/common/styles/variable.less')
                }}
              ],
              fallback: 'vue-style-loader'
            })
          : ['vue-style-loader', {loader: 'postcss-loader',
            options: {
              minimize: true,
              plugins: [
                require('autoprefixer')({
                browsers: ['last 7 versions', 'last 10 Chrome versions', 'last 5 Firefox versions', 'Safari >= 6', 'ie> 8']
              })]
            }}, 'less-loader', {
              loader: 'sass-resources-loader',
              options: {
                minimize: true,
                resources: path.resolve(__dirname, '../src/common/styles/variable.less')
              }}
            ]
      }
    ]
  },
  performance: {
    maxEntrypointSize: 300000,
    hints: isProd ? 'warning' : false
  },
  plugins: isProd
    ? [
        new VueLoaderPlugin(),
        new webpack.optimize.UglifyJsPlugin({
          compress: { warnings: false }
        }),
        new webpack.optimize.ModuleConcatenationPlugin(),
        new ExtractTextPlugin({
          filename: 'common.[chunkhash].css'
        })
      ]
    : [
        new VueLoaderPlugin(),
        new FriendlyErrorsPlugin()
      ]
}
