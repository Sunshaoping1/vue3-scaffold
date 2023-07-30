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
            name="password"
            rules="required|min:8"
            class="mt-5"
          />
        </div>
        <div class="flex justify-center items-center">
          <hd-button>
            <template #default>登录</template>
          </hd-button>
        </div>
        <div class="text-center mt-3">
          <i
            class="fa-brands fa-weixin bg-green-500 text-white rounded-full p-1 cursor-pointer"
          ></i>
        </div>
        <div class="flex gap-3 justify-center mt-5">
          <a-link>网站首页</a-link>
          <a-link>会员注册</a-link>
          <a-link>找回密码</a-link>
        </div>
      </form>
      <div class="hidden md:block relative">
        <img
          src="/imges/photo-1676647777398-b90a05ef266e.avif"
          alt=""
          class="absolute h-full w-full object-cover"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useForm } from "vee-validate";
import { login } from "@/utils";
import { ILoginData } from "@/api/userApi";

const { handleSubmit } = useForm();

const onSubmit = handleSubmit(
  async (values) => {
    console.log("login", values);
    await login(values as ILoginData);
  },
  (opsition) => {
    console.log(opsition);
  }
);
</script>
<script lang="ts">
export default {
  route: { name: "login", meta: { guest: true } },
  // beforeRouteEnter(to, from, next) {
  //   // console.log(to);
  //   console.log("route.meta.guest", to.meta.guest);
  //   if (to.meta.guest) next();
  // },
};
</script>

<style lang="scss">
// div.login{

// }
</style>
