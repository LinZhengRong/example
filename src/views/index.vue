<template>
  <div id="index">
    <div id="content" class="layout-content">
      <router-view></router-view>
    </div>
    <mt-tabbar>
      <mt-tab-item id="消息">
        <img slot="icon" src="@/assets/images/xiaoxi.png" />
        <router-link to="/activity">活动</router-link>
      </mt-tab-item>
      <mt-tab-item id="我的">
        <img slot="icon" src="@/assets/images/wo.png" />
        <router-link to="/my">我的</router-link>
      </mt-tab-item>
    </mt-tabbar>
  </div>
</template>
<script>
</script>
<style scoped>
a {
  text-decoration: none;
}
a:visited,
a:link {
  color: rgb(60, 199, 199);
}
#content {
  position: absolute;
  width: 100%;
  top: 50px;
  bottom: 55px;
}
div.mint-tabbar {
  position: absolute;
  bottom: 0;
}
</style>