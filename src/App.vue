<script setup lang="ts">
// import userApi from "@/api/userApi";

// (async function () {
//   const result = await userApi.info();
//   console.log(result, "info");
// })();
</script>

<template>
  <div>
    <router-view #default="{ Component }">
      <Suspense>
        <template #default>
          <div>
            <component :is="Component" />
          </div>
        </template>
        <template #fallback> loading... </template>
      </Suspense>
    </router-view>
  </div>
</template>

<style scoped></style>
