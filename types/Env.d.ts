// 增加 ImportMetaEnv 的定义：

interface ViteEnv {
    VITE_ROUTER_AUTOLOAD:boolean
    VITE_API_URL:string
    VITE_MOCK_ENABLE:boolean
}
interface ImportMetaEnv extends ViteEnv{
  // readonly VITE_APP_TITLE: string
  // 更多环境变量...
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

