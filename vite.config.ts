import { ConfigEnv, loadEnv,UserConfigExport } from 'vite'

import path from "path"
import {parseEnv} from "./vite/utilEnv"
import { setupPlugins } from './vite/plugins'


// https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [vue()],
//   resolve:{
//     alias:{'@':path.resolve(__dirname,"src")}
//   }
// })


export default ({command,mode}:ConfigEnv):UserConfigExport=>{
  // 在开发环境下 command 的值为 serve（在 CLI 中， vite dev 和 vite serve 是 vite 的别名），而在生产环境下为 build（vite build）。
  console.log(command,mode)
  const isBuild = command == "build"
  const root = process.cwd()
  
  //获取.env文件中的环境变量
  const env = parseEnv(loadEnv(mode,root))
  
  
  
  console.log(env)
  return {
    plugins:setupPlugins(isBuild,env),
    resolve:{
      alias:{
        '@':path.resolve(__dirname,"src"),
        '#':path.resolve(__dirname,"types")
      }
    },
    build: {
      rollupOptions: {
        output: {
          // 使用分块打包可以将内容打包到不同的文件中，减少单个文件大小，提高加载速度
          // 每个被解析的模块都会经过该函数处理
          // 每个模块都会被添加到以返回的字符串命名的chunk中
          manualChunks(id) {
            if (id.includes('node_modules')) {
              return id.toString().split('node_modules/')[1].split('/')[0].toString()
            }
          },
        },
      },
    },
    server: {
      proxy: {
        // 带选项写法：http://localhost:5173/api/bar -> http://jsonplaceholder.typicode.com/bar
        '/api': {
          target: env.VITE_API_URL,
          //跨域请求携带cookie
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
        }
      },
    },
  }
}
