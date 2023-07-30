import { defineRule, configure } from "vee-validate";
import {min,required,email,confirmed} from "@vee-validate/rules"
import zh_CN from '@vee-validate/i18n/dist/locale/zh_CN.json';
import { localize } from "@vee-validate/i18n";



export function setupGlobalRules(){
    defineRule("min",min)
    defineRule("email",email)
    defineRule("required",required)
    defineRule("confirmed",confirmed)

    //中文提示消息处理
    //将@vee-validate/rules的消息提示转化为中文
    configure({
        validateOnInput:true,
        generateMessage:localize('zh_CN',zh_CN)
    })
}
