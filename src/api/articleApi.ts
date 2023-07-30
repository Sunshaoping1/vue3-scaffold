import $http from "@/plugins/axios/index";


export interface ArticleInfo {
    id:number
    title:string
    content:string
}


export function articleInfo(){
    return $http.get<ArticleInfo[]>("/article")
}