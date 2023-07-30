import {RouteRecordRaw} from "vue-router"
// import {env} from "@/utils"

//使用Vite的 import.meta.glob 函数从文件系统导入多个模块
const layouts = import.meta.glob('../../layouts/*.vue',{eager:true,import:'default'})
const views = import.meta.glob("../../views/**/*.vue",{eager:true,import:'default'})
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
    Object.entries(views).forEach(([file,module]:[string,any])=>{
        if(file.includes(`${name}/`)){
            const childrenRoute = getRouteByModule(file,module)
            childrenRoute.path = childrenRoute.path.slice(1)
            childrenRoute.name = `${name}.${childrenRoute.name?.toString()}`

            if(module.route) Object.assign(childrenRoute,module.route)
            
            route.children?.push(childrenRoute)
        }
    
    })
}

//获取路由
function getRouteByModule(file:string,module:any){
    const name = file.split("/").pop()?.split(".").shift()
    const route = {
        path:`/${name}`,
        name,
        component:module,
        children:[]
    } as RouteRecordRaw

    //如果模块导出的内容有route，则将它与route合并
    if(module.route) Object.assign(route,module.route)

    return route
}

// const layoutRoutes = env.VITE_ROUTER_AUTOLOAD ? getRouter() : [] as RouteRecordRaw[]

// export default layoutRoutes;

export default getRouter;