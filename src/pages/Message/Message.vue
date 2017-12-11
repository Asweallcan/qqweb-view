
<template>
  <div @touchstart="touchstart" @touchmove="touchmove" class="wrapper">
    <side-menu :open="open"></side-menu>
    <v-header @openSideMenu="openSideMenu" currentTab="1"></v-header>
    <div class="list-wrapper">
      <scroll class="list-content">
        <ul>
          <li @click="toChatOne(item[0].from_user)" :key="index" v-for="(item,index) in messageList" class="friend">
            <div class="info">
              <img class="face" :src="'/api/avatar/'+item[0].from_user_avatar" alt="">
              <p class="info-text user-nickname">{{item[0].from_user_nickname}}</p>
              <p class="info-text user-signature">{{item[item.length-1].message}}</p>
              <span v-show="showUnread(item)" class="message">{{unreadNum(item)}}</span>
            </div>
          </li>
        </ul>
      </scroll>
    </div>
    <v-footer @messages="getMessages" currentTab="1"></v-footer>
  </div>
</template>

<script>
  import VFooter from "pages/Common/Footer/Footer.vue";
  import VHeader from "pages/Common/Header/Header.vue";
  import Scroll from "base/Scroll/Scroll.vue";
  import SideMenu from "pages/Common/SideMenu/SideMenu.vue";
  import {mapGetters} from 'vuex'
  import axios from "axios";

  export default {
    data() {
      return {
        startX: 0,
        startY: 0,
        endX: 0,
        endY: 0,
        distanceX: 0,
        distanceY: 0,
        open: "",
        messageList: {}
      };
    },
    computed: {
      ...mapGetters(["user"]),
    },
    components: {
      VFooter,
      VHeader,
      Scroll,
      SideMenu
    },
    mounted() {
      this.initMessage()
    },
    activated() {
      this.initMessage()
    },
    methods: {
      getMessages(messages) {
        let result = JSON.parse(localStorage.messageList || "{}");
        if (messages instanceof Array) {
          messages.forEach(element => {
            if (!(element.from_user in result)) {
              result[element.from_user] = [];
            }
            result[element.from_user].push(element);
          });
        } else {
          if (!(messages.from_user in result)) {
            result[messages.from_user] = [];
          }
          if (messages.from_user === this.user.qq) {
            return
          }
          result[messages.from_user].push(messages);
        }
        localStorage.messageList = JSON.stringify(result);
        this.messageList = result;
      },
      initMessage() {
        var result = JSON.parse(localStorage.messageList || "{}");
        this.messageList = result;
      },
      unreadNum(item) {
        var length = item.filter(el => {
          return el.isread === 0;
        }).length;
        return length > 99 ? "99+" : length;
      },
      showUnread(item) {
        var length = item.filter(el => {
          return el.isread === 0;
        }).length;
        return length > 0;
      },
      touchstart(e) {
        this.startX = e.touches[0].pageX;
        this.startY = e.touches[0].pageY;
      },
      toChatOne(qq) {
        this.$router.push("/chatone/" + qq);
      },
      touchmove(e) {
        this.endX = e.touches[0].pageX;
        this.endY = e.touches[0].pageY;
        this.distanceX = this.endX - this.startX;
        this.distanceY = this.endY - this.startY;
      },
      openSideMenu() {
        this.open = "open";
      }
    },
    watch: {
      distanceX(newX) {
        if (Math.abs(newX) > Math.abs(this.distanceY) && newX > 100) {
          this.open = "open";
        } else if (Math.abs(newX) > Math.abs(this.distanceY) && newX < -100) {
          this.open = "";
        }
      }
    }
  };
</script>

<style lang="scss" scoped>
  .wrapper {
    background: #eee;
    .list-wrapper {
      position: fixed;
      width: 100%;
      top: 40px;
      bottom: 50px;
      .list-content {
        overflow: hidden;
        height: 100%;
        ul {
          width: 100%;
        }
        .friend {
          display: inline-block;
          width: 100%;
          border-bottom: 1px solid #eee;
          height: 45px;
          white-space: nowrap;
          margin: 5px 0;
          .info {
            width: 100%;
            padding: 0 10px;
            position: relative;
            .face {
              width: 40px;
              height: 40px;
              border-radius: 50%;
              float: left;
            }
            .info-text {
              padding: 0 0 0 10px;
              text-overflow: ellipsis;
              overflow: hidden;
            }
            .user-nickname {
              font-size: 16px;
              line-height: 20px;
            }
            .user-signature {
              color: #666;
              font-size: 13px;
              line-height: 20px;
            }
            &::after {
              content: " ";
              clear: both;
              width: 0;
              height: 0;
              position: absolute;
            }
            .message {
              display: inline-block;
              padding: 3px;
              height: 15px;
              background: #ff0000;
              display: block;
              position: absolute;
              border-radius: 50%;
              top: 10px;
              right: 20px;
              text-align: center;
              font-size: 10px;
              line-height: 8px;
              color: #fff;
            }
          }
        }
      }
    }
  }
</style>
