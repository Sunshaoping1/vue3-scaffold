<template>
  <!-- 将样式grid-flow-col改为grid-cols-5，可以让栅格元素对齐 -->
  <div>
    <div class="grid md:grid-cols-5 gap-5 p-5 bg-white">
      <el-card
        shadow="hover"
        v-for="(card, index) of cards"
        :key="index"
        class="cursor-pointer"
      >
        <template #header>
          <div class="flex justify-between items-center">
            <span class="text-gray-600 text-base">{{ card.title }}</span>
            <el-tag type="danger" effect="dark" size="small" round>月</el-tag>
          </div>
        </template>

        <section class="flex justify-between items-center">
          <span class="text-2xl text-red-500">${{ card.price }}</span>
          <i :class="[card.icon, card.iconColor]" class="text-3xl"></i>
        </section>
        <section class="text-xs mt-5 flex justify-between">
          {{ card.totalTitle }}
          <span class>{{ card.total }}人</span>
        </section>
      </el-card>
    </div>

    <div class="mt-3 p-5 bg-white grid md:grid-cols-2 gap-3">
      <el-card shadow="always">
        <template #header>
          <div>用户面板</div>
        </template>
        <!-- 在手机端将图表宽度设为100%，当有多个图表时，使每个图表独自占一行 -->
        <!-- <div id="main" class="w-full md:w-[400px] h-[300px]"></div> -->
        <div id="main" class="w-full h-72"></div>
      </el-card>

      <el-card shadow="always">
        <template #header>
          <div>销售统计</div>
        </template>
        <!-- 在手机端将图表宽度设为100%，当有多个图表时，使每个图表独自占一行 -->
        <!-- <div id="main" class="w-full md:w-[400px] h-[300px]"></div> -->
        <div id="solid" class="w-full h-72"></div>
      </el-card>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  route: {
    meta: { menu: { title: "工作台" } },
  },
};
</script>
<script setup lang="ts">
import { nextTick, onMounted, ref } from "vue";
import echarts from "@/plugins/echarts/index";
import { echart1 } from "@/plugins/echarts/echart";

//也可以使用 nextTick
onMounted(async () => {
  await nextTick();
  var chartDom = document.getElementById("main") as HTMLElement;
  var myChart = echarts.init(chartDom);
  echart1 && myChart.setOption(echart1);

  var chartDom1 = document.getElementById("solid") as HTMLElement;
  var myChart1 = echarts.init(chartDom1);
  echart1 && myChart1.setOption(echart1);
});

interface ICard {
  title: string;
  price: number;
  icon: string;
  iconColor: string;
  totalTitle: string;
  total: number;
}
const cards = ref<ICard[]>([
  {
    title: "黄金",
    price: 4569,
    icon: "fa-solid fa-coins",
    iconColor: "text-yellow-300",
    totalTitle: "总人数",
    total: 459802,
  },
  {
    title: "石油",
    price: 3669,
    icon: "fa-brands fa-slack",
    iconColor: "text-black",
    totalTitle: "总人数",
    total: 4676718,
  },
  {
    title: "煤炭",
    price: 2092,
    icon: "fa-solid fa-rocket",
    iconColor: "text-black",
    totalTitle: "总人数",
    total: 3356678,
  },
  {
    title: "天然气",
    price: 1249,
    icon: "fa-brands fa-docker",
    iconColor: " text-gray-400",
    totalTitle: "总人数",
    total: 325676878,
  },
  {
    title: "纯净水",
    price: 569,
    icon: "fa-solid fa-mug-hot",
    iconColor: " text-blue-400",
    totalTitle: "总人数",
    total: 97898999979,
  },
]);
</script>

<style scoped></style>
