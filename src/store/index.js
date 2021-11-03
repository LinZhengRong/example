import Vue from 'vue'
import Vuex from 'vuex'
import router from '../router/index'
import { Toast } from 'mint-ui';
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    id:'',
    num:'',
    identity:'',
    name:''
  },
  mutations: {
    SET_USERID(state,n){
      state.id=n;
    },
    SET_USERIDENTITY(state,n){
      state.identity=n;
    },
    SET_USERNUM(state,n){
      state.num=n;
    },
    SET_USERNAME(state,n){
      state.name=n;
    },
    logOut(){
      localStorage.removeItem('token');
      Toast('退出成功');
      router.push({path:'/login'})
    }
  }
})
