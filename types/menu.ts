interface Menu {
    title?:string
    icon?:string
    isActive?:boolean
    //路由名字可选是因为顶级菜单不需要
    routeName?:string
}

export interface IMenu extends Menu {
    children?:Menu[]
}