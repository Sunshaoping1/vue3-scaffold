import Axios from "./axios";

const $http = new Axios({
    baseURL: 'http://localhost:5173/api',
    timeout: 2000,
    headers: {'X-Custom-Header': 'foobar'}
})

export default $http;