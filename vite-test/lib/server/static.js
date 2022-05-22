const serveStatic = require("serve-static");

function serveStaticMiddleware(config) {
  const { root } = config;
  return serveStatic(root);
}

module.exports = serveStaticMiddleware;
