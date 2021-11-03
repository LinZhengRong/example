<template>
  <div id="checkHistory">
    <mt-header fixed title="班级历史活动信息">
      <router-link to="/my" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
    </mt-header>
    <div class="infoContent">
      <mt-cell
        :key="item._id"
        v-for="item in content"
        :title="item.title"
        :value="item.time"
        is-link
        :to="{path:'/my/checkHistory/detail'}"
        @click.native="toPop(item)"
      ></mt-cell>
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
export default {
  components: {
    "item-detail": detail
  },
  data() {
    return {
      popupVisible: false,
      content: [],
      closeOnClickModal:false,
      item: {},
      current: "historyContent"
    };
  },
  methods: {
    toPop: function(item) {
      this.popupVisible = true;
      this.item = item;
    },
    toClose: function(backTarget) {
      this.popupVisible = false;
      this.$router.push(backTarget);
    }
  },
  created() {
    this.$api.activity
      .activityInfo()
      .then(res => {
        this.content = res;
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>
<style scoped>
#checkHistory {
  width: 100%;
  height: 100vh;
  background: rgb(236, 255, 253);
}
header {
  background: rgb(60, 199, 199);
  height: 50px;
}
.infoContent {
  width: 100%;
}
</style>