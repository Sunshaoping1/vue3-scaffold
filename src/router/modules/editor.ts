import { RouteRecordRaw } from "vue-router";

export default {
    name:'editor',
    path:'/editor',
    meta:{menu:{title:'编辑页面',icon:'fa-brands fa-squarespace'},auth: true},
    component:()=>import("@/layouts/admin.vue"),
    children:[
        {
            name:"editor.base",
            path:'base',
            meta:{permission:["abc"],menu:{title:'base编辑器'}},
            component:()=>import("@/views/editor/base.vue")
        },
        {
            name:"editor.markdown",
            path:'markdown',
            meta:{permission:["editor_markdown","abc"],menu:{title:'markdown编辑器'}},
            component:()=>import("@/views/editor/markdown.vue")
        },
    ]

} as RouteRecordRaw