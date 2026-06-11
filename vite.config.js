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
      '/comicvine': {
        target: 'https://comicvine.gamespot.com/api',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/comicvine/, '')
      }
    }
  }
});
