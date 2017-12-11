
<template>
 <div class="wrapper">
    <div @click.prevent="back" class="backbtn">返回</div>
    <div @click.prevent="scrollToTop"  class="chat-header">
      ZY1501
    </div>
    <div id="chatWrapper" class="chat-wrapper">
      <scroll :data="messages" ref="scroll" :probeType="probeType" class="chat-content">
        <ul id="ul"  class="chat-messages">
          <li :key="message.id" v-for="message in messages" class="message-wrapper">
            <div :class="{'message-box-right':message.from_user==user.qq,'message-box-left':message.from_user!=user.qq}">
              <img @click.prevent.stop="toProfile(message.from_user)" class="avatar" :src="'/api/avatar/'+message.avatar" alt="">
              <div class="text">
              <p class="username">{{message.nickname}}</p>
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
      <input @keyup.enter="sendGroup()" v-model="myMessage" class="chat-input"></input>
      <a @click="sendGroup()"  class="chat-send" :class="{'grey':myMessage.length<1}">发送</a>
    </div>
  </div>
</template>

<script>
import Scroll from "base/Scroll/Scroll.vue";
import axios from "axios";
import { mapGetters } from "vuex";
export default {
    data() {
        return {
            myMessage: "",
            messages: []
        };
    },
    created() {
        this.listenScroll = true;
        this.probeType = 3;
    },
    mounted() {
        socket.on("groupMessage", msg => {
            this.messages.push(msg);
        });
        axios.get("/api/getgroupmessage").then(response => {
            this.messages = response.data || [];
        });
    },
    computed: {
        ...mapGetters(["user"])
    },
    components: {
        Scroll
    },
    methods: {
        back() {
            this.$router.go(-1);
        },
        sendGroup() {
            if (this.myMessage.length < 1) {
                return;
            }
            let message = {
                from_user: this.user.qq,
                message: this.myMessage,
                time:Date.parse(new Date())/1000,
                avatar : this.user.avatar,
                nickname : this.user.nickname
            };
            socket.emit("sendGroupMessage", message);
            this.myMessage = "";
        },
        toProfile(qq) {
            this.$router.push(`/profile/${qq}`);
        },
        scrollToBottom() {
            let chatWrapperHeight = document.getElementById("chatWrapper").clientHeight;
            let ulHeight = document.getElementById("ul").clientHeight;
            let distance = chatWrapperHeight - ulHeight;
            if(distance>0){return}
            this.$refs.scroll.scrollTo(0, distance);
        },
        scrollToTop() {
            this.$refs.scroll.scrollTo(0, 0);
        }
    },
    watch: {
        messages() {
            this.$nextTick(() => {
                this.scrollToBottom();
            });
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
                            .username {
                                margin-bottom: 6px;
                                color: #333;
                            }
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
                            .username {
                                text-align: right;
                                margin-bottom: 6px;
                                color: #333;
                            }
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
