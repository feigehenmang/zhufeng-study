const { createServer } = require("./server/index");
console.log(createServer);
(async function () {
  const server = await createServer();
  server.listen(9000);
})();
