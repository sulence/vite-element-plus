<template>
  <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
    <el-tab-pane label="流量趋势" name="tab1">
      <VisitAnalysis />
    </el-tab-pane>
    <el-tab-pane label="访问量" name="tab2">
      <VisitAnalysisBar />
    </el-tab-pane>
  </el-tabs>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import type { TabsPaneContext } from "element-plus";

import VisitAnalysis from "./VisitAnalysis.vue";
import VisitAnalysisBar from "./VisitAnalysisBar.vue";

const activeName = ref("tab1");

const handleClick = (tab: TabsPaneContext, event: Event) => {
  console.log(tab, event);
};
</script>
<style>
.demo-tabs > .el-tabs__content {
  padding: 32px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}
</style>
