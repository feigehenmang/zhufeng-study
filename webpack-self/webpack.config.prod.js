const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const WebpackBundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const codeDir = path.resolve(__dirname, 'src')
const modulesDir = path.resolve(__dirname, 'node_modules')
const { merge } = require('webpack-merge')
const base = require('./webpack.common')
module.exports = merge(base, {
    mode: 'production',
    module: {
        rules: [
            {
                test: /\.css$/,
                include: codeDir,
                exclude: modulesDir,
                // loader 解析从右往左，css-loader负责解析css style-loader负责将css插入head
                use: [
                    {
                        // style-loader https://www.npmjs.com/package/style-loader
                        loader: MiniCssExtractPlugin.loader,
                    }
                    // {
                    //     loader: MiniCssExtractPlugin.loader
                    // }
                    , 'css-loader', 'postcss-loader']
            },
            {
                test: /\.less$/,
                include: codeDir,
                exclude: modulesDir,
                use: [
                    {
                        // style-loader https://www.npmjs.com/package/style-loader
                        loader: MiniCssExtractPlugin.loader
                    }
                    // {
                    //     loader: MiniCssExtractPlugin.loader
                    // }
                    , 'css-loader', 'postcss-loader', 'less-loader']
            },
            {
                test: /\.scss$/,
                include: codeDir,
                exclude: modulesDir,
                use: [
                    {
                        // style-loader https://www.npmjs.com/package/style-loader
                        loader: MiniCssExtractPlugin.loader
                    }
                    // {
                    //     loader: MiniCssExtractPlugin.loader
                    // }
                    , 'css-loader', 'postcss-loader', 'sass-loader']
            },
            {
                // file-loader 解决css引入图片问题
                // url-loader 设定一个临界值，大于则交给file-loader处理，否则base64
                test: /\.(jpg|jpeg|png|webp|bmp|gif|svg)$/i,
                type: 'javascript/auto',
                use: [{
                    loader: 'url-loader',
                    options: {
                        esModule: false, //解决html区域,vue模板引入图片路径问题
                        limit: 1000,
                        name: "static/img/[name].[hash:7].[ext]",
                    }
                }]
            },
            {
                test: /\.jsx?$/,
                use: ['babel-loader']
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash].css',
            chunkFilename: '[id].[contenthash].css'
        }),
        new WebpackBundleAnalyzerPlugin()
    ],
    performance: {
        maxEntrypointSize: 10000000,
        maxAssetSize: 30000000
    }
})