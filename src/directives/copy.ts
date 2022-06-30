/* eslint-disable @typescript-eslint/ban-types */
import type { App, Directive, DirectiveBinding } from "vue";
import { ElMessage } from "element-plus";

function isCopy(el: Element, binding: any) {
  if (
    !(binding.value instanceof Array) &&
    typeof binding.value != "string" &&
    typeof binding.value != "number"
  ) {
    throw new Error(`value 类型错误，只能为 String、Array 以及 Number`);
  }

  const val = binding.value instanceof Array ? binding.value[0] : binding.value;

  el.addEventListener("click", () => {
    // 获取需要复制的值
    const callback =
      Array.isArray(binding.value) && binding.value.length > 1
        ? binding.value[1]
        : () => ElMessage.success("复制成功！");

    if (!val) {
      throw new Error(`value 不能为空`);
    }

    // 创建dom
    const input = document.createElement("input");
    document.body.appendChild(input);
    input.setAttribute("value", val);
    // 选中文本
    input.select();
    if (document.execCommand("copy")) {
      document.execCommand("copy");
      callback();
    }
    //  删除dom
    document.body.removeChild(input);
  });
}

const mounted = (el: Element, binding: DirectiveBinding<any>) => {
  isCopy(el, binding);
};

const copyDirective: Directive = {
  mounted,
};
export function setupCopyDirective(app: App) {
  app.directive("copy", copyDirective);
}

export default copyDirective;
