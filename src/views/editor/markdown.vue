<template>
  <div>
    markdown编辑器
    <Markdown v-model="content" :height="500" placeholder="请输入markdown内容" />
  </div>
</template>

<script setup lang="ts">
import Markdown from "@/components/markdown/editor.vue";
import { ref } from "vue";

const content = ref("hello");
</script>
<script lang="ts">
export default {
  route: {
    meta: { permission: ["markdown_editor"], menu: { title: "markdown编辑器" } },
  },
};
</script>

<style scoped></style>
