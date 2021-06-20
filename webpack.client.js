const path = require("path");
const webpack = require("webpack");
const cwd = process.cwd();

module.exports = {
  name: "browser",
  mode: "development",
  devtool: "eval-source-map",
  entry: [
    "webpack-hot-middleware/client?reload=true",
    path.join(cwd, "client", "index.js"),
  ],
  output: {
    path: path.join(cwd, "build"),
    filename: "dist.js",
    publicPath: "/build/",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: [path.join(cwd, "client")],
        use: "babel-loader",
      },
      {
        test: /\.s?css$/,
        include: [path.join(cwd, "client")],
        use: [
          "style-loader",
          "css-loader",
          {
            loader: "sass-loader",
            options: {
              implementation: require("sass"),
              sassOptions: { fiber: require("fibers") },
            },
          },
        ],
      },
    ],
  },
  optimization: {
    emitOnErrors: false
  },
  plugins: [new webpack.HotModuleReplacementPlugin()],
  resolve: {
    alias: {
      "react-dom": "@hot-loader/react-dom"
    }
  }
};
