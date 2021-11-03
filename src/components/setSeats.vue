<template>
  <div id="setSeats">
    <mt-header fixed title="签到">
      <mt-button icon="back" slot="left" @click="toBack()">返回</mt-button>
    </mt-header>
    <div id="main">
      <div id="seats">
        <div class="seat" v-for="n in total " :key="n" :class="checkActive(n)" @click="showP(n)"></div>
      </div>
      <div id="platform">讲台</div>
    </div>
  </div>
</template>
<script>
import { Toast } from "mint-ui";
export default {
  data() {
    return {
      total: []
    };
  },
  methods: {
    showP: function(n) {
      if (typeof n == "string") {
        Toast("签到人名字:" + n);
      } else {
        if (this.$route.params.origin == "manage") {
          return;
        }
        var name = this.$store.state["name"];
        var id = this.$route.params.id;
        var seatsData = this.$route.params.seats;
        var newData = {};
        newData[n] = name;
        seatsData.push(newData);

        this.$api.activity.toSign(seatsData, id).then(res => {
          //console.log(res);
          if (res.code == 1) {
            Toast(res.data.message);
            this.$router.push({ path: "/" });
          }
        });
      }
    },
    checkActive: function(n) {
      return [typeof n == "string" ? "active" : ""];
    },
    toBack: function() {
      this.$router.go(-1);
    }
  },
  created() {
    var finData = this.$route.params.seats;
    //var data = new Array(120).keys();
    var arr = new Array(120);
    for (var i = 0; i < arr.length; i++) {
      arr[i] = i;
    }
    for (var key in finData) {
      for (var key2 in finData[key]) {
        arr[key2] = finData[key][key2];
      }
    }
    this.total = arr;
  }
};
</script>
<style scoped>
header {
  background: rgb(60, 199, 199);
  height: 50px;
}

#main {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  height: auto;
  position: absolute;
  top: 0;
  bottom: 0;
}
#seats {
  display: grid;
  width: 80vw;
  grid-template-rows: repeat(12, 7vw);
  grid-template-columns: repeat(10, 7vw);
  grid-row-gap: 1vw;
  grid-column-gap: 1vw;
}
.seat {
  border: 1px solid rgb(158, 158, 158);
  border-radius: 3px;
}
#platform {
  width: 30vw;
  height: 5vh;
  line-height: 5vh;
  text-align: center;
  border-radius: 5px;
  color: white;
  background: rgb(154, 211, 211);
}
.selected {
  background: rgb(139, 196, 235);
}
.active {
  background: rgb(159, 159, 184);
}
</style>


// grid-column-start属性：左边框所在的垂直网格线
// grid-column-end属性：右边框所在的垂直网格线
// grid-row-start属性：上边框所在的水平网格线
// grid-row-end属性：下边框所在的水平网格线