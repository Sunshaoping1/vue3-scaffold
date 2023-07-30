import Axios from "./axios";

const $http = new Axios({
    baseURL: 'http://localhost:5173/api',
    timeout: 2000,
    headers: {
        // 不能将令牌写在这里的原因是：仅在创建实例时执行一次
        // Authorization = 'Bearer ' + deadline.get(CacheEnum.TOKEN_NAME)
    }
})

export default $http;