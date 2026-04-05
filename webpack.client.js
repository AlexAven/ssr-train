const path = require('path');

module.exports = {
  mode: 'development',
  entry: './src/client.tsx',
  output: {
    filename: 'client.js',
    path: path.resolve(__dirname, 'dist/client/static'),
    publicPath: '/static/',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  devServer: {
    port: 3001,
    static: {
      directory: path.resolve(__dirname, 'dist/client'),
    },
    hot: true,
    devMiddleware: {
      publicPath: '/static/',
    },
  },
};
