import userApi, { UserInfo } from "@/api/userApi";
import { defineStore } from "pinia";


export const userStore = defineStore("user",{
    state:()=>({
        info:{} as null | UserInfo
    }),
    
    actions:{
        async getUserInfo(){
            try{
                this.info = await userApi.info().then(res=>{
                    return res.data 
                });
                // const res = await userApi.info()
                // this.info = res.data 
            }catch(err){
                console.log(err)
            }
        }
    }
})

