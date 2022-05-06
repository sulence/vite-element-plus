import { RouteLocationNormalized, Router } from "vue-router";
import { createPermissionGuard } from "./permissionGuard";

// Don't change the order of creation
export function setupRouterGuard(router: Router) {
  createPermissionGuard(router);
  createScrollGuard(router);
}

// Routing switch back to the top
function createScrollGuard(router: Router) {
  const isHash = (href: string) => {
    return /^#/.test(href);
  };

  const body = document.body;

  router.afterEach(async (to) => {
    // scroll top
    isHash((to as RouteLocationNormalized & { href: string })?.href) &&
      body.scrollTo(0, 0);
    return true;
  });
}
