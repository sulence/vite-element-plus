<template>
  <div class="">
    <el-form
      ref="formRef"
      :model="searchParam"
      :inline="true"
      label-width="100px"
    >
      <el-form-item label="用户姓名 :">
        <el-input
          v-model="searchParam.username"
          placeholder="请输入"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" :icon="Search" @click="search">
          搜索
        </el-button>
        <el-button :icon="Refresh" @click="reset">重置</el-button>
      </el-form-item>
    </el-form>

    <el-table
      :data="tableData"
      :border="true"
      :row-key="getRowKeys"
      @selection-change="selectionChange"
    >
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

    <el-pagination
      :current-page="pageable.pageNum"
      :page-size="pageable.pageSize"
      :page-sizes="[10, 25, 50, 100]"
      background
      layout="total, sizes, prev, pager, next, jumper"
      :total="pageable.total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    ></el-pagination>
  </div>
</template>

<script setup lang="ts" name="useHooks">
import { onMounted } from "vue";
import { useTable } from "@/hooks/web/useTable";
import { getTableListApi } from "@/api/table";
import { useSelection } from "@/hooks/web/useSelection";
import { Refresh, Search } from "@element-plus/icons-vue";
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
