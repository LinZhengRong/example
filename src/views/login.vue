<template>
  <div id="login">
    <h4>登录</h4>
    <div id="login_form">
      <div id="login_form_main">
        <form>
          <mt-field label="学号" placeholder="请输入学号" v-model="user.id"></mt-field>
          <mt-field label="密码" placeholder="请输入密码" type="password" v-model="user.pwd"></mt-field>
          <div id="login_form_other">
            <router-link to="/reg">注册</router-link>
          </div>
          <mt-button type="primary" id="login-button" @click="check">登录</mt-button>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
import { Toast } from "mint-ui";
export default {
  data() {
    return {
      user: {
        id: "",
        pwd: ""
      }
    };
  },
  methods: {
    check: function() {
      this.$api.user.userLogin(this.user).then(res => {
        if (res.code == 1) {
          localStorage.setItem("token", res.data.token);
          Toast(res.data.message);
          this.$router.push("/");
        } else if (res.code == 2) {
          Toast(res.data.message);
        }
      });
    }
  }
};
</script>
<style scoped>
#login {
  width: 100%;
  position: absolute;
  top: 0;
  bottom: 0;
  color: rgb(63, 70, 80);
  background-image: linear-gradient(#e8e8e8, #bec2e6);
}
h4 {
  font-size: 3em;
  margin-left: 10%;
  margin-top: 30%;
}
#login_form {
  width: 80%;
  height: 400px;
  margin-left: 10%;
  margin-top: 5%;
}
#login_forget {
  margin-left: 5px;
  float: left;
}
#login_reg {
  margin-right: 5px;
  float: right;
}
#login-button {
  width: 100%;
  margin: 20px 0;
}
a {
  text-decoration: none;
}
a:visited,
a:link {
  color: rgb(110, 144, 184);
}
#login_form_other a:first-child {
  float: left;
  margin-left: 10px;
  margin-top: 10px;
}
#login_form_other a:last-child {
  float: right;
  margin-right: 10px;
  margin-top: 10px;
}
</style>


