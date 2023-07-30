import vue from "@vitejs/plugin-vue"
import { type PluginOption } from "vite"

import { viteMockServe } from 'vite-plugin-mock'

import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

import { visualizer } from "rollup-plugin-visualizer";

export function setupPlugins(isBuild:boolean,env:ViteEnv){
    const options:PluginOption[] = [
      vue(),
      viteMockServe({
        //设置模拟.ts 文件的存储文件夹
        mockPath: 'mock',
        // 是否启用mock功能
        enable: !isBuild,
      }),
      AutoImport({
        resolvers: [ElementPlusResolver()],
        //为true时在项目根目录自动创建
        dts: 'types/auto-imports.d.ts',
      }),
      Components({
        resolvers: [ElementPlusResolver()],

        //指定哪个文件夹里的.vue文件需要按需加载
        dirs: ['src/components/from'],
        //组件名称包含目录，防止同名组件冲突
        directoryAsNamespace: true,
        //指定类型声明文件，为true时在项目根目录创建
        dts: 'types/components.d.ts',
      }),
      visualizer(),
    ]
    console.log(typeof env.VITE_API_URL)
    
    return options;
}



