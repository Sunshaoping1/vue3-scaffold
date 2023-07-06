import {RouteRecordRaw} from "vue-router"
import env from "@/utils/utilEnv.d"


const layouts = import.meta.glob('../layouts/*.vue')
const views = import.meta.glob("../views/**/*.vue")
// console.log("views",views)


//获取路由器
function getRouter(){
    //定义布局路由
    const layoutRoutes:RouteRecordRaw[] = []

    Object.entries(layouts).forEach(([file,module])=>{
        // console.log("module",module)
        const route = getRouteByModule(file,module)
        getChildRoutes(route)
        layoutRoutes.push(route)
    })
    return layoutRoutes;
}

//获取布局路由的子路由
function getChildRoutes(route:RouteRecordRaw){
    const name = route.name as string;
    Object.entries(views).forEach(([file,module])=>{
        if(file.includes(`${name}/`)){
            const childrenRoute = getRouteByModule(file,module)
            childrenRoute.path = childrenRoute.path.slice(1)
            route.children?.push(childrenRoute)
        }
        return;
    })
}

//获取路由
function getRouteByModule(file:string,module:() => Promise<unknown>){
    const name = file.split("/").pop()?.split(".").shift()
    const route = {
        path:`/${name}`,
        name,
        component:module,
        children:[]
    } as RouteRecordRaw

    

    return route
}

const layoutRoutes = env.VITE_ROUTER_AUTOLOAD ? getRouter() : [] as RouteRecordRaw[]

export default layoutRoutes;