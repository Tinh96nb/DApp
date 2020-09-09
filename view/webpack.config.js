const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const Dotenv = require('dotenv-webpack')

const basePath = path.resolve(__dirname)

const dir = {
  app: `${basePath}/src`,
  public: `${basePath}/public`,
  build: `${basePath}/dist`
}

module.exports = {
  entry: `${dir.app}/index.js`,
  output: {
    filename: 'app.js?v=[hash]',
    path: dir.build,
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
            options: { minimize: true }
          }
        ]
      },
      {
        test: /\.(css|less|scss)$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        exclude: /node_modules/,
        use: [{
          loader: 'file-loader',
          options: {}
        }]
      },
      {
        test: /.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
        exclude: /images/, /* dont want svg images from image folder to be included */
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: 'public/fonts/',
              name: '[name][hash].[ext]'
            }
          }
        ]
      }
    ]
  },
  devtool: 'source-map',
  // fix router refresh not get path
  devServer: {
    historyApiFallback: true
  },
  node: {
    fs: 'empty'
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: `${dir.public}/index.html`
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css'
    }),
    new Dotenv()
  ],
  resolve: {
    modules: [dir.app, dir.public, 'node_modules'],
    extensions: ['.js', '.jsx', '.json', 'png', 'jpg', 'svg', '.css']
  }
}
