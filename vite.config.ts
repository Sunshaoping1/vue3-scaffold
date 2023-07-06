import { defineConfig,ConfigEnv, loadEnv,UserConfigExport } from 'vite'

import path from "path"
import {parseEnv} from "./vite/util"
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
  // console.log(command,mode)
  // const isBuild = command == "build"
  const root = process.cwd()
  //获取.env文件中的环境变量
  const env = parseEnv(loadEnv(mode,root))
  
  
  
  console.log(env)
  return {
    plugins:setupPlugins(env),
    resolve:{
      alias:{'@':path.resolve(__dirname,"src")}
    }
  }
}
