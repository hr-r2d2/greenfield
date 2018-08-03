var path = require("path");
var SRC_DIR = path.join(__dirname, "/client");
var DIST_DIR = path.join(__dirname, "/client");
var M_DIR = path.join(__dirname, "/node_modules");

module.exports = {
  entry: `${SRC_DIR}/index.jsx`,
  output: {
    filename: "bundle.js",
    path: DIST_DIR
  },
  module: {
    loaders: [
      {
        test: /\.jsx?/,
        include: SRC_DIR,
        loader: "babel-loader",
        query: {
          presets: ["react", "es2015"]
        }
      },
      {
        test: /\.css$/,
        include: SRC_DIR,
        loader: ["style-loader", "css-loader"]
      },
      {
        test: /\.svg$/,
        loader: "svg-inline-loader"
      },
      {
        test: /\.css$/,
        include: M_DIR,
        loader: ["style-loader", "css-loader"]
      }
    ]
  }
};
