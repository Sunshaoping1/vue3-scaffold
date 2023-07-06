import vue from "@vitejs/plugin-vue"
import { PluginOption } from "vite"
import { viteMockServe } from 'vite-plugin-mock'

export function setupPlugins(env:ViteEnv){
    const options:PluginOption[] = [
      vue(),
      viteMockServe({
        mockPath: 'mock',
        enable: true,
      }),
    ]
    
    console.log(typeof env.VITE_SOME_KEY)
    
    return options;
}


