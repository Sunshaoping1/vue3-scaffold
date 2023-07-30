<template>
  <div class="h-screen w-screen bg-gray-300 flex flex-col justify-center items-center">
    <img
      src="/public/imges/photo-1535957998253-26ae1ef29506.avif"
      class="w-56 h-56 object-cover rounded-full border-8 border-white mb-5"
    />
    <div>
      <router-link :to="{ name: 'admin.home' }" class="hd-button mr-5"
        >后台管理</router-link
      >
      <router-link :to="{ name: 'login' }" class="hd-button" v-if="!show"
        >用户登录</router-link
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import { isLogin } from "@/utils/user";
import { ref } from "vue";

const show = ref<boolean>(isLogin());
</script>
<script lang="ts"></script>

<style scoped></style>
