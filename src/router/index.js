import Vue from 'vue'
import VueRouter from 'vue-router'
import login from '../views/login'
import reg from '../views/reg'
import index from "../views/index"
import my from "../components/my"
import activity from "../components/activity"
import myData from "../components/myData"
import checkHistory from "../components/checkHistory"
import activityAdd from "../components/activityAdd"
import setSeats from "../components/setSeats"
import detail from "../components/detail"
import manage from "../components/manage"
import user from "../api/user";
import store from "../store/index"
import dataUpdate from "../components/myDataUpdate"
import { Toast } from 'mint-ui';
Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    component: login,
    name: 'login'
  },
  {
    path: '/reg',
    component: reg
  },
  {
    path: "/",
    component: index,
    redirect: '/activity',
    children: [
      {
        path: "/my",
        component: my
      },
      {
        path: "/my/myData",
        component: myData
      },
      {
        path: "/my/checkHistory",
        component: checkHistory,
        children: [{
          path: "detail",
          component: detail
        }]
      },
      {
        path: "/activity",
        component: activity,
        children: [{
          path: "detail",
          component: detail
        }]
      },
      {
        path: "/activityAdd",
        component: activityAdd
      },
      {
        path: "/activityAdd/setSeats",
        component: setSeats,
        name:'setSeats'
      },
      {
        path: "/my/manage",
        component: manage
      },
      {
        path: "/my/dataUpdate",
        component: dataUpdate
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

const whiteList = ['/login','/reg']

router.beforeEach((to, from, next) => {
  if (localStorage.getItem('token')) {
    if (to.path == '/login') {
      Toast("您已经登录")
      next({ path: '/' });
    } else {
        user.userInfo().then(res => {
        let user = res.data[0];
        store.commit('SET_USERID', user._id);
        store.commit('SET_USERIDENTITY', user.identity);
        store.commit('SET_USERNUM', user.ID);
        store.commit('SET_USERNAME', user.name);
        next()
      }).catch(err=>{
        console.log(err);
        store.commit('logOut');
      })
    }
  }else{
    if(whiteList.indexOf(to.path) > -1){
      next()
    }else{
      Toast('请先登录')
      next({path:'/login'})
    }
  }
})

export default router
