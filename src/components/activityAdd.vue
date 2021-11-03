<template>
  <div id="activityAdd">
    <mt-header fixed title="活动信息填写">
      <router-link to="/" slot="left">
        <mt-button icon="back" style="margin-top:0;">返回</mt-button>
      </router-link>
    </mt-header>
    <div id="message">
      <form action>
        <mt-field label="活动标题" placeholder="请输入活动标题" name="title" v-model="newItem.title" required></mt-field>
        <mt-field label="活动地点" placeholder="请输入活动地点" name="way" v-model="newItem.way"></mt-field>
        <mt-field label="活动时间" type="date" placeholder="请输入活动时间" name="time" v-model="newItem.time"></mt-field>
        <mt-field
          id="Acontent"
          label="活动内容描述"
          type="textarea"
          rows="5"
          placeholder="请输入活动描述"
          name="explain"
          v-model="newItem.explain"
        ></mt-field>

        <mt-button type="primary" id="login-button" @click="createItem">提交</mt-button>
      </form>
    </div>
  </div>
</template>
<script>
import { Toast } from "mint-ui";
export default {
  data() {
    return {
      newItem: {
        title: "",
        way: "",
        time: "",
        explain: ""
      }
    };
  },
  methods: {
    createItem: function() {
      this.$api.activity
        .createItem(this.$store.state["num"],this.newItem)
        .then(res => {
          if (res.code == 1) {
            Toast("发布成功");
            this.$router.push("/");
          }
        });
    }
  }
};
</script>
<style scoped>
header {
  background: rgb(60, 199, 199);
  height: 50px;
}
#activityAdd {
  width: 80%;
  height: 500px;
  margin: 10%;
}
button {
  margin-top: 20px;
  width: 100%;
}
#Acontent {
  box-shadow: 0 1px 1px rgba(114, 114, 114, 0.3);
}
#login-button {
  margin-top: 5vh;
}
</style>