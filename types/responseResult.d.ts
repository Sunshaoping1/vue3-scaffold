// 设置发送请求后，获取到的数据的data属性的类型
interface ResponseResult<T>{
    code: number
    message:string
    type:"sucsess" | "fail"
    errno?:0|1,
    data:T
}