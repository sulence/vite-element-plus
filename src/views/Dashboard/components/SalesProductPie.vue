<template>
  <el-card>
    <template #header>
      <div class="card-header">成交占比</div>
    </template>
    <div ref="chartRef" :style="{ width, height }"></div>
  </el-card>
</template>
<script lang="ts" setup>
import { Ref, ref, watch } from "vue";
import { useECharts } from "@/hooks/web/useECharts";

const props = defineProps({
  loading: Boolean,
  width: {
    type: String as PropType<string>,
    default: "100%",
  },
  height: {
    type: String as PropType<string>,
    default: "300px",
  },
});

const chartRef = ref<HTMLDivElement | null>(null);
const { setOptions } = useECharts(chartRef as Ref<HTMLDivElement>);

watch(
  () => props.loading,
  () => {
    if (props.loading) {
      return;
    }
    setOptions({
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "shadow",
        },
      },

      radar: {
        radius: "66%",
        center: ["50%", "42%"],
        splitNumber: 8,

        splitArea: {
          areaStyle: {
            color: "#C5CEE6",
            opacity: 1,
            shadowBlur: 45,
            shadowColor: "rgba(0,0,0,.1)",
            shadowOffsetX: 0,
            shadowOffsetY: 15,
          },
        },
        indicator: [
          { name: "Sales", max: 10000 },
          { name: "Administration", max: 20000 },
          { name: "Information Technology", max: 20000 },
          { name: "Customer Support", max: 20000 },
          { name: "Development", max: 20000 },
          { name: "Marketing", max: 20000 },
        ],
      },
      legend: {
        left: "center",
        bottom: "10",
        data: ["Allocated Budget", "Expected Spending", "Actual Spending"],
      },
      series: [
        {
          color: ["#435EBE", "#5DDAB4", "#57CAEB"],
          type: "radar",
          symbolSize: 0,
          areaStyle: {
            shadowBlur: 13,
            shadowColor: "rgba(0,0,0,.2)",
            shadowOffsetX: 0,
            shadowOffsetY: 10,
            opacity: 1,
          },
          data: [
            {
              value: [5000, 7000, 12000, 11000, 15000, 14000],
              name: "Allocated Budget",
            },
            {
              value: [4000, 9000, 15000, 15000, 13000, 11000],
              name: "Expected Spending",
            },
            {
              value: [5500, 11000, 12000, 15000, 12000, 12000],
              name: "Actual Spending",
            },
          ],
        },
      ],
    });
  },
  { immediate: true }
);
</script>
