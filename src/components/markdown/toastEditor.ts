import { uploadImg } from "@/api/uploadApi";

// import '@toast-ui/editor/dist/i18n/zh-cn.js';



export default class{
    public editor:toastui.Editor
    public isFullScreen:boolean
    constructor(el:string,public height:string,initialValue:string){
       this.isFullScreen = false;
       this.editor = new toastui.Editor({
            el: document.querySelector(el),
            // 设置预览样式为垂直分割
            previewStyle: 'vertical',
            // 设置编辑器类型为,markdown
            initialEditType:'markdown',
            height,
            initialValue,
            toolbarItems:this.toolbar(),
            // language: 'zh-CN'
        });
        this.ImageHook()
    }
    getMarkdown(){
        return this.editor.getMarkdown()
    }
    on(type:string,handler:Function){
        return this.editor.on(type,handler)
    }
    getHTML(){
        return this.editor.getHTML()
    }
    //编辑器的工具栏
    private toolbar(){
        return [
            ['heading', 'bold', 'italic', 'strike'],
            ['hr', 'quote'],
            ['ul', 'ol', 'task', 'indent', 'outdent'],
            ['table', 'image', 'link'],
            ['code', 'codeblock'],
            // Using Option: Customize the last button
            [{
              el: this.FullScrrenButton(),
              command: 'link',
              tooltip: 'Custom fullscreen'
            }],
            [{
                el: this.FullScrrenButton(),
                command: '',
                tooltip: 'Custom fullscreen'
            }]
        ]
    }
    //自定义上传图片钩子
    private ImageHook(){
        this.editor.removeHook("addImageBlobHook")
        this.editor.addHook('addImageBlobHook',async(blob:any,callback:Function)=>{
            /* console.log("blob",blob)

            //hq720.webp:1 （图片的名称）
            console.log(blob?.name)

            //ƒ (t,r){return e.props.execCommand("addImage",{imageUrl:t,altText:r||n.value})}
            console.log(callback)

            //GET http://localhost:5173/editor/hq720.webp 404 (Not Found)
            //callback函数应该在上传之后调用
            callback(blob?.name,"hihji") */

            console.log("blob",blob)
        
            const formData = new FormData()
            formData.append("file",blob,blob.name)
            console.log(formData.get('file'))
            // <input id="toastuiImageFileInput" type="file" accept="image/*">
            const {data:{url}} = await uploadImg(formData)

            //因为使用的是mock模拟的数据，所以无论选择的是什么，返回的永远是同一张图片
            //在实际工作中，后台应该根据用户选择的图片路径，来返回不同的图片
            callback(url,blob.name)
        })
    }
    // 自定义全屏按钮
    private FullScrrenButton(){
        const button = document.createElement("button") as HTMLButtonElement;
        button.className = 'toastui-editor-toolbar-icons last';
        button.style.backgroundImage = 'none';
        button.style.margin = '0';
        button.innerHTML = `<div><i class="fas fa-compress-arrows-alt text-sm"></i></div>`;

        button.addEventListener('click', () => {
            //   document.getElementById("editor")?.requestFullscreen()
            
            //为编辑器获取焦点
            this.editor.focus()

            this.toggleFullScrren()
        });

        document.documentElement.addEventListener("keyup",(event:KeyboardEvent)=>{
            // console.log(event.key,event.code)

            //只有全屏的时候才触发
            if(event.key == "Escape" && this.isFullScreen){
                this.toggleFullScrren()
            }
        })
        return button;
    }

    // 切换全屏
    private toggleFullScrren(){
        
        const ui = document.getElementById("editor") as HTMLDivElement
        ui.classList.toggle("fullscreen")
        
        // 因为要么add要么remove，所以这里可以直接取反
        this.isFullScreen = !this.isFullScreen

        if(this.isFullScreen == false){
            this.editor.setHeight(this.height)
        }else{
            //设置编辑器高度
            this.editor.setHeight('100vh')
        }
    }
}