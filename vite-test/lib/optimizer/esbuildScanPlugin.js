// const htmlTypesRE = /\.html$/;
// const JS_TYPE_RE = /\.js$/;
// const scriptModuleRE = /<script\s+type="module"\s+src\="(.+?)"><\/script>/;
// const fs = require("fs");
// const path = require("path");
// const resolvePlugin = require("../plugins/resolve");
// const { createPluginContainer } = require("../server/pluginContainer");
// const { normalizePath } = require("../utils");
// async function esbuildScanPlugin(config, depImports) {
//   config.plugins = [resolvePlugin(config)];
//   // 创建vite插件上下文，拥有resolveId方法
//   const container = await createPluginContainer(config);
//   const resolve = async (id, importer) => {
//     return await container.resolveId(id, importer);
//   };
//   return {
//     // 插件 esbuild插件
//     name: "vite:dep-scan",
//     setup(build) {
//       // 入口  将html检索并分类
//       build.onResolve(
//         {
//           filter: htmlTypesRE,
//         },
//         async ({ path, importer }) => {
//           // html /Users/lijinfei/Documents/coding/zhufeng/vite-test-use/index.html
//           //   console.log("html", path, importer);
//           const resolved = await resolve(path, importer);
//           if (resolved) {
//             return {
//               path: resolved.id || resolved,
//               namespace: "html",
//             };
//           }
//         }
//       );
//       // 处理js
//       build.onResolve({ filter: /.*/ }, async ({ path, importer }) => {
//         const resolved = await resolve(path, importer);
//         if (resolved) {
//           const id = resolved.id || resolved;
//           const included = id.includes("node_modules");
//           if (included) {
//             depImports[path] = normalizePath(id);
//             return {
//               path: id,
//               external: true,
//             };
//           }
//           //   console.log("id", id);
//           return { path: id };
//         }
//         return {
//           path,
//         };
//       });
//       // 处理html html => js
//       build.onLoad(
//         { filter: htmlTypesRE, namespace: "html" },
//         async ({ path }) => {
//           let html = fs.readFileSync(path, "utf-8");
//           //   console.log("path", path, html);
//           const [, scriptSrc] = html.match(scriptModuleRE);
//           //   console.log(html.match(scriptModuleRE));
//           const js = `import ${JSON.stringify(scriptSrc)};\n`;
//           return {
//             loader: "js",
//             contents: js,
//           };
//         }
//       );
//       build.onLoad({ filter: JS_TYPE_RE }, ({ path: id }) => {
//         let ext = path.extname(id).slice(1);
//         let contents = fs.readFileSync(id, "utf-8");
//         return {
//           loader: ext,
//           contents,
//         };
//       });
//     },
//   };
// }

// module.exports = esbuildScanPlugin;
const fs = require("fs-extra");
const path = require("path");
const { createPluginContainer } = require("../server/pluginContainer");
const resolvePlugin = require("../plugins/resolve");
const { normalizePath } = require("../utils");
const htmlTypesRE = /\.html$/;
const scriptModuleRE = /<script type="module" src\="(.+?)"><\/script>/;
const JS_TYPES_RE = /\.js$/;
async function esbuildScanPlugin(config, depImports) {
  config.plugins = [resolvePlugin(config)];
  const container = await createPluginContainer(config);
  const resolve = async (id, importer) => {
    return await container.resolveId(id, importer);
  };
  return {
    name: "vite:dep-scan",
    setup(build) {
      build.onResolve({ filter: htmlTypesRE }, async ({ path, importer }) => {
        const resolved = await resolve(path, importer);
        if (resolved) {
          return {
            path: resolved.id || resolved,
            namespace: "html",
          };
        }
      });
      build.onResolve({ filter: /.*/ }, async ({ path, importer }) => {
        const resolved = await resolve(path, importer);
        if (resolved) {
          const id = resolved.id || resolved;
          const included = id.includes("node_modules");
          if (included) {
            depImports[path] = normalizePath(id);
            return {
              path: id,
              external: true,
            };
          }
          return {
            path: id,
          };
        }
        return { path };
      });
      build.onLoad(
        { filter: htmlTypesRE, namespace: "html" },
        async ({ path }) => {
          let html = fs.readFileSync(path, "utf-8");
          let [, scriptSrc] = html.match(scriptModuleRE);
          let js = `import ${JSON.stringify(scriptSrc)};\n`;
          return {
            loader: "js",
            contents: js,
          };
        }
      );
      build.onLoad({ filter: JS_TYPES_RE }, ({ path: id }) => {
        let ext = path.extname(id).slice(1);
        let contents = fs.readFileSync(path.join(config.root, id), "utf-8");
        return {
          loader: ext,
          contents,
        };
      });
    },
  };
}
module.exports = esbuildScanPlugin;
