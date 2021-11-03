<template>
  <div id="reg">
     <mt-button id="back" icon="back" slot="left" @click="toBack()">返回</mt-button>
    <h4>用户注册</h4>
    <div id="reg_form">
      <div id="reg_form_main">
        <form>
          <mt-field label="学号" placeholder="请输入学号" v-model="user.id"></mt-field>
          <mt-field label="姓名" placeholder="请输入真实姓名" v-model="user.name"></mt-field>
          <mt-field label="密码" placeholder="请输入密码" type="password" v-model="user.pwd"></mt-field>
          <mt-field label="手机号" placeholder="请输入手机号" type="tel" v-model="user.tel"></mt-field>
          <mt-button type="primary" id="reg-button" @click="toReg">注册</mt-button>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
import { Toast } from 'mint-ui';
export default {
  data() {
    return {
      user: {
        name:'',
        id:'',
        pwd:'',
        tel:''
      }
    };
  },
  methods: {
    toReg: function() {
      this.$api.user.userReg(this.user).then(res=>{
        if(res.code == 1){
           Toast('注册成功')
           this.$router.push({path:'/login'})
        }
      })
    },
    toBack:function() {
      this.$router.push('/login');
    }
  }
};
</script>
<style scoped>
#reg {
  width: 100%;
  position: absolute;
  top: 0;
  bottom: 0;
    background-image: linear-gradient(#e8e8e8, #bec2e6);
}
h4 {
  font-size: 2.8em;
  margin-left: 10%;
  margin-top: 30%;
  color: rgb(63, 70, 80);
}
#reg_form {
  width: 80%;
  height: 400px;
  margin-left: 10%;
  margin-top: 5%;
}
#reg-button {
  width: 100%;
  margin-top: 25px;
}
#back{
  background: transparent;
  border-color:transparent;
  margin-left:9vw;
  margin-top:3vh;
}
</style>