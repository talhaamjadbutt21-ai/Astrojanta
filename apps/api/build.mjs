import { build } from "esbuild";

// Workspace packages ship TypeScript source, so they are bundled; npm dependencies stay external.
await build({
  entryPoints: ["src/index.ts"],
  outfile: "dist/index.js",
  bundle: true,
  platform: "node",
  format: "esm",
  target: "node22",
  sourcemap: true,
  plugins: [
    {
      name: "externalize-npm-deps",
      setup(b) {
        b.onResolve({ filter: /^[^./]/ }, (args) =>
          args.path.startsWith("@astronex/") ? undefined : { path: args.path, external: true },
        );
      },
    },
  ],
});

console.log("API built to dist/index.js");
