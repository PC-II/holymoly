const path = require('path');
const Dotenv = require('dotenv-webpack');

module.exports = {
  mode: 'development',
  entry: {
    main: path.resolve(__dirname, 'src/index.js'),
    user: path.resolve(__dirname, 'src/user.js'),
    config: path.resolve(__dirname, 'src/config.js'),
    auth: path.resolve(__dirname, 'src/auth.js'),
    storage: path.resolve(__dirname, 'src/storage.js'),
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