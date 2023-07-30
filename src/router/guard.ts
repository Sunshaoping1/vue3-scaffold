import { RouteLocationNormalized, Router } from "vue-router";
import {deadline} from "@/utils";
// import { userStore } from "@/store/user";
import { CacheEnum } from "@/enum/cacheEnum";
// import { useMenuStore } from "@/store/menuStore";


class Guard{
    constructor(private router:Router){
        this.onBeforeEach()
    }
    public onBeforeEach(){
        this.router.beforeEach(async(to,from)=>{
            // console.log(to,from)
          
            //对路由进行登录验证
            if(this.isLogin(to) == false && to.name !== "login") return {name:'login'}

            if(this.isGuest(to) == false){
                alert("已经登录过了")
                return from
            }
            
            // //添加历史导航
            // useMenuStore().addHistoryMenus(to);

            //只有获取到了用户资料，才会跳转路由
            // await this.userInfo()
        })
        
    }
    //获取用户资料
    // private userInfo(){
    //    if(this.token()){
    //     return userStore().getUserInfo()
    //    }
    // }
    //获取token
    private token():string|undefined{
        return deadline.get(CacheEnum.TOKEN_NAME)?.token
    }
    //登录用户访问
    private isLogin(route:RouteLocationNormalized):boolean{
        // console.log(tokenObj)
        //路由元信息的auth属性为true时才需要登录验证
        // console.log(route.name,route.meta?.auth)
        const state = Boolean(!route.meta?.auth || (route.meta?.auth && this.token()))
        // console.log("state",state)  

        //设置登录完成后，要跳转的路由
        if(state == false){
            // console.log("state name")
            deadline.set(CacheEnum.REDIRECT_ROUTE_NAME,route.name)
        }
        return state    
    }
    //游客访问
    private isGuest(route:RouteLocationNormalized):Boolean{
        return Boolean(!route.meta?.guest || (route.meta?.guest && !this.token()))
    }
}




export default (router:Router)=>{
    new Guard(router)
}