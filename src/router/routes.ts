import { RouteRecordRaw } from 'vue-router';
// import { onBeforeEnter } from '@/utils/onBeforeEnter';

const routes:RouteRecordRaw[] = [
    {
        path:'/',
        name:'home',
        component:()=>import('@/views/Home.vue'),
    },
    // {
    //     name:'auth',
    //     path:'/auth',
    //     component:()=>import("@/layouts/auth.vue"),
    //     children:[
    //         {
    //             name:"login",
    //             path:'login',
    //             meta: { guest: true },
    //             component:()=>import("@/views/auth/login.vue")
    //         },
    //         {
    //             name:"auth.register",
    //             path:'register',
    //             component:()=>import("@/views/auth/register.vue")
    //         },
    //     ]
    
    // },
    {
        name:"article",
        path:'/article',
        component:()=>import("@/views/article.vue")
    },
    {
        name:"login",
        path:'/login',
        meta: { guest: true },
        component:()=>import("@/views/auth/login.vue")
    },
    {
        name:"register",
        path:'/register',
        component:()=>import("@/views/auth/register.vue")
    },
    {
        path:"/:any(.*)",
        name:'notfound',
        component:()=>import('@/views/error/404.vue'),
        
    }
    
]

export default routes;