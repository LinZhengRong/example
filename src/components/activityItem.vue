<template>
  <div class="activityItem" v-if="itemShow">
    <div class="status"></div>
    <div class="statusContent">{{status}}</div>
    <div class="itemMessage">
      <div style="margin-bottom:15px;">
        <b style="font-size:1.5em;">{{item.itemContent}}</b>
      </div>
      <div>
        <div class="title">{{item.title}}</div>
      
        <br />
        <span>
          <b>活动时间:</b>
          {{item.time}}
        </span>
      </div>
      <div>
        <b>活动地点:</b>
        {{item.way}}
      </div>

      <div>已确认有{{item.number}}人参加活动</div>
    </div>
    <div class="itemHandle">
      <router-link :to="{path:'/activity/detail'}">
        <mt-button type="primary" plain @click.native="toPop()">详细</mt-button>
      </router-link>
      <mt-button type="primary" plain v-if="buttonshow" @click="toSign">点击签到</mt-button>
      <mt-button
        type="primary"
        plain
        v-if="!buttonshow"
        @click="toJoin"
        :disabled="disabled"
      >{{signText}}</mt-button>
    </div>
    <item-detail
      :closeOnClickModal="closeOnClickModal"
      popup-transition="popup-fade"
      :popupVisible="popupVisible"
      :item="item"
      :pageFrom="current"
      @toClose="toClose"
    ></item-detail>
  </div>
</template>
<script>
import detail from "./detail";
import { Toast } from 'mint-ui';
export default {
  inject: ["reload"],
  props: ["item"],
  components: {
    "item-detail": detail
  },
  data() {
    return {
      popupVisible: false,
      closeOnClickModal: true,
      modal: true,
      status: "",
      itemShow: "",
      buttonshow: "",
      current: "indexItem",
      signText: "点击参加",
      disabled: false
    };
  },
  methods: {
    toPop: function() {
      this.popupVisible = true;
    },
    toJoin: function() {
      //console.log(this.item._id);
      this.signText = "已参加";
      this.$api.activity
        .addJoinNum(this.item._id, this.item.number + 1)
        .then(res => {
          //console.log(res.data);
          if (res.code == "1") {
            Toast("提交成功");
            this.item.number += 1;
            this.disabled = true;
          }
        });
    },
    toClose: function(backTarget) {
      this.popupVisible = false;
      this.$router.push(backTarget);
    },
    toSign: function() {
      this.$router.push({
        name: "setSeats",
        params: {
          seats: this.item.seats,
          id:this.item._id
        }
      });
    }
  },
  mounted() {
    switch (this.item.status) {
      case "end":
        this.status = "已结束";
        this.isShow = false;
        break;
      case "prepare":
        this.status = "准备中";
        this.itemShow = true;
        this.buttonshow = false;
        break;
      case "signing":
        this.status = "签到中";
        this.itemShow = true;
        this.buttonshow = true;
        break;
    }
  }
};
</script>
<style scoped>
.activityItem {
  color: rgb(73, 73, 73);
  width: 80%;
  position: relative;
  height: 23vh;
  margin-top: 30px;
  margin-left: 10%;
  box-shadow: 5px 5px 5px rgba(109, 125, 136, 0.2),
    -3px 0px 5px rgba(82, 104, 117, 0.3);
  padding: 10px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  border-radius: 5px;
}
.itemHandle button {
  width: 30%;
  height: 30px;
  margin: 3px;
  font-size: 1em;
  width: 48%;
}
.itemHandle button:last-child {
  font-size: 0.85em;
}
.title{
  font-size:1.2em;
  font-weight: bold;
  margin-bottom: 0;
}
.itemMessage div:last-child {
  margin-top: 10px;
  float: right;
  font-weight: 100;
  font-size: 0.8em;
}
span {
  float: right;
}
p {
  text-indent: 2em;
  box-shadow: 5px 0px 5px white, -5px 0px 5px white,
    0px 1px 1px rgb(194, 185, 185);
  margin-top: 10px;
}
.status {
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 6vw 15vw;
  border-color: rgb(164, 167, 211) rgb(164, 167, 211) transparent transparent;
  position: absolute;
  top: 0;
  right: 0;
}
.statusContent {
  position: absolute;
  top: 0;
  right: 0;
  width: 15vw;
  height: 10vh;
  line-height: 4vh;
  font-weight: bold;
}
</style>