
<template>
  <!--  主页面头部 -->
  <div class="header">
    <img v-if="userinfo.avatar" @click="openSideMenu" class="face" :src="'/api/avatar/'+userinfo.avatar"/>
    <div class="title">{{title}}</div>
  </div>
</template>

<script>
  import {mapGetters, mapMutations} from 'vuex'
  import axios from 'axios'

  export default {
    name: "head",
    props: ["currentTab"],
    data() {
      return {
        userinfo: {}
      }
    },
    mounted() {
      this.getProfile()
    },
    activated() {
      this.getProfile()
    },
    computed: {
      title() {
        return this.currentTab == 1 ? "消息" : this.currentTab == 2 ? "联系人" : "关于";
      },
      ...mapGetters(["login", "user"])
    },
    methods: {
      openSideMenu() {
        this.$emit("openSideMenu");
      },
      getProfile() {
        axios
          .get("/api/getprofile", {
            params: {
              qq: this.user.qq
            }
          })
          .then(response => {
            console.log(response);
            this.userinfo = response.data;
          })
          .catch(err => {
            console.log;
          });
      }
    }
  };
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  @import "~assets/variables.scss";

  .header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 0 20px;
    line-height: 50px;
    background: $theme_color;
    color: white;
    font-size: 18px;
    height: 40px;
    letter-spacing: 2px;
    position: absolute;
    top: 0;
    width: 100%;
    z-index: 3;

    .title {
      position: absolute;
      left: 0;
      right: 0;
      height: 40px;
      line-height: 40px;
      text-align: center;
    }

    .face {
      display: inline-block;
      width: 38px;
      height: 38px;
      padding: 1px;
      border-radius: 50%;
      margin: auto 0;
      cursor: pointer;
      z-index: 3;
    }

  }
</style>
