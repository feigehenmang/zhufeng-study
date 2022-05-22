require("esbuild").build({
  entryPoints: ["main.js"],
  outfile: "out.js",
  bundle: true,
  loader: {
    ".js": "jsx",
  },
});
