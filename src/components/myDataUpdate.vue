<template>
  <div id="dUpdate">
    <mt-header fixed title="信息修改">
      <router-link to="/my/myData" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
    </mt-header>
    <div id="con">
      <mt-field :label="label" :placeholder="placeHolder" type="text" v-model="newData"></mt-field>
    </div>
    <mt-button type="primary" id="submit" @click="toSubmit">提交</mt-button>
  </div>
</template>
<script>
import { Toast } from "mint-ui";
import store from "../store/index";
export default {
  data() {
    return {
      label: "",
      placeHolder: "",
      newData: ""
    };
  },
  methods: {
    toSubmit: function() {
      if (this.newData == "") {
        Toast("还未填写信息！");
        return;
      }
      if (this.label == "姓名") {
        this.$api.user
          .userUpdate({
            type: "name",
            newData: this.newData,
            _id: store.state.id
          })
          .then(res => {
            if (res.code == 1) {
              Toast(res.data.message);
               this.$router.push("/my/myData")
            }
          });
      } else if (this.label == "学号") {
        this.$api.user
          .userUpdate({
            type: "num",
            newData: this.newData,
            _id: store.state.id
          })
          .then(res => {
            if (res.code == 1) {
              Toast(res.data.message);
              this.$router.push("/my/myData")
            }
          });
      }
    }
  },
  mounted() {
    switch (this.$route.query.type) {
      case "name":
        this.label = "姓名";
        this.placeHolder = store.state.name;
        this.model = this.newName;
        break;
      case "num":
        this.label = "学号";
        this.placeHolder = store.state.num;
        this.model = this.newNum;
        break;
    }
  }
};
</script>
<style scoped>
header {
  background: rgb(60, 199, 199);
  height: 50px;
}
#submit {
  width: 80%;
  margin-left: 10%;
  margin-top: 5%;
}
</style>