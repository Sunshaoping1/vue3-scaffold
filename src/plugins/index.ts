import {App} from "vue"
import { setupTaiwindcss } from "./tailwindcss"
import { setupGlobalRules } from "./vee-validate"
import _ from "lodash"


export function setupPlugins(app:App){
    setupTaiwindcss()
    setupGlobalRules()
}


//全局组件自动注册
export function autoGlobalComponent(app:App){
    // app
    //   .component()
    //   .component()
    const modules = import.meta.glob("../components/from/*.vue",{eager: true})
    
    console.table(modules);
    // const arr:[string,object][] = <[string,object][]>Object.entries(modules)
    // console.log(arr)
    Object.entries(modules).forEach(([key,value])=>{
        let name = key.split("/").pop()?.split(".")[0] as string;

        //将字符串转化为驼峰写法
        name = _.camelCase(name)
        

        // console.log(typeof value)
        
        app.component(name,value?.default)
    })
}