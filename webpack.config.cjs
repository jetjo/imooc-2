const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    mode: 'development',
    // entry: './src/index.js',
    entry: {
        main: './src/index.js',
        seach: './src/seach.js',
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /\.css$/,
                // loader: 'css-loader',
                // loader: 'style-loader!css-loader'
                // use: ['style-loader', 'css-loader']
                // use: [MiniCssExtractPlugin.loader, 'css-loader']
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: '../'
                        }
                    },
                    'css-loader'
                ]
            },
            {
                test: /\.(png|jpg|gif|bmp)$/,
                use: {
                    loader: 'url-loader',//url-loader 依赖file-loader
                    //代价是使得打包后的js文件尺寸变大
                    // loader: 'file-loader',
                    options: {
                        name: 'image/[name].[ext]',
                        esModule: false,//默认为true时会产生不合法的img.src属性值, Error: html-webpack-plugin could not minify the generated output.
                        //Parse Error: <img src={"default":"image/Lmlp6O.jpg"} alt="">
                        limit: 60000//单位字节
                    }
                }
            },
            {
                test: /\.(htm|html)$/,
                use: "html-withimg-loader"
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'index.html',
            filename: 'index.html',
            chunks: ['main'],
            minify: {
                removeAttributeQuotes: true,
                removeComments: true,
                collapseWhitespace: true
            },
            // publicPath: '../'
        }),
        new HtmlWebpackPlugin({
            template: 'seach.html',
            filename: 'search.html',
            chunks: ['seach']
        }),
        new MiniCssExtractPlugin({
            filename: 'css/[name].css'
        })
    ]
}
