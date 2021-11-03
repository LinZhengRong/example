import api from '../index'
import urls from './urls'
export default{
    userInfo(){
        return api.get(urls.userInfo)
    },
    userLogin(params){
        params={id:params.id,pwd:params.pwd}
        return api.post(urls.userLogin,params)
    },
    userReg(params){
        return api.post(urls.userReg,params)
    },
    userUpdate(params){
        params={type:params.type,newData:params.newData,_id:params._id}
        return api.post(urls.userUpdate,params)
    }
}