const path = require("path");
const APP_PATH = path.resolve(__dirname, "../src");
const DIST_PATH = path.resolve(__dirname, "../dist");
module.exports = {
  entry: {
    app: "./src/index",
    framework: ["react", "react-dom"]
  },
  resolve: {
    alias: {},
    extensions: [
      ".ts",
      ".tsx",
      ".js",
      ".jsx",
      ".json",
      ".html",
      ".scss",
      ".less",
      ".css"
    ]
  },
  output: {
    filename: "js/[name].js",
    path: DIST_PATH
    // publicPath: "./"
  },
  externals: {
    // react: "React",
    // "react-dom": "ReactDOM"
    // axios: 'axios',
    // AMap: 'AMap',
    // lodash: '_',
    // moment: 'moment',
    // bizcharts: 'BizCharts',
    // "@antv/data-set": "DataSet"
  },
  module: {
    rules: [
      {
        test: /\.(tsx?|jsx?)$/,
        exclude: /node_modules/,
        use: [{ loader: "ts-loader", options: { transpileOnly: true } }]
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: "style-loader" //在html中插入<style>标签
          },
          {
            loader: "css-loader" //获取引用资源，如@import,url()
          },
          {
            loader: "postcss-loader",
            options: {
              plugins: [
                require("autoprefixer")({
                  browserslist: ["last 5 version"]
                })
              ]
            }
          }
        ]
      },
      {
        test: /\.less$/,
        use: [
          { loader: "style-loader" },
          { loader: "css-loader" },
          {
            loader: "postcss-loader", //自动加前缀
            options: {
              plugins: [
                require("autoprefixer")({
                  browserslist: ["last 5 version"]
                })
              ]
            }
          },
          {
            loader: "less-loader",
            options: { javascriptEnabled: true }
          }
        ]
      },
      {
        test: /\.scss$/,
        use: [
          { loader: "style-loader" },
          {
            loader: "css-loader"
          },
          { loader: "sass-loader" },
          {
            loader: "postcss-loader",
            options: {
              plugins: [
                require("autoprefixer")({
                  browserslist: ["last 5 version"]
                })
              ]
            }
          }
        ]
      },
      {
        test: /\.(png|jpg|gif|woff|svg|eot|woff2|tff)$/,
        // use: "url-loader?limit=8129",
        use: [
          {
            loader: "url-loader",
            options: {
              // outputPath:'../',//输出**文件夹
              publicPath: "/",
              name: "images/[name].[ext]",
              limit: 500 //是把小于500B的文件打成Base64的格式，写入JS
            }
          }
        ],
        //注意后面那个limit的参数，当你图片大小小于这个限制的时候，会自动启用base64编码图片
        exclude: /node_modules/
      }
    ]
  }
};
