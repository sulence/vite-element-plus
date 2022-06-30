/* eslint-disable @typescript-eslint/ban-types */
import type { App, Directive, DirectiveBinding } from "vue";

function isThrottle(el: Element, binding: any) {
  const [callback, time = 300, arg = [], immediate = false]: [
    Fn,
    number,
    any[],
    boolean
  ] = binding.value;

  let bol = true;
  // 只执行一次
  let only = true;
  el.addEventListener("click", () => {
    // 是否立即执行
    if (immediate && only) {
      only = false;
      callback(...arg);
    }

    if (bol) {
      bol = false;
      setTimeout(() => {
        bol = true;
        callback(...arg);
      }, time);
    }
  });
}

const mounted = (el: Element, binding: DirectiveBinding<any>) => {
  isThrottle(el, binding);
};

const throttleDirective: Directive = {
  mounted,
};
export function setupThrottleDirective(app: App) {
  app.directive("throttle", throttleDirective);
}

export default throttleDirective;
