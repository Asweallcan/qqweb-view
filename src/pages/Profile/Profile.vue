
<template>
  <div class="wrapper">
    <div @click.prevent="back" class="backbtn">返回</div>
    <div class="setting-wrapper">
      <div ref="background" class="background-content">
        <img class="background" :src="'/api/background/'+userinfo.background" alt="">
      </div>
      <scroll listenScroll @scroll="scroll" :probeType="probeType" class="setting-content">
        <div style="height:101%;">
          <div @click.prevent="showPreview=!showPreview;show='avatar'" class="avatar-content">
            <img class="avatar" :src="'/api/avatar/'+userinfo.avatar" alt="">
          </div>
          <div class="tab nickandsig">
            <h3 class="nickname">{{userinfo.nickname}}</h3>
            <p class="signature">{{userinfo.signature}}</p>
          </div>
          <div class="tab otherinfo" @click.prevent="toSetting()">
            <p class="info qq">
              <img class="icon" src="./qq.png" alt="">{{userinfo.qq}}</p>
            <p class="info sexandage">
              <img class="icon" src="./info.png" alt="">{{userinfo.sex=="male"?"男":"女"}} {{userinfo.age}}岁</p>
            <p class="info place">
              <img class="icon" src="./place.png" alt="">{{userinfo.place}}</p>
            <img v-show="userinfo.qq==currentUser.qq" src="./fhe.png" class="icon-toEdit" alt="">
          </div>
        </div>
      </scroll>
      <div class="bottom">
        <div class="bottom-btn">
          <span @click.prevent="toSetting()" v-show="userinfo.qq==currentUser.qq">编辑资料</span>
          <span @click.prevent="toChat()" v-show="userinfo.qq!=currentUser.qq">发起聊天</span>
        </div>
      </div>
    </div>
    <transition name="fade">
      <div v-show="showPreview" @click.prevent="showPreview=!showPreview" class="previewer">
        <img class="previewer-img" :src="'/api/avatar/'+userinfo.avatar" alt="">
      </div>
    </transition>
  </div>
</template>

<script>
  import VFooter from "pages/Common/Footer/Footer.vue";
  import VHeader from "pages/Common/Header/Header.vue";
  import Scroll from "base/Scroll/Scroll.vue";
  import axios from "axios";
  import {mapGetters} from "vuex";

  export default {
    data() {
      return {
        userinfo: {
          avatar: "avatar.jpg",
          background: "background.jpg"
        },
        showPreview: false,
        scrollY: 0,
        height: 0,
        currentUser: {}
      };
    },
    components: {
      VFooter,
      VHeader,
      Scroll
    },
    created() {
      this.probeType = 3;
    },
    computed: {},
    mounted() {
      this.getProfile();
      this.height = this.$refs.background.clientHeight;
      this.currentUser = JSON.parse(localStorage.user);
    },
    activated() {
      this.getProfile();
      this.height = this.$refs.background.clientHeight;
      this.currentUser = JSON.parse(localStorage.user);
    }
    ,
    methods: {
      getProfile() {
        axios
          .get("/api/getprofile", {
            params: {
              qq: this.$route.params.qq
            }
          })
          .then(response => {
            this.userinfo = response.data;
          })
          .catch(err => {
            console.log;
          });
      },
      back() {
        this.$router.go(-1);
      },
      scroll(pos) {
        this.scrollY = pos.y;
      },
      toSetting() {
        if (this.userinfo.qq == this.currentUser.qq) {
          this.$router.push("/setting");
        } else {
          return
        }
      },
      toChat() {
        this.$router.push(`/chatone/${this.userinfo.qq}`)
      }
    },
    watch: {
      scrollY(newVal) {
        var scale = 1;
        const percent = 2 * Math.abs(newVal / this.height);
        scale = 1 + percent;
        if (newVal < 0) {
          this.$refs.background.style.transform = `translate3d(0,${newVal}px,0)`;
        } else {
          this.$refs.background.style.transform = `scale(${scale})`;
        }
      }
    }
  };
</script>

<style lang="scss" scoped>
  @import "~assets/variables.scss";

  .fade-enter-active,
  .fade-leave-active {
    opacity: 1;
    transition: all 0.3s ease-in-out;
  }

  .fade-enter,
  .fade-leave-active {
    opacity: 0;
  }

  .backbtn {
    position: absolute;
    z-index: 20;
    left: 10px;
    top: 10px;
    color: white;
  }

  .previewer {
    width: 100%;
    height: 100%;
    background: #000;
    z-index: 10;
    position: absolute;
    left: 0;
    top: 0;
    .previewer-img {
      max-width: 100%;
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      margin: auto;
    }
  }

  .wrapper {
    background: #eee;
  }

  .setting-wrapper {
    position: fixed;
    top: 0;
    bottom: 0;
    width: 100%;
    .background-content {
      position: absolute;
      .background {
        height: 200px;
        width: 100%;
      }
    }
    .bottom {
      position: absolute;
      bottom: 0;
      width: 100%;
      height: 60px;
      padding: 10px;
      background: #eee;
      .bottom-btn {
        position: absolute;
        bottom: 0;
        left: 0;
        top: 0;
        right: 0;
        margin: auto;
        width: 90%;
        height: 40px;
        letter-spacing: 1px;
        font-weight: 100;
        text-align: center;
        line-height: 40px;
        border: 1px solid $theme_color;
        background: $theme_color;
        color: #fff;
        border-radius: 5px;
      }
    }
    .setting-content {
      height: 100%;
      overflow: hidden;
    }
    .avatar-content {
      margin: 0px 10px;
      position: relative;
      top: 150px;
      .avatar {
        display: block;
        width: 100px;
        height: 100px;
        border-radius: 50%;
        margin: 0 auto;
      }
      .choose-avatar {
        position: absolute;
        top: 40%;
        right: 20px;
        color: $attention_text;
      }
    }
    .tab {
      text-align: center;
      position: relative;
      top: 150px;
      .signature {
        color: #888;
        font-size: 12px;
      }
      .icon {
        width: 20px;
        height: 20px;
        vertical-align: middle;
        margin-right: 15px;
      }
      .icon-toEdit {
        width: 15px;
        position: absolute;
        right: 15px;
        top: 30%;
      }
    }
    .info {
      margin-bottom: 5px;
    }
    .nickandsig {
      margin-bottom: 20px;
    }
    .otherinfo {
      text-align: left;
      text-indent: 15px;
    }
  }
</style>
