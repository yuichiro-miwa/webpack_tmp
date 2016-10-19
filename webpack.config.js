const path = require('path');

const ExtractTextPlugin = require('extract-text-webpack-plugin');
//()の引数で指定した形にpathのディレクトリに表示される
const extractCSS = new ExtractTextPlugin('./../css/main.css');
//PostCSSのプラグイン系
const autoprefixer = require('autoprefixer')

const config = {
  entry: {
    "test": './dev/js/main.js',
    "test2": './dev/js/main_2.js',
  },
  output: {
    path: path.join(__dirname, '/build/js'),
    //ファイル名は"entry"オブジェクトのキー名に由来
    filename: "[name].js"
  },
  plugins: [
    extractCSS,
  ],
  module: {
    loaders: [
      {
        //拡張子がjsのファイルにloderが適用される
        test: /\.js$/,
        //excludeでnode_modulesディレクトリを指定して除外する
        exclude: /node_modules/,
        loader: 'babel'
        //presetの設定は.babelrcに記述
      },
      {
        test: /\.css$/,
        //_loderは省略
        loader: extractCSS.extract('css!postcss')
      }
    ]
  },
  postcss: [
    autoprefixer({ browsers: ['IE 9', 'IE 10', 'IE 11', 'last 2 versions'] })
  ]
};
module.exports = config;
