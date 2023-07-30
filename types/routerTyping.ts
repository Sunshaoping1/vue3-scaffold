import 'vue-router'
import { IMenu } from './menu'

declare module 'vue-router' {
  interface RouteMeta {
    //访问路由是否需要登录验证
    auth?:boolean
    //访问路由时，用户是否为游客状态
    guest?:boolean
    //路由菜单信息
    menu?:IMenu
    //菜单的访问权限（在用户登录之后，获取用户资料时返回用户的权限）
    permission?:string[]

    // 菜单路由切换时过渡的类名
    enterClass?:string
    leaveClass?:string
  }
}
