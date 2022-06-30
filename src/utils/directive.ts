/**
 * @param callback - 回调事件
 * @param time - 间隔时间，默认300
 * @param arg - 参数
 * @param immediate - 开始时还是结束时 默认false结束时, true开始时
 *  例：<el-button @click="debounce(callback,300)"></el-button>
 */
export const debounce = (
  callback: Fn,
  time = 200,
  immediate = false,
  arg?: any[]
): Fn | void => {
  const args = arg ? arg : [];
  let timer: any = null;
  // 只执行一次
  let debounceOnly = true;
  // 是否立即执行
  if (immediate && debounceOnly) {
    debounceOnly = false;
    callback(...args);
  }

  if (timer) clearTimeout(timer);
  timer = setTimeout(() => {
    callback(...args);
  }, time || 300);
};

/**
 * @param callback - 回调事件
 * @param time - 间隔时间，默认200
 * @param immediate - 开始时还是结束时 默认false结束时, true开始时
 *  例：<el-button @clicke="throttle(callback,300)"></el-button>
 */
export const throttle = (
  callback: Fn,
  time = 200,
  immediate = false,
  arg?: any[]
): Fn | void => {
  const args = arg ? arg : [];

  let bol = true;
  // 只执行一次
  let throttleOnly = true;
  // 是否立即执行
  if (immediate && throttleOnly) {
    throttleOnly = false;
    return callback(...args);
  }

  if (bol) {
    bol = false;
    setTimeout(() => {
      bol = true;
      return callback(...args);
    }, time);
  }
};
