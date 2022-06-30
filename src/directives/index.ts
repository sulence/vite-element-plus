/**
 * Configure and register global directives
 */
import type { App } from "vue";
import { setupPermissionDirective } from "./permission";
// import { setupLoadingDirective } from "./loading";
import { setupDebounceDirective } from "./debounce";
import { setupThrottleDirective } from "./throttle";
import { setupCopyDirective } from "./copy";

export function setupGlobDirectives(app: App) {
  setupPermissionDirective(app);
  setupDebounceDirective(app);
  setupThrottleDirective(app);
  setupCopyDirective(app);
  // setupLoadingDirective(app);
}
