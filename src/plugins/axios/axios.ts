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
            return Promise.reject(error)
        })
    }
    public async request<T,D=ResponseResult<T>>(config:AxiosRequestConfig):Promise<D>{
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
    public async get<T,D=ResponseResult<T>>(url:string,config?:AxiosRequestConfig):Promise<D>{
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
    public async delete<T,D=ResponseResult<T>>(url:string,config?:AxiosRequestConfig):Promise<D>{
        
        return new Promise(async (resolve,reject)=>{
            try{
                const result = await this.instance.delete<D>(url,config);
                resolve(result.data)
            }catch(err){
                reject(err)
            }
        })
    }
    public async post<T,D=ResponseResult<T>>(url:string,data?:any,config?:AxiosRequestConfig):Promise<D>{
        
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

