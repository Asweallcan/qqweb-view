
<template>
  <div class="wrapper">
    <div @click.prevent="back" class="backbtn">返回</div>
    <div @click.prevent="scrollToTop" class="chat-header">
      {{userinfo.nickname}}
    </div>
    <div id="chatWrapper" class="chat-wrapper">
      <scroll :data="messages" ref="scroll" :probeType="probeType" class="chat-content">
        <ul id="ul" class="chat-messages">
          <li :key="message.id" v-for="message in messages" class="message-wrapper">
            <div
              :class="{'message-box-right':message.from_user==user.qq,'message-box-left':message.from_user!=user.qq}">
              <img @click.prevent.stop="toProfile(message.from_user)" class="avatar"
                   :src="'/api/avatar/'+message.from_user_avatar" alt="">
              <div class="text">
                <p class="message">
                  {{message.message}}
                </p>
              </div>
            </div>
          </li>
        </ul>
      </scroll>
    </div>
    <div class="chat-footer">
      <input @keyup.enter="sendOne()" v-model="myMessage" class="chat-input"></input>
      <a @click="sendOne()" class="chat-send" :class="{'grey':myMessage.length<1}">发送</a>
    </div>
  </div>
</template>

<script>
  import Scroll from "base/Scroll/Scroll.vue";
  import axios from "axios";
  import {mapGetters} from "vuex";

  export default {
    data() {
      return {
        myMessage: "",
        messages: [],
        userinfo: {}
      };
    },
    created() {
      this.listenScroll = true;
      this.probeType = 3;
    },
    mounted() {
      this.$nextTick(() => {
        socket.on("privateMessage", msg => {
          if (
            (msg.to_user === this.user.qq && msg.from_user === this.userinfo.qq) ||
            (msg.from_user === this.user.qq && msg.to_user === this.userinfo.qq)
          ) {
            this.messages.push(msg);
          }
        });
        this.initChat();
      });
    },
    activated() {
      this.$nextTick(() => {
        this.initChat()
        this.updateMessage()
        this.updateMessageList()
      })
    },
    computed: {
      ...mapGetters(["user"])
    },
    components: {
      Scroll
    },
    methods: {
      back() {
        this.$router.push("/message");
      },
      initChat() {
        axios
          .get("/api/getprivatemessage", {
            params: {qq_1: this.user.qq, qq_2: this.$route.params.qq}
          })
          .then(response => {
            this.messages = response.data || [];
            console.log(response.data);
          })
          .catch(err => {
            console.log(err);
          });
        axios
          .get("/api/getprofile", {params: {qq: this.$route.params.qq}})
          .then(response => {
            this.userinfo = response.data;
          })
          .catch(err => {
            console.log(err);
          });
        this.scrollToBottom()
      },
      sendOne() {
        if (this.myMessage.length < 1) {
          return;
        }
        let message = {
          from_user: this.user.qq,
          to_user: this.$route.params.qq,
          message: this.myMessage,
          time: Date.parse(new Date()) / 1000,
          from_user_avatar: this.user.avatar,
          from_user_nickname: this.user.nickname,
          isread: 0
        };
        socket.emit("sendPrivateMessage", message);
        let msg = {
          to_user: this.user.qq,
          from_user: this.$route.params.qq,
          message: this.myMessage,
          time: Date.parse(new Date()) / 1000,
          from_user_avatar: this.userinfo.avatar,
          from_user_nickname: this.userinfo.nickname,
          isread: 1
        };
        let result = JSON.parse(localStorage.messageList || "{}");
        if (!(msg.from_user in result)) {
          result[msg.from_user] = [];
        }
        console.log(result[msg.from_user]);
        result[msg.from_user].push(msg);
        localStorage.messageList = JSON.stringify(result);
        this.myMessage = "";
      },
      toProfile(qq) {
        this.$router.push(`/profile/${qq}`);
      },
      updateMessage() {
        axios
          .get("/api/updatemessage", {
            params: {to_user: this.user.qq, from_user: this.$route.params.qq}
          })
          .then(response => {
          })
          .catch(err => {
            console.log(err);
          });
      },
      updateMessageList() {
        let result = JSON.parse(localStorage.messageList || "{}");
        if (!(this.userinfo.qq in result)) {
          result[this.userinfo.qq] = [];
          return
        }
        result[this.userinfo.qq].forEach((element, index, input) => {
          input[index].isread = 1;
        });
        localStorage.messageList = JSON.stringify(result);
      },
      scrollToBottom() {
        if (!document.getElementById("chatWrapper")) {
          return
        }
        let chatWrapperHeight = document.getElementById("chatWrapper")
          .clientHeight;
        let ulHeight = document.getElementById("ul").clientHeight;
        if (ulHeight < chatWrapperHeight) {
          return;
        }
        let distance = chatWrapperHeight - ulHeight;
        this.$refs.scroll.scrollTo(0, distance);
      },
      scrollToTop() {
        this.$refs.scroll.scrollTo(0, 0, 200);
      }
    },
    watch: {
      messages() {
        this.$nextTick(() => {
          this.scrollToBottom();
        });
      },
      userinfo(newinfo) {
        if (!newinfo) {
          return
        }
        this.updateMessageList()
      }
    }
  };
</script>

<style lang="scss" scoped>
  @import "~assets/variables.scss";

  .wrapper {
    background: #eee;
    .backbtn {
      position: absolute;
      z-index: 20;
      left: 10px;
      top: 8px;
      color: white;
    }
    .chat-header {
      position: absolute;
      top: 0;
      width: 100%;
      background: $theme_color;
      height: 40px;
      text-align: center;
      line-height: 40px;
      font-size: 19px;
      color: #fff;
    }
    .chat-wrapper {
      position: fixed;
      width: 100%;
      top: 40px;
      background: #eee;
      bottom: 40px;
      .chat-content {
        overflow: hidden;
        height: 100%;
        .chat-messages {
          width: 100%;
          padding: 10px;
          .message-wrapper {
            width: 100%;
            margin-bottom: 15px;
            .message-box-left {
              position: relative;
              .avatar {
                width: 40px;
                height: 40px;
                border-radius: 50%;
                position: absolute;
                z-index: 10;
                left: 0;
              }
              .text {
                width: 100%;
                float: left;
                padding-left: 45px;
                .message {
                  background: #fff;
                  padding: 8px;
                  border-radius: 10px;
                  word-wrap: break-word;
                  display: inline-block;
                  max-width: 80%;
                }
              }
              &::after {
                content: "\0020";
                display: block;
                height: 0;
                clear: both;
              }
            }
            .message-box-right {
              position: relative;
              .avatar {
                width: 40px;
                height: 40px;
                border-radius: 50%;
                position: absolute;
                right: 0;
                z-index: 10;
              }
              .text {
                position: relative;
                display: block;
                width: 100%;
                float: right;
                text-align: left;
                padding-right: 45px;
                right: 0;
                color: #fff;
                .message {
                  background: $theme_color;
                  padding: 8px;
                  border-radius: 10px;
                  word-wrap: break-word;
                  max-width: 80%;
                  float: right;
                }
              }
              &::after {
                content: "\0020";
                display: block;
                height: 0;
                clear: both;
              }
            }
          }
        }
      }
    }
    .chat-footer {
      width: 100%;
      position: absolute;
      bottom: 0;
      height: 40px;
      background: #eee;
      padding: 5px;
      input {
        display: block;
        width: 85%;
        height: 30px;
        outline: none;
        border-radius: 8px;
        padding: 8px;
        font-size: 15px;
        line-height: 15px;
        background: #fff;
        border-bottom: none;
      }
      .chat-send {
        width: 15%;
        position: absolute;
        right: 0;
        bottom: 5px;
        height: 30px;
        background: $theme_color;
        border-radius: 8px;
        text-align: center;
        color: #fff;
        line-height: 30px;
      }
    }
  }

  .grey {
    background: #ccc !important;
  }
</style>
