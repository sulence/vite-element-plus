<template>
  <div
    class="handle-button"
    :style="{ top: buttonTop + 'px', backgroundColor: theme }"
    @click="show = true"
  >
    <i class="el-icon-setting" />
  </div>
  <el-drawer
    v-model="show"
    title="设置"
    size="300px"
    :direction="direction"
    destroy-on-close
  >
    <slot />
  </el-drawer>
</template>

<script lang="ts" setup>
import { computed, ref } from "vue";

defineProps({
  buttonTop: {
    type: Number,
    default: 250,
  },
});
const show = ref(false);
const direction = ref("rtl");
const theme = computed(() => {
  return "";
});
</script>

<style lang="scss" scoped>
.handle-button {
  width: 48px;
  height: 48px;
  position: absolute;
  right: 0px;
  text-align: center;
  font-size: 24px;
  border-radius: 6px 0 0 6px !important;
  z-index: 99;
  cursor: pointer;
  pointer-events: auto;
  color: #fff;
  line-height: 48px;
  i {
    font-size: 24px;
    line-height: 48px;
  }
}
</style>
