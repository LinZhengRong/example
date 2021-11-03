<template>
  <div id="manage">
    <mt-header fixed title="活动管理">
      <router-link to="/my" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
    </mt-header>
    <div id="content">
      <mt-cell :title="item.title" :label="item.time" v-for="item in manage" :key="item._id">
        <mt-button
          :type="type[item.status]"
          size="small"
          @click="change(item)"
          :disabled="disabled[item.status]"
        >{{btnContent[item.status]}}</mt-button>
        <mt-button size="small" v-if="item.status == 'signing'" @click="check(item)">查看签到情况</mt-button>
      </mt-cell>
    </div>
  </div>
</template>
<script>
import { Toast } from 'mint-ui';
export default {
  inject: ["reload"],
  data() {
    return {
      manage: [],
      type: {
        prepare: "primary",
        signing: "danger",
        end: "default"
      },
      btnContent: {
        prepare: "开始签到",
        signing: "结束签到",
        end: "已结束"
      },
      disabled: {
        prepare: false,
        signing: false,
        end: true
      }
    };
  },

  created() {
    this.$api.activity
      .manage(this.$store.state["_id"])
      .then(res => {
        this.manage = res.data;
        //console.log(this.manage);
      })
      .catch(err => {
        console.log(err);
      });
  },
  methods: {
    getType: function(status) {
      switch (status) {
        case "prepare":
          status = "signing";
          break;
        case "signing":
          status = "end";
          break;
        default:
          status = "end";
          break;
      }
      return status;
    },
    change: function(item) {
      this.$api.activity
        .change(item._id, this.getType(item.status))
        .then(res => {
          console.log(res);
          Toast("修改成功")
           this.reload();
        });
    },
    check:function(item){
      this.$router.push({
        name: "setSeats",
        params: {
          seats: item.seats,
          id:item._id,
          origin:'manage'
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
button{
  margin-left:2vw;
}
</style>