// const connect = require("connect");
const http = require("http");

const middlewares = connect();
function connect() {
  let index = 0;
  const callbacks = [];
  const callback = function (req, res) {
    const next = () => {
      callbacks[index++](req, res, next);
    };
    next();
  };
  callback.use = function (fn) {
    callbacks.push(fn);
  };
  return callback;
}
middlewares.use(function (req, res, next) {
  console.log("middleware1");
  next();
});
middlewares.use(function (req, res, next) {
  console.log("middleware2");
  next();
});
middlewares.use(function (req, res, next) {
  res.end("Hello from Connect!");
});
http.createServer(middlewares).listen(3000);
