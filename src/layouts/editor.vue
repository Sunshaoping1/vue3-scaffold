<template>
  <div>
    editor
    <RouterView />
  </div>
</template>

<script setup lang="ts"></script>
<script lang="ts">
export default {
  route: {
    meta: { menu: { title: "编辑页面", icon: "fa-brands fa-squarespace" }, auth: true },
    component: () => import("@/layouts/admin.vue"),
  },
};
</script>

<style scoped></style>
