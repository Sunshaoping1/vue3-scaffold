
// 为引入的toastuiEaitor中的 toastui.Editor类 提供ts类型支持
declare namespace toastui{
    // class EditorCore{
    //     constructor(options:object)
    //     getMarkdown:()=>string
    // }
    // class Editor extends EditorCore{}

    class Editor{
        constructor(options:object)
        getMarkdown:()=>string
        on:(type:string,handler:Function)=>any
        getHTML:()=>string
        removeHook:(type:"addImageBlobHook")=>any
        addHook:(type:"addImageBlobHook",handler:Function)=>any
        insertToolbarItem:(indexInfo:object, item:string|object)=>any
        setHeight:(height:string)=>any
        focus:()=>any
    }
}