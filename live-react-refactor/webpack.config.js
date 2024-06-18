const path = require("path");

module.exports = {
  mode: process.env.NODE_ENV ?? "development",
  entry: "./src/entrypoint.tsx",
  module: {
    //loader
    rules: [
      {
        test: /.tsx?$/,
        exclude: /node_modules/,
        use: "ts-loader",
      },

      //to convert jsx file to js using babel
      //   use: [
      //     {
      //       loader: "babel-loader",
      //       options: {
      //         presets: [
      //           "@babel/preset-env",
      //           ["@babel/preset-react", { runtime: "automatic" }],
      //         ],
      //       },
      //     },
      //   ],
      // },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  output: {
    path: path.resolve(__dirname, "public"),
    filename: "bundle.js",
  },
};
