import type { App, Directive, DirectiveBinding } from "vue";

function isDebounce(el: Element, binding: any) {
  const [callback, time = 300, arg = [], immediate = false]: [
    Fn,
    number,
    any[],
    boolean
  ] = binding.value;
  let timer: any;
  // 只执行一次
  let only = true;

  el.addEventListener("click", () => {
    // 是否立即执行
    if (immediate && only) {
      only = false;
      callback(...arg);
    }

    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      callback(...arg);
    }, time);
  });
}

const mounted = (el: Element, binding: DirectiveBinding<any>) => {
  isDebounce(el, binding);
};

const debounceDirective: Directive = {
  mounted,
};
export function setupDebounceDirective(app: App) {
  app.directive("debounce", debounceDirective);
}

export default debounceDirective;
