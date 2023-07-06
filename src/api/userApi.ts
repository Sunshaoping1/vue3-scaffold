import $http from "@/plugins/axios/index";


interface User {
    age: number
    name: string
    email:string
}

interface LoginInfo{
    token:string
}

class UserApi{
    public info(){
        return $http.get<User>("info")
    }
    public login(){
        return $http.get<LoginInfo>("login")
    }
    
}

const userApi = new UserApi()

export default userApi