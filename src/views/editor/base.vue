<template>
  <div>
    <div>base</div>
    {{ content }}
    <WangEditor v-model="content" />
  </div>
</template>

<script setup lang="ts">
import WangEditor from "@/components/wangEditor/editor.vue";
import { ref } from "vue";

const content = ref("hellojojosss");
</script>

<script lang="ts">
export default {
  route: {
    meta: { permission: [], menu: { title: "富文本编辑器" } },
  },
};
</script>

<style scoped lang="scss"></style>
