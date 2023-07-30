<template>
  <div class="history" v-show="menuSable.historyMenus.value?.length">
    <div class="m-3 grid grid-flow-col gap-2 justify-start">
      <div
        v-for="menu of menuSable.historyMenus.value"
        class="border rounded-md text-sm py-2 px-3 text-gray-600 duration-300"
        :class="{ 'bg-red-200 text-white': $route.name == menu.routeName }"
      >
        <router-link :to="{ name: menu.routeName }">{{ menu.title }}</router-link>
        <i
          class="fa-solid fa-xmark ml-1 cursor-pointer"
          @click="menuSable.delHistoryMenus(menu, $route.name)"
        ></i>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// import { useMenuStore } from "@/store/menuStore";
// import { ref } from "vue";
import menuSable from "@/composables/menus";

await menuSable.initHistoryMenus();

// const menuStore = useMenuStore();

// const links = ref<{ title: string }[]>([
//   { title: "编辑器" },
//   { title: "订单列表" },
//   { title: "销售总额" },
//   { title: "用户管理" },
//   { title: "编辑器" },
//   { title: "订单列表" },
//   { title: "销售总额" },
//   { title: "用户管理" },
// ]);
</script>

<style scoped lang="scss">
.history {
  @apply border bg-gray-50;
}
</style>
