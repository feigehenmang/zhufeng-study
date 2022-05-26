const scanImports = require("./scan");
async function createOptimizeDepsRun(config) {
  const deps = await scanImports(config);
  console.log("deps", deps);
}
exports.createOptimizeDepsRun = createOptimizeDepsRun;
