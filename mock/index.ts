import mockjs from 'mockjs'

import { MockMethod, MockConfig } from 'vite-plugin-mock'

const Random = mockjs.Random
export default [
  {
    url: '/api/info',
    method: 'get',
    response: ({ query }) => {
      return {
        code: 200,
        message:"请求成功",
        type:"sucsess",
        data: {
            age: 21,
            name: 'vbase',
            email:"@qq.com"
        },
      }
    },
  },
  {
    url: '/api/login',
    method: 'get',
    response: ({ query }) => {
      return {
        code: 200,
        message:"登录成功",
        type:"sucsess",
        data: {
            token:Random.string(10)
        },
      }
    },
  },
  {
    url: '/api/post',
    method: 'post',
    timeout: 2000,
    response: {
      code: 0,
      data: {
        name: 'vben',
      },
    },
  },
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