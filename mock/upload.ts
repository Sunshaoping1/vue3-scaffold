
import { MockMethod} from 'vite-plugin-mock'

export default [
  {
    url: '/api/upload/image',
    method: 'post',
    response: ()=>{
      return {
        code: 200,
        message:"上传成功",
        type:"sucsess",
        errno:0,
        data: {
          url:"/public/imges/photo-1535957998253-26ae1ef29506.avif",
        },
      }
    },
  },
] as MockMethod[]

