const path = require('path');

module.exports = {
  entry: {
    './blocks/js/editor.blocks': './navus-blocks/index.js', // Adjust as needed
  },
  output: {
    path: path.resolve(__dirname), // Output path
    filename: '[name].js', // Filename format
  },
  watch: process.env.NODE_ENV !== 'production', // Watch files in development mode
  devtool: 'source-map', // Source map setting for debugging
  module: {
    rules: [
      {
        test: /\.js$/, // JavaScript files
        exclude: /(node_modules|bower_components)/, // Exclude node_modules
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@wordpress/babel-preset-default'], // WordPress preset for Babel
          },
        },
      },
      {
        test: /\.css$/i, // CSS files
        use: ['style-loader', 'css-loader'], // Loaders for styles
      },
      {
        test: /\.(woff(2)?|eot|ttf|otf|svg|png|jpg|jpeg|gif)$/, // Font and image files
        type: 'asset/resource', // Asset module for fonts and images
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
};
