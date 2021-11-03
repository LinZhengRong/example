<template>
  <div id="myData">
    <mt-header fixed title="我的信息">
      <router-link to="/my" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
    </mt-header>
    <div class="infoContent">
      <mt-cell title="姓名" :value="name" to="/my/dataUpdate?type=name" is-link></mt-cell>
      <mt-cell title="学号" :value="ID" to="/my/dataUpdate?type=num" is-link></mt-cell>
      <mt-cell title="身份" :value="identity"></mt-cell>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      name: this.$store.state["name"],
      ID: this.$store.state["num"],
      identity: this.$store.state["identity"]
    };
  }
};
</script>
<style scoped>
#myData {
  width: 100%;
  background: rgb(245, 250, 249);
}
header {
  background: rgb(60, 199, 199);
  height: 50px;
}
.infoContent {
  width: 100%;
}
</style>