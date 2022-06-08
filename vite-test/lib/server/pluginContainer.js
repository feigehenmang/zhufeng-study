const path = require("path");
const { normalizePath } = require("../utils");
async function createPluginContainer({ plugins, root }) {
  // 创建vite插件上下文 并且拥有resolve方法
  class PluginContext {
    async resolve(id, importer = path.join(root, "index.html")) {
      return await container.resolveId(id, importer);
    }
  }
  const container = {
    async resolveId(id, importer) {
      const ctx = new PluginContext();
      let resolveId = id;
      for (const plugin of plugins) {
        const result = await plugin.resolveId.call(ctx, id, importer);
        if (result) {
          resolveId = result.id || result;
          break;
        }
      }
      return { id: normalizePath(resolveId) };
    },
  };
  return container;
}

exports.createPluginContainer = createPluginContainer;
