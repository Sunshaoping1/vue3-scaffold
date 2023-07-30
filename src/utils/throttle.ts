
// 节流：按一定的频率触发事件。（当在该频率内触发了多次事件，会将多出来的次数合并为一次触发）
export default function throttle(f:Function,ms:number){
    let isRun = false,isbol = false;
    let param:any[];
    function run(...args:any[]){
        //ms秒内执行多次isRun为true
        if(isRun){
            isbol = true
            param=args;
            return
        }
        f.apply(undefined,args)
        isRun = true;
        setTimeout(()=>{
            //ms秒后将其重置
            isRun = false;
            // 检查ms秒内是否触发了多次
            if(isbol){
                run.apply(undefined,param)  
                isbol = false

            }
        },ms)

    }

    return run;

}





