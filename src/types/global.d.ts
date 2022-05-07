import type {
  ComponentPublicInstance,
  FunctionalComponent,
  PropType as VuePropType,
} from "vue";

declare global {
  type Recordable<T = any> = Record<string, T>;

  type TimeoutHandle = ReturnType<typeof setTimeout>;

  type DeepPartial<T> = {
    [P in keyof T]?: DeepPartial<T[P]>;
  };

  // vue
  type PropType<T> = VuePropType<T>;
}
declare module "vue" {
  export type JSXComponent<Props = any> =
    | { new (): ComponentPublicInstance<Props> }
    | FunctionalComponent<Props>;
}
