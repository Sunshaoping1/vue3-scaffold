import { CacheEnum } from "@/enum/cacheEnum";
import router from "@/router";
import { deadline } from "@/utils";
import axios, { AxiosRequestConfig } from "axios";

export default class Axios{
    private instance;
    constructor(config:AxiosRequestConfig){
        this.instance = axios.create(config)

        this.interceptors()
    }
    private interceptors(){
        this.interceptorsRequest()
        
        this.interceptorsResponse()
        
    }
    private interceptorsRequest(){
        //请求拦截器
        this.instance.interceptors.request.use(config=>{
            // 确保请求时带上令牌Authorization
            const token = deadline.get(CacheEnum.TOKEN_NAME)
            if(token){
                config.headers.Authorization = 'Bearer ' + token
            }
            return config
        },error=>{
            return Promise.reject(error)
        })
    }
    private interceptorsResponse(){
        // 响应拦截器
        this.instance.interceptors.response.use(response=>{
            return response;
        },error=>{
            switch(error.response.status){
                //未授权，请求要求身份验证
                case 401:
                    deadline.remove(CacheEnum.TOKEN_NAME)
                    router.push({name:"login"})
                    break;
            }
            return Promise.reject(error)
        })
    }
    public request<T,D=ResponseResult<T>>(config:AxiosRequestConfig):Promise<D>{
        // return await this.instance.request<D>(config).then(res=>{
        //     return new Promise(resolve=>{
        //         resolve(res.data)
        //     })
        // });
        return new Promise(async (resolve,reject)=>{
            try{
                const result = await this.instance.request<D>(config)
                resolve(result.data)
            }catch(err){
                reject(err)
            }
        })
    }
    public get<T,D=ResponseResult<T>>(url:string,config?:AxiosRequestConfig):Promise<D>{
        // return await this.instance.get<D>(url,config).then(res=>{
        //     return new Promise(resolve=>{
        //         resolve(res.data)
        //     })
        // });
        return new Promise(async (resolve,reject)=>{
            try{
                const result = await this.instance.get<D>(url,config)
                resolve(result.data)
            }catch(err){
                reject(err)
            }
        })
        
    }
    public delete<T,D=ResponseResult<T>>(url:string,config?:AxiosRequestConfig):Promise<D>{
        
        return new Promise(async (resolve,reject)=>{
            try{
                const result = await this.instance.delete<D>(url,config);
                resolve(result.data)
            }catch(err){
                reject(err)
            }
        })
    }
    public post<T,D=ResponseResult<T>>(url:string,data?:any,config?:AxiosRequestConfig):Promise<D>{
        
        return new Promise(async (resolve,reject)=>{
            try{
                const result = await this.instance.post<D>(url,data,config);
                resolve(result.data)
            }catch(err){
                reject(err)
            }
        })
    }
}

