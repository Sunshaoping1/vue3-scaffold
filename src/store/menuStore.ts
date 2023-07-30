/* import { defineStore } from "pinia";
import { useRouter } from "vue-router";

export const useMenuStore = defineStore("router",{
    state:()=>({
        menus: getRoutes()
    })
    
}) 

//提取菜单路由
function getRoutes(){
    const router = useRouter()
    const routes = router.getRoutes()
    .filter(route=>route.children.length && route.meta?.show)
    .map(item=>{
        item.children = item.children.filter(Iroute=>Iroute.meta?.show)
        return item
    })
    .filter(cmem=>cmem.children.length)
    return routes
} */


import { IMenu } from '#/menu';
import { defineStore } from "pinia";
import router from '@/router';
import { RouteLocationNormalized, RouteRecordName } from 'vue-router';
import { deadline } from '@/utils';
import { CacheEnum } from '@/enum/cacheEnum';

export const useMenuStore = defineStore("menu",{
    state:()=>({
        menus:[] as IMenu[],
        historyMenus: getHistoryMenus() as IMenu[],
    }),
    actions:{
        init(){
            this.getMenuRoutes()
        },
        // 添加历史导航
        addHistoryMenus(route:RouteLocationNormalized){
            // console.log("route to",route)
            if(route.meta.menu){
                const menu:IMenu = {...route.meta.menu,routeName:route.name as string}

                if(this.historyMenus.every(item=>item.routeName !== menu?.routeName)) this.historyMenus.push(menu)
            }
            if(this.historyMenus.length > 3){
                this.historyMenus.shift()
            }
            deadline.set(CacheEnum.HISTORY_MENU,this.historyMenus)
        },
        //删除历史导航
        delHistoryMenus(menu:IMenu,name:RouteRecordName | null | undefined){
            const index = this.historyMenus.findIndex(item=>item == menu)
            // console.log("name",name)
            if(index != -1 && name != menu.routeName) this.historyMenus.splice(index,1)
            if(index != -1 && name == menu.routeName && confirm(`确定要删除${menu.title}吗?`)) {
                this.historyMenus.splice(index,1)
            }
        },
        //根据路由提取菜单
        getMenuRoutes(){
            const menus = router.getRoutes()
            .filter(route=>route.children.length && route.meta?.menu)
            .map(item=>{
                let menu:IMenu = {...item.meta.menu};
                menu.children = item.children.filter(Iroute=>Iroute.meta?.menu).map(Croute=>{
                    // Croute.meta?.menu?.routeName = Croute.name

                    //使用拷贝，防止引用赋值
                    return {...Croute.meta?.menu,routeName:Croute.name}
                }) as IMenu[]
                return menu
            })
            .filter(cmem=>cmem.children?.length)
            this.menus = menus
        }
    }
    
}) 

function getHistoryMenus(){
    return deadline.get(CacheEnum.HISTORY_MENU) ?? []
}
