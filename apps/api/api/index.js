// Vercel function entry: the real handler is bundled by `npm run build` (esbuild) into dist/vercel.js,
// because workspace packages (@astronex/*) ship TypeScript source.
export { default } from "../dist/vercel.js";
