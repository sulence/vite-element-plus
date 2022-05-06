import { RouteLocationNormalized } from "vue-router";
import mitt from "@/utils/mitt";

const emitter = mitt();
const key = Symbol();

let lastChangeTab: RouteLocationNormalized;

export function listenerRouteChange(
  callback: (route: RouteLocationNormalized) => void,
  immediate = true
) {
  emitter.on(key, callback);
  immediate && lastChangeTab && callback(lastChangeTab);
}
