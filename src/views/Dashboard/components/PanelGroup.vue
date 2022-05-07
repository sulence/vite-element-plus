<template>
  <el-row :gutter="20" class="panel-group">
    <el-col
      v-for="item in panelGroupList"
      :key="item.title"
      :xs="12"
      :sm="12"
      :lg="6"
      class="card-panel-col"
    >
      <el-card class="box-card">
        <template #header>
          <div class="card-header">
            <span>{{ item.title }}</span>
            <el-tag :type="item.type">{{ item.action }}</el-tag>
          </div>
        </template>
        <div class="card-container">
          <CountTo
            :start-val="0"
            :end-val="item.value"
            :duration="2000"
            class="card-panel-num"
          />
          <SvgIcon :icon-class="item.icon" class-name="card-panel-icon" />
        </div>
        <div class="card-footer">
          <span>总{{ item.title }}</span>
          <CountTo :start-val="0" :end-val="item.total" :duration="2000" />
        </div>
      </el-card>
    </el-col>
  </el-row>
</template>
<script lang="ts" setup>
import { CountTo } from "@/components/CountTo/index";
import { panelGroupList } from "../data";
</script>

<style lang="scss" scoped>
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.card-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 16px 16px;
  .card-panel-num {
    font-size: 20px;
  }
  .card-panel-icon {
    font-size: 40px;
  }
}
.card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 16px;
}
</style>
