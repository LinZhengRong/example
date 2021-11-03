import api from '../index'
import urls from './urls'
export default {
    activityInfo() {
        return api.get(urls.activityInfo)
    },
    manage(param) {
        param = { id: param }
        return api.post(urls.manage, param)
    },
    getOneItem(param) {
        param = { id: param }
        return api.post(urls.getOneItem, param)
    },
    addJoinNum(param1, param2) {
        return api.post(urls.addJoinNum, { id: param1, num: param2 })
    },
    toSign(param1, param2) {
        return api.post(urls.toSign, { obj: param1, id: param2})
    },
    change(param1, param2){
        return api.post(urls.change, { id: param1, newData: param2})
    },
    createItem(param1, param2){
        return api.post(urls.createItem, { id: param1, newData: param2})
    }
}