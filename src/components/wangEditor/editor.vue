<template>
  <div style="border: 1px solid #ccc">
    <Toolbar
      style="border-bottom: 1px solid #ccc"
      :editor="editorRef"
      :defaultConfig="toolbarConfig"
      :mode="mode"
    />
    <Editor
      style="height: 500px; overflow-y: hidden"
      v-model="valueHtml"
      :defaultConfig="editorConfig"
      :mode="mode"
      @onCreated="handleCreated"
      @onChange="handleChange"
    />
  </div>
</template>

<script setup lang="ts">
import "@wangeditor/editor/dist/css/style.css";
import { onBeforeUnmount, shallowRef, onMounted, ref } from "vue";
import { IDomEditor, IEditorConfig, IToolbarConfig } from "@wangeditor/editor";

import { Editor, Toolbar } from "@wangeditor/editor-for-vue";
import { ApiEnum } from "@/enum/ApiEnum";

interface Iprops {
  modelValue: string;
}
const props = withDefaults(defineProps<Iprops>(), {
  modelValue: "",
});
const emits = defineEmits(["update:modelValue"]);
// 编辑器实例，必须用 shallowRef
const editorRef = shallowRef();

// 内容 HTML
const valueHtml = ref(props.modelValue);

// 模拟 ajax 异步获取内容
onMounted(() => {
  setTimeout(() => {
    valueHtml.value = "模拟 Ajax 异步设置内容yy";
  }, 2000);
});

//工具栏配置
const toolbarConfig: Partial<IToolbarConfig> = {
  /* 工具栏配置 */
};

//编辑器配置
const editorConfig: Partial<IEditorConfig> = {
  // TS 语法
  placeholder: "请输入内容...",
  MENU_CONF: {
    uploadImage: {
      server: ApiEnum.UOLOAD_IMAGE_URL,
    },
  },
};

const mode = "default"; // 或 'simple'

// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
  const editor = editorRef.value;
  if (editor == null) return;
  //销毁编辑器和工具栏（自己定义的变量，如 const editor = createEditor({...}) ，这个 editor 还需要自己来销毁。）
  editor.destroy();
});

//编辑器创建完毕时调用
const handleCreated = (editor: IDomEditor) => {
  editorRef.value = editor; // 记录 editor 实例，重要！
};
//编辑器内容、选区变化时调用
const handleChange = () => {
  // const text = editor.getHtml();
  // emits("update:modelValue", text);

  emits("update:modelValue", valueHtml.value);
};
</script>

<style scoped lang="scss"></style>
