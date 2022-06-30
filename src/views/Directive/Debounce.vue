<template>
  <el-card>
    <h4 style="margin-bottom: 0">防抖</h4>

    <div class="grid grid-c-3">
      <div>
        <div class="tipBox">
          基础防抖（指令）
          <div style="font-size: 13px">v-debounce="[msg]"</div>
        </div>
        <el-button v-debounce="[msg]" type="primary">点击触发</el-button>
      </div>

      <div>
        <div class="tipBox">
          立即执行（指令）
          <div style="font-size: 13px">v-debounce="[msg, 1000, [], true]"</div>
        </div>
        <el-button v-debounce="[msg, 1000, [], true]" type="primary"
          >点击触发</el-button
        >
      </div>

      <div>
        <div class="tipBox">
          带参（指令）
          <div style="font-size: 13px">
            v-debounce="[msg, 300, ['风和自由']]"
          </div>
        </div>
        <el-button v-debounce="[msg, 300, ['风和自由']]" type="primary"
          >点击触发</el-button
        >
      </div>
    </div>

    <div class="grid grid-c-3">
      <div>
        <div class="tipBox">
          基础防抖（函数）
          <div style="font-size: 13px">@click="$debounce(msg)"</div>
        </div>
        <el-button type="primary" @click="$debounce(msg)">点击触发</el-button>
      </div>

      <div>
        <div class="tipBox">
          立即执行（函数）
          <div style="font-size: 13px">
            @click="$debounce(msg, 1000), [], true)"
          </div>
        </div>
        <el-button type="primary" @click="$debounce(msg, 1000, [], true)"
          >点击触发</el-button
        >
      </div>

      <div>
        <div class="tipBox">
          带参（函数）
          <div style="font-size: 13px">
            @click="$debounce(msg, 300), ['风和自由'])"
          </div>
        </div>
        <el-button type="primary" @click="$debounce(msg, 300, ['风和自由'])"
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
