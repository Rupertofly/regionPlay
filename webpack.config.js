const path = require('path');

module.exports = {
  entry: {
    vendor: './src/index.ts'
  },
  mode: 'development',
  devServer: {
    publicPath: path.join('/dist/'),
    index: './dist/index.html',
    port: 5050,
    clientLogLevel: 'warning'
  },
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /.tsx?$/,
        loader: 'ts-loader'
      }
    ]
  },
  resolve: {
    extensions: ['.js', 'jsx', '.ts', '.tsx']
  },
  externals: ['d3'],
  optimization: {
    splitChunks: {
      chunks: 'all',
      name: 'common'
    }
  },
  plugins: [],
  output: {
    filename: 'bundle.js',
    chunkFilename: '[name]-[id].js',
    path: path.resolve(__dirname, 'dist')
  }
};
