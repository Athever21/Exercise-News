const path = require("path");
const nodeExternals = require("webpack-node-externals");
const cwd = process.cwd();

module.exports = {
  name: "server",
  entry: [path.join(cwd, "server", "index.js")],
  target: "node",
  output: {
    path: path.join(cwd, "build"),
    filename: "server.js",
    publicPath: "/build/",
    libraryTarget: "commonjs2",
  },
  externals: nodeExternals(),
  module: {
    rules: [
      {
        test: /\.js$/,
        include: path.join(cwd, "server"),
        use: "babel-loader",
      },
    ],
  },
};
