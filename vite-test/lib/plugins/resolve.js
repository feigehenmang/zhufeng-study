const fs = require("fs");
const path = require("path");
const resolve = require("resolve");
function resolvePlugin(config) {
  // resolve vite 插件
  return {
    name: "vite:resolve",
    resolveId(id, importer) {
      if (path.isAbsolute(id)) {
        //   绝对路径
        return { id };
      }
      // 绝对路径
      if (id.startsWith("/")) {
        return {
          id: path.resolve(config.root, id.slice(1)),
        };
      }

      if (id.startsWith(".")) {
        // 相对路径
        const baseDir = path.baseDir(id);
        const fsPath = path.resolve(baseDir, id);
        return { id: fsPath };
      }
      // 可能是第三方包
      let res = tryNodeResolve(id, importer, config);
      if (res) {
        return res;
      }
    },
  };
}
function tryNodeResolve(id, importer, config) {
  const pkgPath = resolve.sync(`${id}/package.json`, { basedir: config.root });
  // const pkgPath = require.resolve(`${id}/package.json`)
  const pkgDir = path.dirname(pkgPath);
  const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf-8"));
  const entryPoint = pkg.module;
  const entryPointPath = path.join(pkgDir, entryPoint);
  return { id: entryPointPath };
}

module.exports = resolvePlugin;
