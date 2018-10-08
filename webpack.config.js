const path = require("path");

module.exports = {
    devtool: "source-map",
    mode: "production",
    entry: ["./src/index.js"],
    output: {
      path: __dirname,
      filename: "./src/main.js"
    },
    optimization: {
      runtimeChunk: false
    },
    target: "electron-main",
    /**
     * Disables webpack processing of __dirname and __filename.
     * If you run the bundle in node.js it falls back to these values of node.js.
     * https://github.com/webpack/webpack/issues/2010
     */
    node: {
      __dirname: false,
      __filename: false
    },
  module: {
    rules: [
        {
            test: /\.node$/,
            use: [{
                loader: "native-ext-loader",
                options: {
                    basePath: ["addons"]
                }
            }]
        },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ["babel-loader"]
      }
    ]
  },
  // https://webpack.github.io/docs/configuration.html#resolve
  resolve: {
    extensions: [".js", ".json", ".node"],
    mainFields: ["webpack", "browser", "web", ["jam", "main"], "main"],
    modules: [
      path.resolve(__dirname, "src"),
      "node_modules"
    ]
  }
};