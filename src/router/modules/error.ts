import { RouteRecordRaw } from "vue-router";

export default {
    name:'error',
    path:'/error',
    meta:{menu:{title:'错误页面',icon:'fa-brands fa-battle-net'},auth: true},
    component:()=>import("@/layouts/admin.vue"),
    children:[
        {
            name:"error.403",
            path:'403',
            meta:{menu:{title:'403页面'}},
            component:()=>import("@/views/error/403.vue")
        },
        {
            name:"error.404",
            path:'404',
            meta:{menu:{title:'404页面'}},
            component:()=>import("@/views/error/404.vue")
        },
        {
            name:"error.500",
            path:'500',
            meta:{menu:{title:'500页面'}},
            component:()=>import("@/views/error/500.vue")
        }
    ]

} as RouteRecordRaw