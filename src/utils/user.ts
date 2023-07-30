import userApi, { ILoginData } from "@/api/userApi";
import { CacheEnum } from "@/enum/cacheEnum";
import deadline from "./storage";
import { userStore } from "@/store/user";

//在组件外使用的路由
import router from "@/router";

//判断用户是否登录
export function isLogin():boolean{
  return Boolean(deadline.get(CacheEnum.TOKEN_NAME))
}

//用户登录
export async function login(values:ILoginData){
    const {
      data: { token },
    } = await userApi.login(values);

    deadline.set(CacheEnum.TOKEN_NAME, { token }, 3 * 24 * 60 * 60);
    // router.replace({ name: "home" });
    const routeName = deadline.get(CacheEnum.REDIRECT_ROUTE_NAME) ?? 'home'
    router.push({name:routeName})
}

//退出登录
export function logout(){
    console.log("logout remove")
    //清除token
    deadline.remove(CacheEnum.TOKEN_NAME)
    //清空用户资料
    userStore().info = null
    router.replace({ name: "home" });
}

