<template>
  <div class="test">Layout</div>
  <div v-for="item in menus" :key="item.id" class="132456">
    <router-link :to="item.path">{{ item.meta.title }}</router-link>
    <div v-for="child in item.children" :key="child.id" class="">
      ----------<router-link :to="child.path">{{
        child.meta.title
      }}</router-link>
    </div>
  </div>
  <router-view />
</template>
<script lang="ts">
import { defineComponent, onMounted, ref, watch } from "vue";
import { useRoute } from "vue-router";
import { usePermissionStoreWithOut } from "@/store/modules/permission";

export default defineComponent({
  props: {
    mode: {
      // 菜单模式
      type: String,
      default: "vertical",
    },
    collapsed: {
      // 侧边栏菜单是否收起
      type: Boolean,
    },
    //位置
    location: {
      type: String,
      default: "left",
    },
  },
  setup() {
    // 当前路由
    const currentRoute = useRoute();
    const asyncRouteStore = usePermissionStoreWithOut();
    const menus = ref<any[]>([]);
    watch(
      () => currentRoute.fullPath,
      () => {
        updateMenu();
      }
    );
    function updateMenu() {
      console.log(asyncRouteStore.getMenus);

      menus.value = asyncRouteStore.getMenus;
    }
    onMounted(() => {
      updateMenu();
    });

    return {
      menus,
    };
  },
});
</script>

<style scoped></style>
