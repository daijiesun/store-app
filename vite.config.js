import {
  defineConfig
} from 'vite'
import vue from '@vitejs/plugin-vue'
import styleImport from 'vite-plugin-style-import'
import path from "path"
import pluginRewriteAll from 'vite-plugin-rewrite-all'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    pluginRewriteAll(),
    styleImport({
      libs: [{
        libraryName: 'vant',
        esModule: true,
        resolveStyle: (name) => `vant/es/${name}/style`,
      }, ],
    }),
  ],
  resolve: {
    // extensions: ['.vue', '.js', 'ts', '.mjs'],
    alias: {
      "@": path.join(__dirname, 'src')
    }
  },
  base: process.env.NODE_ENV === "production" ? "/store-app/" : "/",
  build:{
    outDir: "docs"
  }
})