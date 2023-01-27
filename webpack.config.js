const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const webpack = require('webpack')

const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin")
const { dependencies } = require('./package.json')
const dotenv = require('dotenv')

const env = dotenv.config().parsed || { LOGOUT_URL: "http://localhost:3000/logout" }// dotenv.config().parsed

module.exports = {
  entry: path.join(__dirname, "src", "index.js"),
  output: {
    filename: "main.js",
    path:path.resolve(__dirname, "build"),
  },
  module: {
    rules: [
      {
        test: /\.?js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ['@babel/preset-env', ['@babel/preset-react', {"runtime": "automatic"}]]
          }
        }
      },
      {
        test: /\.css$/,
        use: [
            MiniCssExtractPlugin.loader,
          'css-loader'
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "src", "index.html"),
    }),
    new MiniCssExtractPlugin(),
    // MODULE FEDERATION
    new ModuleFederationPlugin({
        name: "HeaderAndFooter",
        filename: "moduleEntry.js",
        exposes : {
          "./Header": "./src/components/Header"
        },
        remotes: {
        },
        shared: {
            ...dependencies,
            react: {
                singleton: true,
                requiredVersion: dependencies['react']
            },
            "react-dom": {
                singleton: true,
                requiredVersion: dependencies['react-dom']
            }
        }
    }),
    new webpack.DefinePlugin(Object.keys(env).reduce((prev, next) => {
      prev[`process.env.${next}`] = JSON.stringify(env[next]);
      return prev;
  }, {}))
  ],
  resolve: {
    extensions: ["*", ".js", ".jsx"]
  },
  devServer: {
    static: {
        directory: path.join(__dirname, "build")
    },
    port: 3001
  }
}