<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script setup lang="ts"></script>
<script lang="ts">
export default {
  route: {
    meta: {
      menu: {
        title: "错误页面",
        icon: "fa-brands fa-battle-net",
      },
      auth: true,
    },
    component: () => import("@/layouts/admin.vue"),
  },
};
</script>

<style scoped></style>
