const resolveConfig = require("../config");
const connect = require("connect");
const serveStaticMiddleware = require("./static");
function createServer() {
  const middlewares = connect();
  const config = resolveConfig();
  middlewares.use(serveStaticMiddleware(config));
  return {
    listen(port) {
      require("http")
        .createServer(middlewares)
        .listen(port, () => {
          console.log(`server startup in ${port}`);
        });
    },
  };
}

exports.createServer = createServer;
