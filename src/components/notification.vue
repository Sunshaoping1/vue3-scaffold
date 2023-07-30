<template>
  <!-- 消息通知组件 -->
  <div class="notfication">
    <i class="fas fa-bell" @click.stop="show = !show"></i>
    <el-tabs v-model="activeName" class="lists" v-show="show" @click.stop>
      <el-tab-pane label="系统通知" name="site">
        <a href="#"
          >Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad minima ipsa
          consequatur a doloremque natus sed, aliquid sapiente mollitia illo iure labore
          quasi eligendi recusandae fugit et molestias sit!</a
        >
        <a href="#"
          >Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad minima ipsa
          consequatur a doloremque natus sed, aliquid sapiente mollitia illo iure labore
          quasi eligendi recusandae fugit et molestias sit!</a
        >
        <a href="#"
          >Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad minima ipsa
          consequatur a doloremque natus sed, aliquid sapiente mollitia illo iure labore
          quasi eligendi recusandae fugit et molestias sit!</a
        >
      </el-tab-pane>
      <el-tab-pane label="站内消息" name="message">
        <a href="#"
          >Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad minima ipsa
          consequatur a doloremque natus sed, aliquid sapiente mollitia illo iure labore
          quasi eligendi recusandae fugit et molestias sit!</a
        >
        <a href="#"
          >Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad minima ipsa
          consequatur a doloremque natus sed, aliquid sapiente mollitia illo iure labore
          quasi eligendi recusandae fugit et molestias sit!</a
        >
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup lang="ts">
import { nextTick } from "vue";
import { ref } from "vue";

const activeName = ref<string>("site");
const show = ref<boolean>(false);

nextTick(() => {
  // addEventListener方法的第三个参数默认为false（在冒泡阶段触发）
  document.documentElement.addEventListener("click", () => {
    show.value = false;
  });
});
</script>

<style lang="scss">
.notfication {
  @apply relative;
  .lists {
    @apply absolute right-0 z-20  bg-white px-3 py-2 border rounded-xl shadow-lg w-[300px];
    a {
      @apply block truncate border-b pb-2 my-3 hover:text-violet-300;
    }
  }
}
</style>
