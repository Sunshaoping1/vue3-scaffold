import _ from "lodash"

class Env {
    public env = {} as ImportMetaEnv
    constructor(){
        this.env = this.getEnv()
    }

    private getEnv():ImportMetaEnv{
        const env:any = _.cloneDeep(import.meta.env)
        Object.entries(env).forEach(([key,value])=>{
            if(/^\d+$/.test(value)){
                env[key] = Number(value)
            }else if(value == "true" || value == "false"){
                env[key] = value == "true" ? true : false;
            }else if(value == "null"){
                env[key] = null
            }else if(value == "undefined"){
                env[key] = undefined
            }else{
                env[key] = value
            }

        })
        return env ;
    }
}

const utilEnv = new Env()
const env = utilEnv.env

export default env

