/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const glob = require('glob')

const sourceDirs = ['tests', 'lib']

module.exports = {
  mode: 'production',
  entry: [{}]
    .concat(
      glob.sync(`./+(${sourceDirs.join('|')})/**/*.ts`).map((file) => {
        return { [file.replace(path.extname(file), '.js')]: file }
      }),
    )
    .reduce((x, y) => Object.assign(x, y), {}),
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name]',
    libraryTarget: 'commonjs',
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
    ],
  },
  target: 'web',
  externals: /^(k6|https?\:\/\/)(\/.*)?/,
  stats: {
    colors: true,
  },
  plugins: [
    new CleanWebpackPlugin(),
    // Copy assets to the destination folder
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'assets'),
          to: path.resolve(__dirname, 'dist/assets'),
          noErrorOnMissing: true,
        },
      ],
    }),
  ],
  optimization: {
    // Don't minimize, as it's not used in the browser
    minimize: false,
  },
}
