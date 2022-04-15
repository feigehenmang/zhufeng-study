const path = require("path");
const ts = require("rollup-plugin-typescript2");
const { default: nodeResolve } = require("@rollup/plugin-node-resolve");
console.log(nodeResolve);
export default {
  input: "src/index.ts",
  output: {
    file: path.resolve(__dirname, "./dist/bundle.js"),
    format: "iife",
    sourcemap: true,
  },
  plugins: [ts(), nodeResolve()],
};
