<template>
  <div class="bg-white py-3 px-5 flex justify-between items-center">
    <div class="flex items-center">
      <div class="mr-2" @click="menuSable.toggleState">
        <i
          class="fas fa-caret-square-right text-gray-700 cursor-pointer"
          v-if="menuSable.close.value"
        ></i>
        <i class="fas fa-caret-square-left text-gray-700 cursor-pointer" v-else></i>
      </div>
      <Breadcrumb class="hidden md:block" />
    </div>
    <div class="flex items-center justify-center relative cursor-pointer">
      <!-- 要复用的组件尽量将控制根标签的样式（非公共样式）写在组件标签上 -->
      <!-- 消息通知 -->
      <Notification class="mr-5" />
      <!-- 全屏按钮 -->
      <i class="fas fa-expand text-xl mr-5 hidden md:block" @click="fullScreen"></i>
      <div class="group flex items-center justify-center">
        <img :src="user.info?.avatar" class="w-10 h-10 object-cover rounded-full" />
        <span class="ml-1 text-sm text-gray-700">{{ user.info?.name }}</span>
        <!-- 弹出菜单 -->
        <section
          class="hidden group-hover:block absolute z-10 top-full bg-white shadow-sm px-3 whitespace-nowrap border rounded-md"
        >
          <div class="flex items-center text-gray-600 cursor-pointer py-2">
            <i class="fas fa-house-user"></i>
            <span class="text-xs ml-2">网站首页</span>
          </div>
          <div class="flex items-center text-gray-600 cursor-pointer py-2">
            <i class="fa-solid fa-user"></i>
            <span class="text-xs ml-2">用户管理</span>
          </div>
          <div class="flex items-center text-gray-600 cursor-pointer py-2">
            <!-- <i class="fas fa-house-user"></i> -->
            <i class="fa-sharp fa-solid fa-user-secret"></i>
            <span class="text-xs ml-2">会员中心</span>
          </div>
          <div
            class="flex items-center text-gray-600 cursor-pointer py-2"
            @click="logout()"
          >
            <i class="fa-sharp fa-solid fa-arrow-right-from-bracket"></i>
            <span class="text-xs ml-2">退出登录</span>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { userStore } from "@/store/user";
import { logout } from "@/utils";
import menuSable from "@/composables/menus";
import Notification from "@/components/notification.vue";
import Breadcrumb from "@/components/breadcrumb.vue";

const user = userStore();

const fullScreen = () => {
  //返回当前正在全屏显示的Element节点，若没有则为null
  if (document.fullscreenElement) {
    //当前文档对象
    console.log("document", document);

    document.exitFullscreen();
  } else {
    //当前文档对象的根元素（HTML）

    document.documentElement.requestFullscreen();
  }
};
</script>

<style scoped></style>
