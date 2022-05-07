<template>
  <div class="app-container">
    <PanelGroup />
    <PanelChart />

    <el-row :gutter="20">
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <VisitRadar />
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <VisitSource />
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <SalesProductPie />
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script lang="ts" setup>
import PanelGroup from "./components/PanelGroup.vue";
import PanelChart from "./components/PanelChart.vue";
import VisitRadar from "./components/VisitRadar.vue";
import VisitSource from "./components/VisitSource.vue";
import SalesProductPie from "./components/SalesProductPie.vue";
</script>

<style scoped></style>
