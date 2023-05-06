const path = require('path');
const Dotenv = require('dotenv-webpack');

module.exports = {
  mode: 'development',
  entry: {
    main: path.resolve(__dirname, 'src/index.js'),
  },
  output: {
    path: path.resolve(__dirname, 'public/scripts'),
    filename: '[name].js',
  },
  watch: true,
  plugins: [
    new Dotenv()
  ],
}