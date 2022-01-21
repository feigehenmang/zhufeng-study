const path = require('path')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin');

const codeDir = path.resolve(__dirname, 'src')
const inputSource = path.resolve(codeDir, 'index.js')
const outputDir = path.resolve(__dirname, 'dist')
const modulesDir = path.resolve(__dirname, 'node_modules')
module.exports = {
    entry: {
        mathTest: inputSource
    },
    mode: 'development',
    optimization: {
        minimize: true,
        minimizer: [
            //可以支持es6,默认的使用TerserPlugin
            new TerserPlugin({
                include: /\.min\.js/
            })
        ]
    },
    output: {
        path: outputDir,
        clean: true,
        filename: '[name].js',
        library: 'mathTest',//配置导出库的名称
        libraryExport: 'default',
        libraryTarget: 'umd'//配置以何种方式导出库,是字符串的枚举类型
    },
    plugins: [
        new ProgressBarPlugin({
            format: ':msg [:bar] ${chalk.green.bold(":percent")} (:elapsed s)'
        })
    ]
}