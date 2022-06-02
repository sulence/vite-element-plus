import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";

import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import { viteMockServe } from "vite-plugin-mock";

function pathResolve(dir: string) {
  return resolve(process.cwd(), ".", dir);
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
    createSvgIconsPlugin({
      //  指定需要缓存的图标文件夹
      iconDirs: [pathResolve("src/assets/icons/svg")],
      // 指定symbolId格式
      symbolId: "icon-[name]",
    }),
    viteMockServe({
      ignore: /^\_/,
      mockPath: "mock",
      localEnabled: true,
      injectCode: `
        import { setupProdMockServer } from './mock/_createProductionServer';

        setupProdMockServer();
        `,
    }),
  ],
  resolve: {
    alias: [
      {
        find: /\/#\//,
        replacement: pathResolve("types") + "/",
      },
      {
        find: "@",
        replacement: pathResolve("src") + "/",
      },
    ],
    dedupe: ["vue"],
  },
  css: {
    preprocessorOptions: {
      scss: {
        /* .scss全局预定义变量，引入多个文件 以;(分号分割)*/
      },
    },
  },
});
