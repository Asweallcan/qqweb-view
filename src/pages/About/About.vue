
<template>
  <div @touchstart="touchstart" @touchmove="touchmove" class="wrapper">
    <v-header @openSideMenu="openSideMenu" currentTab="3"></v-header>
    <div class="about-content">
      <div @click.prevent="logout" class="about-bottom">退出登录</div>
      <div class="about-text">
        <h4>武汉理工大学</h4><br>
        计算机科学与技术学院<br>
        软件zy1501<br>
        吕世豪
      </div>
    </div>
    <side-menu :open="open"></side-menu>
    <v-footer currentTab="3"></v-footer>
  </div>
</template>

<script>
  import SideMenu from "pages/Common/SideMenu/SideMenu.vue";
  import VFooter from "pages/Common/Footer/Footer.vue";
  import VHeader from "pages/Common/Header/Header.vue";
  import axios from "axios";
  import {mapMutations} from "vuex";

  export default {
    data() {
      return {
        startX: 0,
        startY: 0,
        endX: 0,
        endY: 0,
        distanceX: 0,
        distanceY: 0,
        open: ""
      };
    },
    components: {
      SideMenu,
      VFooter,
      VHeader
    },
    methods: {
      touchstart(e) {
        this.startX = e.touches[0].pageX;
        this.startY = e.touches[0].pageY;
      },
      touchmove(e) {
        this.endX = e.touches[0].pageX;
        this.endY = e.touches[0].pageY;
        this.distanceX = this.endX - this.startX;
        this.distanceY = this.endY - this.startY;
      },
      openSideMenu() {
        this.open = "open";
      },
      logout() {
        this.setLogout();
        axios.post("/api/dologout", {}).then(response => {
          if (response.data == "1") {
            this.$router.push("/login");
            return
          }
        }).catch(err => {
          console.log(err)
        });
      },
      ...mapMutations({
        setLogout: "SET_LOGOUT"
      })
    },
    watch: {
      distanceX(newX) {
        if (Math.abs(newX) > Math.abs(this.distanceY) && newX < -100) {
          this.open = "";
        }
      }
    }
  };
</script>
<style lang="scss" scoped>
  @import "~assets/variables.scss";

  .wrapper {
    background: #eee;
    .about-content {
      position: absolute;
      top: 40px;
      bottom: 50px;
      height: 100%;
      width: 100%;
      background: url("/api/background/about.jpg") no-repeat top center;
      background-size: contain;
    }
    .about-bottom {
      position: absolute;
      width: 100%;
      height: 40px;
      bottom: 100px;
      line-height: 40px;
      text-align: center;
      border-radius: 10px;
      color: #333;
      background: #dd102b;
    }
    .about-text {
      text-align: center;
      position: absolute;
      height: 100px;
      width: 100%;
      bottom: 250px;
      line-height: 30px;
    }
  }
</style>
