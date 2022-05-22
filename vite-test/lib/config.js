const { normalizePath } = require("./utils");

function resolveConfig() {
  const config = {
    root: normalizePath(process.cwd()),
  };
  return config;
}

module.exports = resolveConfig;
