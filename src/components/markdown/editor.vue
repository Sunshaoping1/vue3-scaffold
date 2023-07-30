<template>
  <!-- toastuiEditor编辑器 -->
  <div id="editor"></div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import toastEditor from "./toastEditor";

interface Iprops {
  modelValue?: string;
  height?: number;
  placeholder?: string;
}
const props = withDefaults(defineProps<Iprops>(), {
  modelValue: "",
  heigth: 500,
  placeholder: "hello",
});
const emits = defineEmits(["update:modelValue"]);

let toastui: toastEditor;
onMounted(() => {
  toastui = new toastEditor("#editor", `${props.height}px`, props.modelValue as string);
  toastui.on("change", (type: string) => {
    // console.log("onEvent", type);
    const content = type == "markdown" ? toastui.getMarkdown() : toastui.getHTML();
    emits("update:modelValue", content);
  });
});
// setTimeout(() => {
//   toastui = new toastEditor("#editor", `${props.height}px`, props.modelValue as string);
//   toastui.on("change", (type: string) => {
//     // console.log("onEvent", type);
//     const content = type == "markdown" ? toastui.getMarkdown() : toastui.getHTML();
//     emits("update:modelValue", content);
//   });
// });
</script>

<style lang="scss" scoped>
#editor {
  @apply bg-white;
  .toastui-editor-mode-switch {
    // visibility: hidden !important;
    display: none !important;
  }

  &.fullscreen {
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: 99;
    background-color: #fff;
  }
}
</style>
