<template>
  <div v-show="popupVisible">
    <mt-popup v-model="popupVisible" id="detail" :closeOnClickModal="closeOnClickModal">
      <mt-header fixed title="详细信息">
        <mt-button icon="back" slot="left" @click="toBack()">返回</mt-button>
      </mt-header>
      <div class="content">
        <div class="title">{{item.title}}</div>
        <b>发布人学号:</b>
        {{item.prmoterID}}
        <br />
        <b>时间:</b>
        {{item.time}}
        <br />
        <b>状态:</b>
        {{item.status}}
        <br />
        <b>地点:</b>
        {{item.way}}
        <br />
        <b>参加人数:</b>
        {{item.number}}
        <br />
        <b>活动说明:</b>
        <br />
        <div class="explain">{{item.explain}}</div>
      </div>
    </mt-popup>
  </div>
</template>
<script>
export default {
  name: "detail",
  props: ["popupVisible", "item", "pageFrom", "closeOnClickModal"],
  data() {
    return {
      backTarget: this.pageFrom == "historyContent" ? "/my/checkHistory" : "/"
    };
  },
  methods: {
    toBack: function() {
      this.$emit("toClose", this.backTarget);
    }
  }
};
</script>
<style scoped>
#detail {
  width: 300px;
  height: 400px;
  background: white;
  border-radius: 10px;
  overflow: hidden;
  margin:10px 0;
}
a {
  text-decoration: none;
}
header {
  background: rgb(126, 198, 207);
  height: 50px;
}
.content {
  position: absolute;
  margin: 5vw 0;
  padding-left: 5vw;
  width: 100%;
  top: 50px;
  height: 40vh;
  color: rgb(72, 102, 136);
}

.title {
  font-size: 2em;
  font-weight: bold;
}
.explain {
  width: 60vw;
  height: 30vw;
  background: white;
  border-radius: 3px;
  font-weight: bold;

  padding: 1vh;
}
</style>

