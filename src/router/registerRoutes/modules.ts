import { RouteRecordRaw } from 'vue-router';

export function moduleRoutes(){
    const routes = [] as RouteRecordRaw[]
    const modules = import.meta.glob("../modules/**/*.ts",{eager:true,import:'default'})
    Object.entries(modules).forEach(([,module]:[string,any])=>{
        // console.log("modelus",module)
        routes.push(module)
        
    })
    return routes;
}