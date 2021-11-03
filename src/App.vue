<template>
  <div id="app">
    <router-view v-if="isRouterAlive"></router-view>
  </div>
</template>

<script>
export default {
  name: "app",
  data() {
    return {
      isRouterAlive: true
    };
  },

  provide() {
    return {
      reload: this.reload
    };
  },
  methods: {
    reload() {
      this.isRouterAlive = false;
      this.$nextTick(function() {
        this.isRouterAlive = true;
      });
    }
  }
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
.mint-tab-item.router-link-active {
  background: #aabece !important;
}
</style>
