<template>
  <div
    class="login h-screen bg-slate-500 flex justify-center items-start md:items-center p-5"
  >
    <div
      class="bg-white w-[720px] translate-y-32 md:translate-y-0 md:grid grid-cols-2 rounded-md shadow-md overflow-hidden"
    >
      <form @submit="onSubmit" class="p-6">
        <h2 class="text-center text-gray-700 text-lg mt-3">会员登录</h2>
        <div class="mt-8">
          <hd-input
            placeholder-text="请输入邮箱"
            type="email"
            name="email"
            rules="required|email"
          />
          <hd-input
            placeholder-text="请输入密码"
            type="password"
            name="pass"
            rules="required|min:8"
            class="mt-5"
          />
        </div>
        <hd-button>
          <template #default>登录</template>
        </hd-button>
        <div class="flex gap-3 justify-center mt-5">
          <a-link>网站首页</a-link>
          <a-link>会员注册</a-link>
          <a-link>找回密码</a-link>
        </div>
      </form>
      <div class="hidden md:block">
        <img
          src="/public/imges/photo-1676647777398-b90a05ef266e.avif"
          alt=""
          class="h-96 w-full object-cover"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useForm } from "vee-validate";

const { handleSubmit } = useForm();

const onSubmit = handleSubmit(
  (values) => {
    console.log(values);
    alert("验证通过");
  },
  (opsition) => {
    console.log(opsition);
  }
);
</script>

<style lang="scss">
// div.login{

// }
</style>
