<script setup lang="ts">
// import env from "./utils/utilEnv.d"
// console.log(env)
// // 没有TS的类型声明
// console.log(typeof import.meta.env.VITE_SOME_KEY)

import userApi from "@/api/userApi";

(async function () {
  const result = await userApi.info();
  console.log(result, "info");
})();
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
