<template>
  <div class="wrapper">
    <div @click.prevent="back" class="backbtn">返回</div>
    <div class="setting-wrapper">
      <scroll ref="scroll" class="setting-content">
        <form enctype="multipart/form-data" action="/api/dosetting" method="post" class="setting-form">
          <span @click.prevent="test" class="avatar">选择头像</span>
          <div class="container container-face">
            <label for="avatar">
              <img :src="face" class="face-previewer"></img>
            </label>
          </div>
          <span class="background">选择背景</span>
          <div class="container container-background">
            <label for="background">
              <img :src="background" class="background-previewer"></img>
            </label>
          </div>
          <input @change="avatarfile" name="avatar" style="display:none" id="avatar" type="file" placeholder="选择头像">
          <input @change="backgroundfile" name="background" style="display:none" id="background" type="file"
                 placeholder="选择个人主页背景">
          <span>昵称</span>
          <input v-model="userinfo.nickname" name="nickname" type="text" placeholder="昵称">
          <span>个性签名</span>
          <input v-model="userinfo.signature" name="signature" type="text" placeholder="个性签名">
          <span>年龄</span>
          <input v-model="userinfo.age" name="age" type="number" placeholder="年龄">
          <span>居住地</span>
          <input v-model="userinfo.place" name="place" type="text" placeholder="居住地">
          <span>密保问题</span>
          <input v-model="userinfo.question" name="question" type="text" placeholder="密保问题">
          <span>密保问题答案</span>
          <input v-model="userinfo.answer" name="answer" type="text" placeholder="密保问题答案">
          <input type="submit" class="setting_btn">
        </form>
      </scroll>
    </div>
  </div>
</template>

<script>
  import Scroll from "base/Scroll/Scroll.vue";
  import {mapGetters, mapMutations} from "vuex";
  import axios from "axios";

  export default {
    data() {
      return {
        face: "",
        background: "",
        userinfo: {}
      };
    },
    components: {
      Scroll
    },
    activated() {
      this.getProfile();
      this.$nextTick(() => {
        this.$refs.scroll.refresh();
        this.face = "/api/avatar/" + this.user.avatar;
        this.background = "/api/background/" + this.user.background;
      });
    },
    mounted() {
      this.getProfile();
      this.$nextTick(() => {
        this.$refs.scroll.refresh();
        this.face = "/api/avatar/" + this.user.avatar;
        this.background = "/api/background/" + this.user.background;
      });
    },
    methods: {
      back() {
        this.$router.go(-1);
      },
      test() {
        console.log(this.user);
      },
      avatarfile(source) {
        var file = source.target.files[0];
        var reader = new FileReader();
        reader.addEventListener("load", () => {
          this.face = reader.result;
        });
        reader.readAsDataURL(file);
      },
      backgroundfile(source) {
        var file = source.target.files[0];
        var reader = new FileReader();
        reader.addEventListener("load", () => {
          this.background = reader.result;
        });
        reader.readAsDataURL(file);
      },
      getProfile() {
        axios
          .get("/api/getprofile", {
            params: {
              qq: this.user.qq
            }
          })
          .then(response => {
            console.log(response.data);
            this.userinfo = response.data;
          })
          .catch(err => {
            console.log;
          });
      }
    },
    computed: {
      ...mapGetters(["user"])
    },
    watch: {
      user(newuser) {
        this.userinfo = newuser;
      }
    }
  };
</script>

<style lang="scss" scoped>
  @import "~assets/variables.scss";

  .wrapper {
    background: #eee;
    background-size: cover;
    color: #888;
    font-size: 14px;
    .backbtn {
      position: absolute;
      z-index: 20;
      left: 10px;
      top: 10px;
      color: #333;
      font-size: 16px;
    }
    .setting-wrapper {
      position: fixed;
      width: 100%;
      top: 30px;
      bottom: 0;
      padding: 20px;
      .setting-content {
        height: 100%;
        overflow: hidden;
        .setting-form {
          input {
            color: #333;
          }
        }
        .container {
          width: 100%;
          text-align: center;
          margin-bottom: 15px;
          .face-previewer {
            width: 100px;
            height: 100px;
            margin: 0 auto;
            border-radius: 50%;
          }
          .background-previewer {
            width: 100%;
            height: auto;
            margin: 0 auto;
          }
        }
        .selector {
          display: block;
          margin-bottom: 13px;
          border-bottom: 1px solid #333;
          color: #777;
          font-size: 14px;
          select {
            border: none;
            background: none;
            outline: none;
          }
        }
        .setting_btn {
          display: inline-block;
          width: 100%;
          background: $theme_color;
          color: #eee !important;
          border-radius: 5px;
          font-size: 14px;
          padding: 10px;
          letter-spacing: 1px;
          border: none;
        }
      }
    }
  }
</style>
