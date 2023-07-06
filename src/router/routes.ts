import { RouteRecordRaw } from 'vue-router';

const routes:RouteRecordRaw[] = [
    {path:'/',name:'home',component:()=>import('@/views/Home.vue')},
    {path:"/:any(.*)",name:'notfound',component:()=>import('@/views/NotFound.vue')}
    
]

export default routes;