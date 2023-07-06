import { createApp } from 'vue'
import './global.scss'
import App from '@/App.vue'
// import router from "./router/index.ts"
import router,{setupRouter} from "@/router/index.ts"
import { autoGlobalComponent, setupPlugins } from '@/plugins/index'




async function bootstrap(){
    

    const app = createApp(App)
    //app.use(router)
    setupRouter(app)
    setupPlugins(app)
    autoGlobalComponent(app)
    
    //当路由处理好之后再挂载vue应用实例
    await router.isReady()
    app.mount('#app')
}
bootstrap()