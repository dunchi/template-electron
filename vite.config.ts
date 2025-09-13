import { defineConfig } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

// ESM에서 __dirname 대체
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
  base: "./",
  build: {
    target: "ES6",
    outDir: "dist",
    sourcemap: true,
    minify: false,
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, "src/main.ts"),
        "preload-index": path.resolve(__dirname, "src/preload/index.ts"),
        "ipc-index": path.resolve(__dirname, "src/ipc/index.ts"),
        "renderer-app": path.resolve(__dirname, "src/renderer/app.ts"),
        "renderer-settings": path.resolve(
          __dirname,
          "src/renderer/settings.ts"
        ),
      },
      external: ["path", "fs", "os", "electron", "url", "crypto", "ollama"],
      output: {
        // 각 엔트리포인트별로 다른 출력 형식과 확장자 지정
        preserveModules: false,
        format: "esm",
        entryFileNames: (chunkInfo) => {
          // preload 파일은 .mjs로, 나머지는 .js로 출력
          if (chunkInfo.name.includes("preload")) {
            return "[name].mjs";
          }
          return "[name].js";
        },
        chunkFileNames: "[name].js",
        assetFileNames: "[name][extname]",
      },
      // treeshake: false,
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  optimizeDeps: {
    exclude: ["electron"],
  },
});
