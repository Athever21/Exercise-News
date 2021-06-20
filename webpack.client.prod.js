const path = require("path");
const cwd = process.cwd();
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
  name: "browser",
  mode: "production",
  entry: [path.join(cwd, "client", "index.js")],
  output: {
    path: path.join(cwd, "build"),
    filename: "dist-[name].js",
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
    minimize: true,
    minimizer: [new TerserPlugin()],
    splitChunks: {
      chunks: 'all',
    },
  },
};
