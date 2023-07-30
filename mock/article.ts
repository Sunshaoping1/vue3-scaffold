import mockjs from 'mockjs'

import { MockMethod} from 'vite-plugin-mock'

const Random = mockjs.Random
export default [
  {
    url: '/api/article',
    method: 'get',
    response: () => {
      return {
        code: 200,
        message:"获取文章数据成功",
        type:"sucsess",
        data: new Array(20).fill(undefined).map((_article,index)=>{
          return{
            id:index,
            title:Random.ctitle(10,20),
            content:Random.cparagraph(10,20)
          }
        }),
      }
    },
  }
] as MockMethod[]

