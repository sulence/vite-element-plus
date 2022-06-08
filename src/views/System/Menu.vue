<template>
  <div class="app-container">
    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button type="primary" plain size="small">新增</el-button>
        <el-button v-auth="['1000']" type="primary" plain size="small"
          >新增 1000</el-button
        >

        <el-button
          v-if="hasPermission(['1000'])"
          type="primary"
          plain
          size="small"
          >新增 hasPermission 1000</el-button
        >
      </el-col>
    </el-row>

    <el-table
      v-loading="loading"
      :data="menuList"
      row-key="id"
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
    >
      <el-table-column
        prop="name"
        label="菜单名称"
        :show-overflow-tooltip="true"
        width="160"
      ></el-table-column>
      <el-table-column prop="icon" label="图标" align="center" width="100">
        <template #default="scope">
          <SvgIcon :icon-class="scope.row.icon" />
        </template>
      </el-table-column>
      <el-table-column
        prop="component"
        label="组件路径"
        :show-overflow-tooltip="true"
      ></el-table-column>
    </el-table>
  </div>
</template>
<script lang="ts" setup>
import { usePermission } from "@/hooks/web/usePermission";
import { ref } from "vue";
import { MenuList, list } from "./menuList";
let loading = ref<boolean>(false);
let menuList = ref<MenuList[]>();

const { hasPermission } = usePermission();

const handleTree = (
  data: MenuList[],
  id = "id",
  parentId = "parentId",
  rootId = 0
) => {
  rootId =
    rootId ||
    Math.min.apply(
      Math,
      data.map((item) => {
        return item[parentId as keyof object];
      })
    );
  //对源数据深度克隆
  const cloneData = JSON.parse(JSON.stringify(data));
  //循环所有项
  const treeData = cloneData.filter((father: MenuList) => {
    let branchArr = cloneData.filter((child: MenuList) => {
      //返回每一项的子级数组
      return father[id as keyof object] === child[parentId as keyof object];
    });
    branchArr.length > 0 ? (father.children = branchArr) : "";
    //返回第一层
    return father[parentId as keyof object] === rootId;
  });
  return treeData != "" ? treeData : data;
};
menuList = handleTree(list);
</script>

<style lang="scss" scoped>
.app-container {
  :deep(.el-button) {
    color: red;
  }
  :deep(.svg-icon) {
    color: red;
  }
}
</style>
