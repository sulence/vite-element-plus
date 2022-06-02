<template>
  <div class="">
    <el-table :data="tableData" :border="true" :row-key="getRowKeys">
      <el-table-column type="selection" reserve-selection width="80" />
      <el-table-column
        prop="username"
        label="用户姓名"
        show-overflow-tooltip
        width="140"
      ></el-table-column>
      <el-table-column
        v-slot="scope"
        prop="gender"
        label="性别"
        show-overflow-tooltip
        width="140"
      >
        {{ scope.row.gender == 1 ? "男" : "女" }}
      </el-table-column>
      <el-table-column
        prop="idCard"
        label="身份证号"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column
        prop="email"
        label="邮箱"
        show-overflow-tooltip
        width="240"
      ></el-table-column>
      <el-table-column
        prop="address"
        label="居住地址"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column
        prop="createTime"
        label="创建时间"
        show-overflow-tooltip
        width="200"
      ></el-table-column>
      <el-table-column v-slot="scope" label="操作" fixed="right" width="320">
        <el-button type="primary" link>查看</el-button>
        <el-button type="primary" link>编辑</el-button>
        <el-button type="primary" link>删除</el-button>
      </el-table-column>
      <template #empty>
        <div class="table-empty">
          <img src="@/assets/images/notData.png" alt="notData" />
          <div>暂无数据</div>
        </div>
      </template>
    </el-table>
  </div>
</template>

<script setup lang="ts" name="useHooks">
import { onMounted } from "vue";
import { useTable } from "@/hooks/web/useTable";
import { getTableListApi } from "@/api/table";
import { useSelection } from "@/hooks/web/useSelection";
const {
  tableData,
  searchShow,
  pageable,
  searchParam,
  getTableList,
  search,
  reset,
  handleSizeChange,
  handleCurrentChange,
} = useTable(getTableListApi);
// 数据多选
const { isSelected, selectedListIds, selectionChange, getRowKeys } =
  useSelection();
onMounted(() => {
  getTableList();
});
</script>

<style></style>
