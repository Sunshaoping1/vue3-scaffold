import { IMenu } from "#/menu";
import { CacheEnum } from "@/enum/cacheEnum";
import router from "@/router";
import { deadline } from "@/utils";
import { ref } from "vue";
import { RouteLocationNormalized, RouteRecordName } from "vue-router";


class Menu{
    // 定义成响应式数据的目的是为了让数据发生变化时页面也随之更新
    public menus = ref<IMenu[]>();
    public historyMenus = ref<IMenu[]>();
    public close = ref<boolean>()
    public route = ref(null as null|RouteLocationNormalized) ;

    constructor(){
        this.historyMenus.value = deadline.get(CacheEnum.HISTORY_MENU) || []
        this.close.value = Boolean(deadline.get(CacheEnum.MENU_STATE)) || false
    }
   
    
    public async initMenus(){
        this.menus.value = await this.getMenuRoutes()
        
    }

    public async initHistoryMenus(){
        this.historyMenus.value = await this.getFilterHistoryMenus()
    }

    // 过滤掉因后台修改权限后本地存储中不存在的路由
    public async getFilterHistoryMenus(){
        //完成路由器的初始化
        await router.isReady()

       let routes:IMenu[]|undefined = new Array<IMenu>()
       routes = deadline.get(CacheEnum.HISTORY_MENU)?.filter((menu:IMenu)=>{
        return router.getRoutes().some(route=>{
                return menu.routeName == route.name
            })
            
        })
        // console.log("int",routes)
        
       return routes || []
   }
//    切换菜单状态
    public toggleState(){
        this.close.value = !this.close.value
        deadline.set(CacheEnum.MENU_STATE,this.close.value)
    }
    // 确保菜单的选中效果最多出现一次，并确保历史导航的选中状态与菜单的同步
    public setCurrentMenu(route:RouteLocationNormalized){
        this.menus.value?.forEach(pmenu=>{
            pmenu.isActive = false;
            pmenu.children?.forEach(cmenu=>{
                cmenu.isActive = false;
                if(cmenu.routeName == route.name){
                    pmenu.isActive = true;
                    cmenu.isActive = true;
                }
            })
        })
    }
    //根据路由提取菜单
    public async getMenuRoutes(){
        //完成路由器的初始化
        await router.isReady()

        return router.getRoutes()
        .filter(route=>route.children.length && route.meta?.menu)
        .map(Proute=>{
            let menu:IMenu = {...Proute.meta.menu};
            menu.children = Proute.children.filter(Iroute=>Iroute.meta?.menu).map(Croute=>{
                // Croute.meta?.menu?.routeName = Croute.name

                //使用拷贝，防止引用赋值
                return {...Croute.meta?.menu,routeName:Croute.name}
            }) as IMenu[]
            return menu
        })
        .filter(cmem=>cmem.children?.length)
    }
    // 添加历史导航
    addHistoryMenus(route:RouteLocationNormalized){
        // console.log("route to",route)
        if(!route.meta?.menu) return null
        this.route.value = route;
        const menu:IMenu = {...route.meta.menu,routeName:route.name as string}

        if(this.historyMenus.value?.every(item=>item.routeName !== menu?.routeName)) this.historyMenus.value?.push(menu)
        
        if(this.historyMenus.value?.length && this.historyMenus.value.length > 3){
            this.historyMenus.value?.shift()
        }
        deadline.set(CacheEnum.HISTORY_MENU,this.historyMenus.value)
    }
    //删除历史导航
    delHistoryMenus(menu:IMenu,name:RouteRecordName | null | undefined){
        const index = this.historyMenus.value?.findIndex(item=>item == menu)
        // console.log("name",name)
        if(typeof index == "number" && index != -1 && name != menu.routeName) this.historyMenus.value?.splice(index,1)
        
    }
}


export default new Menu()