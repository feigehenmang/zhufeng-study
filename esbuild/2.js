const envPlugins = {
  name: "env",
  setup(build) {
    build.onResolve({ filter: /^env$/ }, (args) => {
      console.log("args", args);
      return {
        path: args.path,
        namespace: "env-ns",
      };
    });
    build.onLoad({ filter: /.*/, namespace: "env-ns" }, (...args) => {
      console.log("onLoadArgs", args);
      console.log(process.env);
      return {
        contents: `export default ${JSON.stringify(process.env)}`,
        loader: "js",
      };
    });
  },
};
require("esbuild").build({
  entryPoints: ["main.js"],
  bundle: true,
  outfile: "out.js",
  plugins: [envPlugins],
});
