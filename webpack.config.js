const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const cssimport = require('postcss-import');
const postcssPresetEnv = require('postcss-preset-env');

module.exports = {
    // メインとなるJavaScriptファイル（エントリーポイント）
    entry: `./src/js/script.js`,

    // ファイルの出力設定
    output: {
      //  出力ファイルのディレクトリ名
      path: path.join(__dirname, 'dist/'),
      // 出力ファイル名
      filename: "common/js/script.js",
    },

    mode: "development",
    // ローカル開発用環境を立ち上げる
    // 実行時にブラウザが自動的に localhost を開く
    devServer: {
      contentBase: path.join(__dirname, 'dist/'),
      watchContentBase: true,
      open: true
    },

    module: {
      rules: [
        {
          test: /\.js$/,
          use: [
            {
              loader: 'babel-loader'
            }
          ]
        },
        {
          test: /\.css/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
            },
            //"style-loader",
            {
              loader: "css-loader",
              options: {
                url: false,
                sourceMap: true,
                // Sass+PostCSSの場合は2を指定
                importLoaders: 1
              }
            },
            {
              loader: "postcss-loader",
              options: {
                // PostCSS側でもソースマップを有効にする
                sourceMap: true,
                plugins: [
                  // Autoprefixerを有効化
                  // ベンダープレフィックスを自動付与する
                  require("autoprefixer")({
                    grid: true
                  }),
                  require('postcss-import'),
                  require('postcss-preset-env')({
                    stage: 0
                  })
                ]
              }
            }
          ]
        }
      ]
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: 'common/css/style.css'
      }),
    ]
};