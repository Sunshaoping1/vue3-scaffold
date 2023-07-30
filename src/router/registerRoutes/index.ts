import {RouteRecordRaw, Router} from "vue-router"
import {env} from "@/utils"
import getRouter from "./autoload"
import { moduleRoutes } from "./modules"
import { userStore } from "@/store/user"

//路由数组
let layoutRoutes = [] as RouteRecordRaw[]

//通过 布尔类型env.VITE_ROUTER_AUTOLOAD 来决定自动还是手动导入路由
if(env.VITE_ROUTER_AUTOLOAD){
    layoutRoutes = getRouter()
}else{
    layoutRoutes = moduleRoutes()
}


// export default layoutRoutes;

// 筛选掉设置了权限，但用户没有该权限的路由组件
export function modifyRoutes(router:Router){
    layoutRoutes.map(route=>{
        
        route.children = route.children?.filter(croute=>{
            // if(!croute.meta?.permission?.length) return true

            //如果croute.meta?.permission?.length为0，则会直接返回true
            const result = croute.meta?.permission?.every(permi=>{
                return userStore().info?.permissions?.some(item=>item == permi)
            })
            // console.log(croute.name,result)
            return !croute.meta?.permission  || result
        })
        return route
        
    }).filter(route=>{
        return route.children?.length
    }).forEach(route=>{
        router.addRoute(route)
    })
}