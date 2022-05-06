declare type Recordable<T = any> = Record<string, T>;

declare type TimeoutHandle = ReturnType<typeof setTimeout>;

declare type DeepPartial<T> = {
  [P in keyof T]?: DeepPartial<T[P]>;
};
