const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
module.exports = {
  mode: "development",
  entry: "./src/main.ts",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "main.js",
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
  devServer: {
    port: 8888,
    open: true,
    hot: true,
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: "ts-loader",
        exclude: /node_modules/,
        options: {
          configFile: path.resolve(__dirname, "tsconfig.json"),
        },
      },
    ],
  },
  // 热启动html   <script defer src="main.js"></script>
  plugins: [
    new HtmlWebpackPlugin({
      template: "./index.html",
    }),
  ],
};
