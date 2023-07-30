import { RouteRecordRaw } from "vue-router";

export default {
    name:'admin',
    path:'/admin',
    meta:{menu:{title:'dashboard',icon:'fas fa-home text-xl'},auth: true},
    redirect:'/admin/home',
    component:()=>import("@/layouts/admin.vue"),
    children:[
        {
            name:"admin.home",
            path:'home',
            component:()=>import("@/views/admin/home.vue"),
            meta:{menu:{title:'工作台'}},
            
        },
    ]

} as RouteRecordRaw