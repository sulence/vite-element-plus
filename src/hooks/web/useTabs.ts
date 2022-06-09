import type { RouteLocationNormalized, Router } from "vue-router";
import { useRouter } from "vue-router";
import { unref } from "vue";
import { useMultipleTabStore } from "@/store/modules/multipleTab";

enum TableActionEnum {
  REFRESH,
  CLOSE_ALL,
  CLOSE_LEFT,
  CLOSE_RIGHT,
  CLOSE_OTHER,
  CLOSE_CURRENT,
  CLOSE,
}

export function useTabs(_router?: Router) {
  const tabStore = useMultipleTabStore();
  const router = _router || useRouter();
  const { currentRoute } = router;

  function getCurrentTab() {
    const route = unref(currentRoute);
    return tabStore.getTabList.find(
      (item) => item.fullPath === route.fullPath
    )!;
  }

  // function canIUseTabs(): boolean {
  //   const { show } = appStore.getMultiTabsSetting;
  //   if (!show) {
  //     throw new Error(
  //       "The multi-tab page is currently not open, please open it in the settings！"
  //     );
  //   }
  //   return !!show;
  // }

  async function handleTabAction(
    action: TableActionEnum,
    tab?: RouteLocationNormalized
  ) {
    // const canIUse = canIUseTabs;
    // if (!canIUse) {
    //   return;
    // }
    const currentTab = getCurrentTab();
    switch (action) {
      case TableActionEnum.REFRESH:
        await tabStore.refreshPage(tab || currentTab, router);
        break;
      case TableActionEnum.CLOSE_OTHER:
        await tabStore.closeOtherTabs(tab || currentTab, router);
        break;
      case TableActionEnum.CLOSE_ALL:
        await tabStore.closeAllTab(router);
        break;
      case TableActionEnum.CLOSE_CURRENT:
      case TableActionEnum.CLOSE:
        await tabStore.closeTab(tab || currentTab, router);
        break;
    }
  }
  return {
    refreshPage: (tab: RouteLocationNormalized) =>
      handleTabAction(TableActionEnum.REFRESH, tab),
    close: (tab?: RouteLocationNormalized) =>
      handleTabAction(TableActionEnum.CLOSE, tab),
    closeOther: (tab: RouteLocationNormalized) =>
      handleTabAction(TableActionEnum.CLOSE_OTHER, tab),
    closeAll: () => handleTabAction(TableActionEnum.CLOSE_ALL),
  };
}
