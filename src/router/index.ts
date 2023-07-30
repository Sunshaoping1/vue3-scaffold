import { userStore } from '@/store/user';
import {App} from "vue"
import { createRouter,createWebHistory } from "vue-router";
import routes from "./routes.ts"
import {modifyRoutes}  from "./registerRoutes";
import globalRouteHook  from "./guard.ts";


const router = createRouter({
    history:createWebHistory(),
    routes:[...routes]
})

// globalRouteHook(router)

export async function setupRouter(app:App){
    await userStore().getUserInfo() 
    
    modifyRoutes(router)
    globalRouteHook(router)
    app.use(router)
}



export default router;