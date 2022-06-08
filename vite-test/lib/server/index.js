const resolveConfig = require("../config");
const connect = require("connect");
const serveStaticMiddleware = require("./static");
const { createOptimizeDepsRun } = require("../optimizer");
function createServer() {
  const middlewares = connect();
  const config = resolveConfig();
  middlewares.use(serveStaticMiddleware(config));
  return {
    async listen(port) {
      // 预分析  通过esbuild将代码语法分析得出有哪些第三方模块
      debugger;
      await runOptimize(config);
      require("http")
        .createServer(middlewares)
        .listen(port, () => {
          console.log(`server startup in ${port}`);
        });
    },
  };
}

async function runOptimize(config) {
  await createOptimizeDepsRun(config);
}
exports.createServer = createServer;
