import { screenEnum, sizeEnum } from "@/enums/breakpointEnum";
import { computed, ComputedRef, unref } from "vue";

let globalScreenRef: ComputedRef<sizeEnum | undefined>;
let globalWidthRef: ComputedRef<number>;
let globalRealWidthRef: ComputedRef<number>;

export function useBreakpoint() {
  return {
    screenRef: computed(() => unref(globalScreenRef)),
    widthRef: globalWidthRef,
    screenEnum,
    realWidthRef: globalRealWidthRef,
  };
}
