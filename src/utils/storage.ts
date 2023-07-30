interface IDate{
    expire?:number,
    data:any
}


class Deadline{ 
    public set(key:string,data:any,expire?:number):void{
        let cache:IDate = {data}
        if(expire){
            cache.expire = new Date().getTime() + expire * 1000;
        }
        localStorage.setItem(key,JSON.stringify(cache))
    }
    public get(key:string):any{
        const item = localStorage.getItem(key)
        if(item){
            const cache = JSON.parse(item)
            const expire = cache?.expire;
            if(expire && expire < new Date().getTime()){
                localStorage.removeItem(key)
                return null
            }
            return cache.data;
        }
        return null;
    }
    public remove(key:string):void{
        localStorage.removeItem(key)
    }
}

const deadline = new Deadline()

export default deadline;