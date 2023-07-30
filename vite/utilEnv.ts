import _ from "lodash"

// 转化".env"文件中的环境变量类型
export function parseEnv(env: Record<string, any>){
    const currentEnv = _.cloneDeep(env)

    Object.entries(currentEnv).forEach(([key,value])=>{
        if(/^\d+$/.test(value)){
            currentEnv[key] = Number(value)
        }else if(value == "true" || value == "false"){
            currentEnv[key] = value == "true" ? true : false;
        }else if(value == "null"){
            currentEnv[key] = null
        }else if(value == "undefined"){
            currentEnv[key] = undefined
        }else{
            currentEnv[key] = value
        }
    })
    return currentEnv as ViteEnv;
}



// 如果不转化，这只能这样使用：
// if(import.meta.env.VITE_ROUTE_AUTOLOAD == "true"){}

