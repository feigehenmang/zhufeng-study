const {build} = require('esbuild')
const arg = require('minimist')(process.argv.slice(2))
// console.log(arg)
const { resolve} = require('path')


const target = arg['_'][0] || 'reactivity'
const format = arg['f'] || 'global'
const pkg = require(`../packages/${target}/package.json`)

const outputFormat = format.startsWith('global') ? 'iife' : format === 'cjs' ? 'cjs' : 'esm'

const outputFile = resolve(__dirname, '../packages', target, 'dist', `${target}.${outputFormat}.js`)
const entryPoints = [resolve(__dirname, '../packages', target, 'src/index.ts')]
build({
    entryPoints,
    outfile: outputFile,
    bundle: true,
    sourcemap: true,
    format: outputFormat,
    globalName: pkg.buildOptions?.name,
    platform: format === 'cjs' ? 'node' : 'browser',
    watch: { // 监控文件变化
        onRebuild(error) {
            if (!error) console.log(`rebuilt~~~~`)
        }
    }
}).then(() => {
    console.log('watching')
})