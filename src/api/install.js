import apiList from './apiList'
const install = function(Vue){
    if(install.installed) return 
    install.installed = true
    Object.defineProperties(Vue.prototype,{
        $api:{
            get(){
                return apiList
            },
            enumerable:false,
            configurable:false
        }
    })
}
export default{
    install
}