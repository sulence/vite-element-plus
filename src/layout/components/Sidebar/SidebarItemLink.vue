<template>
  <a v-if="isExternal(to)" :href="to" target="_blank" rel="noopener">
    <slot />
  </a>
  <router-link v-else :to="to"> <slot /> </router-link>
  <!-- <div v-else @click="push">
    <slot />
  </div> -->
</template>

<script lang="ts" setup>
import { isExternal } from "@/utils/validate";
import { useRouter } from "vue-router";

const props = defineProps({
  to: {
    type: String,
    required: true,
  },
});

const router = useRouter();
const push = () => {
  console.log(props.to);
  router.push(props.to).catch((err) => {
    console.log(err);
  });
};
</script>
