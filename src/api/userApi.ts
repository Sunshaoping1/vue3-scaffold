import $http from "@/plugins/axios/index";


export interface UserInfo {
    age: number
    name: string
    avatar:string
    permissions?:string[]
}

interface LoginInfo{
    token:string
}
export interface ILoginData{
    email:string
    password:string
}
class UserApi{
    public info(){
        return $http.get<UserInfo>("/user/info")
    }
    public login(values: ILoginData){
        return $http.post<LoginInfo>("/login",values)
    }
    
}

const userApi = new UserApi()

export default userApi