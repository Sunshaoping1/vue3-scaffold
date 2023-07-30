import $http from "@/plugins/axios/index";


interface imgInfo {
    url:string
}

// 获取Markdown编辑器上传的图片的url地址
export function uploadImg(data:FormData){
    return $http.post<imgInfo>("/upload/image",data)
}
// function login(values: ILoginData){
//     return $http.post<LoginInfo>("/login",values)
// }

