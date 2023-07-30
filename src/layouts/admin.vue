<template>
  <!-- 当前页面布局仅针对桌面端 -->
  <!-- 视口：vh、vw -->
  <!-- 可以设置最小高度为100vh（min-h-screen）,来防止页面内容的溢出 -->
  <div class="admin h-screen w-screen grid md:grid-cols-[auto_1fr]">
    <!-- 当页面宽度小于md(768px)时，需要将menu组件设为position:absolute(脱离文档流)。只有这样做，后面的同级元素才能显示 -->
    <menu-component />

    <div class="content bg-gray-100 grid grid-rows-[auto_1fr]">
      <div class>
        <Navbar />
        <history-link class="hidden md:block" />
      </div>
      <div class="m-2 md:p-2 relative overflow-y-auto">
        <router-view #default="{ Component, route }">
          <!-- 使用v-bind时，要限定meta属性的类型 -->
          <Transition
            appear
            :enter-active-class="
              route.meta.enterClass ?? 'animate__animated animate__fadeInRight'
            "
            :leave-active-class="
              route.meta.leaveClass ?? 'animate__animated animate__bounceOutLeft'
            "
          >
            <Suspense>
              <component :is="Component" class="absolute w-full" />
              <template #fallback> 加载中... </template>
            </Suspense>
          </Transition>
          <!-- <Suspense>
            <component :is="Component" />
            <template #fallback> 加载中... </template>
          </Suspense> -->
        </router-view>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import MenuComponent from "./admin/menu.vue";
import Navbar from "./admin/navbar.vue";
import HistoryLink from "./admin/historyLink.vue";
// import { onBeforeRouteLeave, onBeforeRouteUpdate } from "vue-router";
import menuSable from "@/composables/menus";
import { useRoute } from "vue-router";
import { watch } from "vue";

const route = useRoute();

watch(
  route,
  () => {
    menuSable.addHistoryMenus(route);
  },
  { immediate: true }
);

// 过于麻烦
/* // 添加历史导航（路由组件初次渲染时调用）
menuSable.addHistoryMenus(route);

//路由组件复用时调用
onBeforeRouteUpdate((to) => {
  //添加历史导航
  menuSable.addHistoryMenus(to);
  // menuSable.addHistoryMenus(to);
});
//路由组件离开时调用
onBeforeRouteLeave((to) => {
  //添加历史导航
  menuSable.addHistoryMenus(to);
  // menuSable.addHistoryMenus(to);
}); */
</script>

<script lang="ts">
export default {
  route: {
    meta: { menu: { title: "dashboard", icon: "fas fa-home text-xl" }, auth: true },
    redirect: "/admin/home",
  },
};
</script>

<style lang="scss" scoped>
.animate__fadeInRight {
  animation-duration: 0.1s;
}
.animate__bounceOutLeft {
  animation-duration: 0.2s;
}
</style>
