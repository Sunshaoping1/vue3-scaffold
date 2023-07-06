import {App} from "vue"
import { createRouter,createWebHistory } from "vue-router";
import routes from "./routes.ts"
import layoutRoutes  from "./autoload.ts";



const router = createRouter({
    history:createWebHistory(),
    routes:[...routes,...layoutRoutes]
})

export function setupRouter(app:App){
    app.use(router)
}

export default router;