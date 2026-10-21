import { build } from "esbuild";

// 1) Local/long-running server: workspace packages (TypeScript source) are bundled; npm deps stay external.
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

// 2) Vercel function: ONE self-contained ESM file with every dependency bundled, so the
//    function never resolves ESM/CJS packages from node_modules at runtime.
//    PGlite (dev-only embedded DB, ships WASM) is excluded; production requires DATABASE_URL.
await build({
  entryPoints: ["src/vercel.ts"],
  outfile: "dist/vercel.mjs",
  bundle: true,
  platform: "node",
  format: "esm",
  target: "node22",
  sourcemap: false,
  external: ["@electric-sql/pglite", "@electric-sql/pglite/*"],
  // Bundled CommonJS deps call require()/__dirname; provide them in ESM.
  banner: {
    js: [
      'import { createRequire as __cr } from "node:module";',
      'import { fileURLToPath as __fu } from "node:url";',
      'import { dirname as __dn } from "node:path";',
      "const require = __cr(import.meta.url);",
      "const __filename = __fu(import.meta.url);",
      "const __dirname = __dn(__filename);",
    ].join("\n"),
  },
});

console.log("API built to dist/index.js (server) and dist/vercel.mjs (self-contained Vercel handler)");
