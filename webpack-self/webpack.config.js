const { merge } = require('webpack-merge')
const path = require('path')
const base = require('./webpack.common')
const outputDir = path.resolve(__dirname, 'dist')
module.exports = merge(base, {
    mode: 'development',
    devServer: {
        static: {
            directory: outputDir
        },
        host: 'localhost',
        compress: true,
        port: 8080,
        proxy: {
            "/api": {
                //    target: 'http://localhost:3000',
                //    pathRewrite:{"^/api":""}        
            }
        },
    },
})