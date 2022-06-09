import { Menu } from "@/router/types";
import { usePermissionStoreWithOut } from "@/store/modules/permission";
import { useDebounceFn } from "@vueuse/core";
import { cloneDeep } from "lodash-es";
import { onBeforeMount, ref, unref } from "vue";

export interface SearchResult {
  name: string;
  path: string;
  icon?: string;
}

// Translate special characters
function transform(c: string) {
  const code: string[] = [
    "$",
    "(",
    ")",
    "*",
    "+",
    ".",
    "[",
    "]",
    "?",
    "\\",
    "^",
    "{",
    "}",
    "|",
  ];
  return code.includes(c) ? `\\${c}` : c;
}

function createSearchReg(key: string) {
  const keys = [...key].map((item) => transform(item));
  const str = ["", ...keys, ""].join(".*");
  return new RegExp(str);
}

export function useMenuSearch() {
  const keyword = ref("");
  const searchResult = ref<SearchResult[]>([]);
  const activeIndex = ref(-1);

  let menuList: Menu[] = [];

  const permissionStore = usePermissionStoreWithOut();

  onBeforeMount(() => {
    const list = permissionStore.getMenus;
    menuList = cloneDeep(list);
  });

  const handleSearch = useDebounceFn(search, 200);

  function search(key: string) {
    keyword.value = key;
    if (!key) {
      searchResult.value = [];
      return;
    }
    const reg = createSearchReg(unref(keyword));
    // const filterMenu = filter(menuList, (item) => {
    //   return reg.test(item.name) && !item.hideMenu;
    // });
    searchResult.value = handlerSearchResult(menuList, reg);

    activeIndex.value = 0;
  }

  const handlerSearchResult = (
    filterMenu: Menu[],
    reg: RegExp,
    parent?: Menu
  ) => {
    let ret: SearchResult[] = [];
    filterMenu.forEach((item) => {
      const { name, path, icon, children, hideMenu, meta } = item;
      if (
        !hideMenu &&
        reg.test(name) &&
        (!children?.length || meta?.hideChildrenInMenu)
      ) {
        ret.push({
          name: parent?.name ? `${parent.name} > ${name}` : name,
          path,
          icon,
        });
      }

      if (
        !meta?.hideChildrenInMenu &&
        Array.isArray(children) &&
        children.length
      ) {
        const childrenRet = handlerSearchResult(children, reg, item);
        ret = ret.concat(childrenRet);
      }
    });
    return ret;
  };

  const resetSearch = () => {
    keyword.value = "";
    searchResult.value = [];
    activeIndex.value = -1;
  };

  return {
    handleSearch,
    searchResult,
    keyword,
    resetSearch,
  };
}
