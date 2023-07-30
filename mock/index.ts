import mockjs from 'mockjs'

import { MockMethod} from 'vite-plugin-mock'

const Random = mockjs.Random
export default [
  {
    url: '/api/user/info',
    method: 'get',
    response: () => {
      return {
        code: 200,
        message:"请求成功",
        type:"sucsess",
        data: {
            age: 21,
            name: '只看结果',
            avatar:"/public/imges/photo-1535957998253-26ae1ef29506.avif",
            permissions:["base_editor","markdown_editor","article_edit"]
        },
      }
    },
  },
  {
    url: '/api/login',
    method: 'post',
    response: () => {
      return {
        code: 200,
        message:"登录成功",
        type:"sucsess",
        data: {
            token:Random.string(10)
        },
      }
    },
  }
] as MockMethod[]

// export default function (config: MockConfig) {
//   return [
//     {
//       url: '/api/text',
//       method: 'post',
//       rawResponse: async (req, res) => {
//         let reqbody = ''
//         await new Promise((resolve) => {
//           req.on('data', (chunk) => {
//             reqbody += chunk
//           })
//           req.on('end', () => resolve(undefined))
//         })
//         res.setHeader('Content-Type', 'text/plain')
//         res.statusCode = 200
//         res.end(`hello, ${reqbody}`)
//       },
//     },
//   ]
// }