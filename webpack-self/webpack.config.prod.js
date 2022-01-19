const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
// const HtmlInlineCSSWebpackPlugin = require('html-inline-css-webpack-plugin').default

const codeDir = path.resolve(__dirname, 'src')
const inputSource = path.resolve(codeDir, 'index.js')
const outputDir = path.resolve(__dirname, 'dist')
const modulesDir = path.resolve(__dirname, 'node_modules')
module.exports = {
    entry: {
        main: inputSource,
        common: path.resolve(codeDir, 'common', 'index.js')
    },
    output: {
        path: outputDir,
        filename: '[name].js',
        clean: true
    },
    mode: 'production',
    devServer: {
        static: {
            directory: outputDir
        },
        host: 'localhost',
        compress: true,
        port: 8080
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                include: codeDir,
                exclude: modulesDir,
                // loader 解析从右往左，css-loader负责解析css style-loader负责将css插入head
                use: [
                    // {
                    //     // style-loader https://www.npmjs.com/package/style-loader
                    //     loader: 'style-loader',
                    //     options: {
                    //         insert: 'head' // 'head | body'
                    //     }
                    // }
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: '/'
                        }
                    }
                    , 'css-loader']
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
                        name: "images/[name].[hash:7].[ext]",
                    }
                }]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            inject: true
        }),
        new ProgressBarPlugin({
            format: ':msg [:bar] ${chalk.green.bold(":percent")} (:elapsed s)'
        }),
        new MiniCssExtractPlugin({
            filename: 'css/[name].css',
            chunkFilename: 'css/[id].css'
        })
        // new HtmlInlineCSSWebpackPlugin(),
    ],
    performance: {
        maxEntrypointSize: 10000000,
        maxAssetSize: 30000000
    }
}