const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = {
  entry: {
    app: './src/index.tsx',
  },
  output: {
    path: path.join(__dirname, '../build'),
    filename: '[name].[chunkhash:8].bundle.js',
    chunkFilename: '[name].[chunkhash:8].chunk.js',
  },
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader', // transpiling our JavaScript files using Babel and webpack
        },
      },
      {
        test: /\.less$/,
        exclude: [/node_modules\/(?!antd).*/],
        use: [
          'style-loader', // creates style nodes from JS strings
          'css-loader', // translates CSS into CommonJS
          'postcss-loader', // Loader for webpack to process CSS with PostCSS
          {
            loader: 'less-loader',
            options: {
              lessOptions: {
                javascriptEnabled: true,
              },
            },
          }, // compiles less to CSS, using Node less by default
          //'sass-loader', // compiles Sass to CSS, using Node Sass by default
        ],
      },
      {
        test: /\.(sa|sc)ss$/,
        exclude: /node_modules/,
        use: [
          'style-loader', // creates style nodes from JS strings
          'css-loader', // translates CSS into CommonJS
          'postcss-loader', // Loader for webpack to process CSS with PostCSS
          'sass-loader', // compiles Sass to CSS, using Node Sass by default
        ],
      },
      {
        test: /\.css$/,
        exclude: /node_modules\/(?!antd).*/,
        use: [
          'style-loader', // creates style nodes from JS strings
          'css-loader', // translates CSS into CommonJS
          'postcss-loader', // Loader for webpack to process CSS with PostCSS
        ],
      },
      {
        test: /\.(png|svg|jpe?g|gif)$/i,
        use: [
          {
            loader: 'file-loader', // This will resolves import/require() on a file into a url and emits the file into the output directory.
            options: {
              name: '[name].[ext]',
              outputPath: 'assets/img',
              esModule: false,
            },
          },
        ],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          {
            loader: 'file-loader', // This will resolves import/require() on a file into a url and emits the file into the output directory.
            options: {
              name: '[name].[ext]',
              outputPath: 'assets/font',
            },
          },
        ],
      },
      {
        test: /\.html$/i,
        use: {
          loader: 'html-loader',
          options: {
            attributes: {
              list: [
                {
                  tag: 'img',
                  attribute: 'src',
                  type: 'src',
                },
                {
                  tag: 'img',
                  attribute: 'srcset',
                  type: 'srcset',
                },
                {
                  tag: 'img',
                  attribute: 'data-src',
                  type: 'src',
                },
                {
                  tag: 'img',
                  attribute: 'data-srcset',
                  type: 'srcset',
                },
              ],
              //root: path.join(__dirname, '../build'),
            },
          },
        },
      },
    ],
  },
  optimization: {
    minimizer: [new TerserJSPlugin(), new OptimizeCSSAssetsPlugin()],
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
      chunks: 'all',
    },
    runtimeChunk: {
      name: 'runtime',
    },
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  plugins: [
    // CleanWebpackPlugin will do some clean up/remove folder before build
    // In this case, this plugin will remove 'dist' and 'build' folder before re-build again
    new CleanWebpackPlugin(),
    // PurgecssPlugin will remove unused CSS
    // new PurgecssPlugin({
    //   paths: glob.sync(path.resolve(__dirname, '../build/**/*'), {
    //     nodir: true,
    //   }),
    // }),
    // This plugin will extract all css to one file
    new MiniCssExtractPlugin({
      filename: '[name].[chunkhash:8].bundle.css',
      chunkFilename: '[name].[chunkhash:8].chunk.css',
    }),
    // The plugin will generate an HTML5 file for you that includes all your webpack bundles in the body using script tags
    new HtmlWebpackPlugin({
      //inject: false,
      chunks: ['app'],
      template: 'public/index.html',
      filename: 'index.html',
    }),
    // ComppresionPlugin will Prepare compressed versions of assets to serve them with Content-Encoding.
    // In this case we use gzip
    // But, you can also use the newest algorithm like brotli, and it's supperior than gzip
    // new CompressionPlugin({
    //   algorithm: "gzip"
    // }),
    // new BrotliPlugin(),
  ],
};
