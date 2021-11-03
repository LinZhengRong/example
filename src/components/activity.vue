<template>
  <div id="activity">
    <mt-header fixed title="最新活动"></mt-header>
    <div id="itemAdd">
      <router-link to="/activityAdd">
        <mt-button type="default" v-if="isCommittee">发布活动</mt-button>
      </router-link>
    </div>
    <activity-item :item="item" :key="item.itemID" v-for="item in content"></activity-item>
  </div>
 
</template>
<script>
import activityItem from "../components/activityItem";
export default {
  components: {
    activityItem
  },
  data() {
    return {
      content: [],
      isCommittee:this.$store.state['identity']  == "班委" ? true : false
    };
  },
  created() {
    this.$api.activity
      .activityInfo()
      .then(res => {
        this.content = res;
      })
      .catch(err => {
        console.log(err);
      })
  }
};
</script>
<style scoped>
header {
  background: rgb(60, 199, 199);
  height: 50px;
}
#activity {
  width: 100%;
  height: 100%;
  margin-top: 20px;
  overflow: hidden;
}
#itemAdd {
  position: absolute;
  right: 10%;
  margin-top: -10px;
}
#itemAdd button {
  height: 30px;
}
</style>