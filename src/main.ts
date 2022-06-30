import { createApp } from "vue";
import App from "./App.vue";
import { setupStore } from "@/store";
import { router, setupRouter } from "./router";
import { setupRouterGuard } from "./router/guard";
import "@/styles/index.scss"; // global css
import "normalize.css";
import "@/components/SvgIcon"; // icon
import "virtual:svg-icons-register";
import { setupGlobDirectives } from "@/directives";
import "element-plus/dist/index.css";
import { debounce, throttle } from "@/utils/directive";

async function initApp() {
  const app = createApp(App);

  // 挂载状态管理
  setupStore(app);

  // 挂载路由
  setupRouter(app);

  // router-guard
  setupRouterGuard(router);
  // Register global directive
  setupGlobDirectives(app);

  app.config.globalProperties.$debounce = debounce;
  app.config.globalProperties.$throttle = throttle;

  app.mount("#app");
}

void initApp();
