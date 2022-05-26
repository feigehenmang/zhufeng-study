const { build } = require("esbuild");
const esbuildScanPlugin = require("./esbuildScanPlugin");

const path = require("path");
async function scanImports(config) {
  const depImports = {}; // 最终收集的第三方模块信息
  const esPlugin = await esbuildScanPlugin(config, depImports);
  await build({
    absWorkingDir: config.root,
    entryPoints: [path.resolve("./index.html")],
    bundle: true,
    format: "esm",
    outfile: "dist/index.js",
    write: false,
    plugins: [esPlugin],
  });
  return depImports;
}
module.exports = scanImports;
