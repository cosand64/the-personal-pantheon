import { dirname, resolve } from "path";
import { defineConfig } from "vite";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  root: "src/",

  build: {
    outDir: "../dist",
    rollupOptions: {
      input: {
        main: resolve(__dirname, "src/index.html"),
      }
    }
  },

  server: {
    proxy: {
      '/api/comicvine': {
        target: 'https://comicvine.gamespot.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/comicvine/, '/api'),
      }
    }
  }
});
