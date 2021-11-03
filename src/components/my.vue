<template>
  <div id="my">
    <mt-header fixed title="我的"></mt-header>
    <div id="top">
      <div id="myHead">
        <img src="@/assets/images/1.png" alt />
      </div>
    </div>
    <div id="bottom">
      <mt-tab-container>
        <mt-tab-container-item>
          <router-link to="/my/myData">
            <mt-cell title="个人信息" />
          </router-link>
          <router-link to="/my/checkHistory">
            <mt-cell title="查看历史班级信息" />
          </router-link>
          <router-link to="/my/manage" v-if="isCommittee">
            <mt-cell title="管理发布的活动" />
          </router-link>
        </mt-tab-container-item>
      </mt-tab-container>
      <mt-button type="danger" @click="loginout">退出登录</mt-button>
    </div>
    <router-view></router-view>
  </div>
</template>
<script>
import store from '../store'
export default {
  data() {
    return {
      userIdentity: store.state['identity']
    };
  },
  methods: {
    loginout: function() {
      store.commit('SET_USERIDENTITY','');
      store.commit('SET_USERNUM','');
      store.commit('SET_USERNAME','');
       store.commit('SET_USERID','');
      store.commit('logOut');
    }
  },
  computed: {
     isCommittee(){
       return this.userIdentity == "班委" ? true : false
     }
  }
};
</script>
<style scoped>
#my {
  width: 100%;
  height: 100%;
}
header {
  background: rgb(60, 199, 199);
  height: 50px;
  box-shadow: 0 2px 5px rgba(89, 135, 156, 0.5);
}
#myHead {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  overflow: hidden;
  padding: 1px;
  border: 1px solid white;
  background: white;
}
#myHead img {
  width: 100%;
  height: 100%;
}
#top {
  width: 100%;
  height: 200px;
  background-image: linear-gradient(
    rgb(94, 204, 204),
    rgba(241, 250, 255, 0.1)
  );
  display: flex;
  justify-content: center;
  align-items: center;
}
div.mint-popup {
  border-radius: 10px;
  overflow: hidden;
}
#bottom {
  width: 80%;
  height: auto;
  background: white;
  margin-top: -10px;
  margin-left: 10%;
  color: rgb(38, 51, 53);
  font-weight: 500;
}
a {
  text-decoration: none;
  color: rgb(38, 51, 53);
}
a:link,
a:visited {
  color: rgb(38, 51, 53);
}
button {
  float: left;
  width: 100%;
  margin-top: 5vh;
}
</style>