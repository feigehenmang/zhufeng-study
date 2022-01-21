// const { smart } = require('webpack-merge')


const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackExternalsPlugin = require('html-webpack-externals-plugin')
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
        filename: '[name].[chunkhash].js',
        clean: true
    },

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
                        loader: 'style-loader',
                        options: {
                            insert: 'head' // 'head | body'
                        }
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
                        loader: 'style-loader',
                        options: {
                            insert: 'head' // 'head | body'
                        }
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
                        loader: 'style-loader',
                        options: {
                            insert: 'head' // 'head | body'
                        }
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
        new HtmlWebpackPlugin({
            template: './src/index.html',
            inject: true,
            chunks: ['main', 'common']
        }),
        new ProgressBarPlugin({
            format: ':msg [:bar] ${chalk.green.bold(":percent")} (:elapsed s)'
        }),

        new HtmlWebpackExternalsPlugin({
            externals: [
                {
                    module: 'react',
                    entry: 'https://cdn.bootcss.com/react/15.6.1/react.js',
                    global: 'React'
                },
                {
                    module: 'react-dom',
                    entry: 'https://cdn.bootcss.com/react/15.6.1/react-dom.js',
                    global: 'ReactDOM'
                }
            ]
        })
        // new HtmlInlineCSSWebpackPlugin(),
    ],
    // //默认false,也就是不开启
    // watch: true,
    // //只有开启监听模式时，watchOptions才有意义
    // watchOptions: {
    //     //默认为空，不监听的文件或者文件夹，支持正则匹配
    //     ignored: /node_modules/,
    //     //监听到变化发生后会等300ms再去执行，默认300ms
    //     aggregateTimeout: 300,
    //     //判断文件是否发生变化是通过不停的询问文件系统指定议是有变化实现的，默认每秒问1000次
    //     poll: 1000
    // },
    resolve: {
        extensions: [".js", ".jsx", ".json", ".css", ".ts", ".tsx"],
        alias: {
            '@': codeDir
        }
    }
}