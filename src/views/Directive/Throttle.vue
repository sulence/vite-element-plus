<template>
  <el-card>
    <h4 style="margin-bottom: 0">节流</h4>

    <div class="grid grid-c-3">
      <div>
        <div class="tipBox warning">
          基础节流（指令）
          <div style="font-size: 13px">v-throttle="[msg]"</div>
        </div>
        <el-button v-throttle="[msg]" type="warning">点击触发</el-button>
      </div>

      <div>
        <div class="tipBox warning">
          立即执行（指令）
          <div style="font-size: 13px">v-throttle="[msg, 2000, [], true]"</div>
        </div>
        <el-button v-throttle="[msg, 2000, [], true]" type="warning"
          >点击触发</el-button
        >
      </div>

      <div>
        <div class="tipBox warning">
          带参（指令）
          <div style="font-size: 13px">
            v-throttle="[msg, 2000, ['风和自由']]"
          </div>
        </div>
        <el-button v-throttle="[msg, 2000, ['风和自由']]" type="warning"
          >点击触发</el-button
        >
      </div>
    </div>

    <div class="grid grid-c-3">
      <div>
        <div class="tipBox warning">
          基础节流（函数）
          <div style="font-size: 13px">@click="$throttle(msg)"</div>
        </div>
        <el-button type="warning" @click="$throttle(msg)">点击触发</el-button>
      </div>

      <div>
        <div class="tipBox warning">
          立即执行（函数）
          <div style="font-size: 13px">
            @click="$throttle(msg, 2000), [], true)"
          </div>
        </div>
        <el-button type="warning" @click="$throttle(msg, 2000, [], true)"
          >点击触发</el-button
        >
      </div>

      <div>
        <div class="tipBox warning">
          带参（函数）
          <div style="font-size: 13px">
            @click="$throttle(msg, 2000), ['诗和远方', 'warning'])"
          </div>
        </div>
        <el-button
          type="warning"
          @click="$throttle(msg, 2000, ['诗和远方', 'warning'])"
          >点击触发</el-button
        >
      </div>
    </div>
  </el-card>
</template>
<script lang="ts" setup>
import { useMessage } from "@/hooks/web/useMessage";
const { createMessage } = useMessage();
const msg = (str = "触发", type = "success") => {
  createMessage({
    message: str,
    type,
  });
};
</script>
