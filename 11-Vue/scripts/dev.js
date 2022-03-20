const args = require('minimist')(process.argv.slice(2))
const { resolve } = require('path')
const { build } = require('esbuild')
console.log(args)


const target = args['_'][0] || 'reactivity'
const format = args.f || 'global'

const pkg = require(resolve(__dirname, `../packages/${target}/package.json`))
const outputFormat = format.startsWith('global') ? 'iife' : format == 'cjs' ? 'cjs' : 'esm'
const inputFile = [
    resolve(__dirname, `../packages/${target}/src/index.ts`)
]
const outputPath = resolve(__dirname, `../packages/${target}/dist/${target}.${outputFormat}.js`)


build({
    entryPoints: inputFile,
    outfile: outputPath,
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