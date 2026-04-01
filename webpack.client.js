const path = require('path');

module.exports = {
  mode: 'development',
  entry: './src/client.tsx',
  output: {
    filename: 'client.js',
    path: path.resolve(__dirname, 'dist/client'),
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
    hot: true,
    proxy: [
      {
        context: ['**', '!/static/**'],
        target: 'http://localhost:3000',
      },
    ],
    devMiddleware: {
      publicPath: '/static/',
    },
  },
};
