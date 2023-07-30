<template>
  <!-- 面包屑组件 -->
  <el-breadcrumb separator="/">
    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
    <template v-if="routes?.matched">
      <el-breadcrumb-item
        :to="{ name: route.name }"
        v-for="(route, index) in routes.matched"
        :key="index"
      >
        {{ route.meta.menu?.title }}
      </el-breadcrumb-item>
    </template>
  </el-breadcrumb>
</template>

<script setup lang="ts">
import menuSable from "@/composables/menus";
const routes = menuSable.route.value;
// console.log(routes?.matched);
</script>

<style scoped></style>
