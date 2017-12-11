<template>
  <!--  主页面底部 -->
  <div class="footer">
    <div class="item" @click.prevent="$router.push('/message')">
      <img :src="currentTab==1 ? iconUrl.message_selected:iconUrl.message">
      <span :class="{'blue':currentTab==1}">消息</span>
      <span v-show="count>0" class="message">{{count<100?count:"99+"}}</span>
    </div>
    <div class="item" @click.prevent="$router.push('/friend')">
      <img :src="currentTab==2 ? iconUrl.person_selected:iconUrl.person">
      <span :class="{'blue':currentTab==2}">联系人</span>
    </div>
    <div class="item" @click.prevent="$router.push('/about')">
      <img :src="currentTab==3 ? iconUrl.social_selected:iconUrl.social">
      <span :class="{'blue':currentTab==3}">关于</span>
    </div>
  </div>
</template>

<script>
  import axios from "axios";
  import {mapGetters} from "vuex";

  export default {
    name: "footer",
    props: ["currentTab"],
    mounted() {
      this.$nextTick(() => {
        this.initFooter()
        socket.on("privateMessage", msg => {
          if (msg.to_user === this.user.qq) {
            this.count++;
          }
          if (msg.from_user === this.user.qq) {
            return
          }
          this.$emit("messages", msg);
        });
      })
    },
    activated() {
      axios.get("/api/getunread", {params: {qq: this.user.qq}}).then(response => {
        this.message = response.data || []
        this.count = response.data.length
      })
    },
    methods: {
      initFooter() {
        axios.get("/api/getunread", {params: {qq: this.user.qq}}).then(response => {
          this.messages = response.data || [];
          this.count = response.data.length;
          this.$emit("messages", this.messages);
        });
      }
    },
    data() {
      return {
        iconUrl: {
          message_selected: require("./message_selected.png"),
          message: require("./message.png"),
          person_selected: require("./person_selected.png"),
          person: require("./person.png"),
          social_selected: require("./social_selected.png"),
          social: require("./social.png")
        },
        count: 0,
        messages: [],
        newMessage: {}
      };
    },
    computed: {
      ...mapGetters(["user"])
    }
  };
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  @import "~assets/variables.scss";

  .footer {
    position: absolute;
    bottom: 0;
    width: 100%;
    z-index: 3;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    height: 50px;
    color: #666;
    background: #fff;
    border-top: 1px solid #eee;
    .item {
      margin: 0 auto;
      text-align: center;
      position: relative;
      cursor: pointer;
      img {
        transform: scale(0.3);
        display: block;
        position: relative;
        bottom: 26px;
      }
      span {
        position: relative;
        bottom: 60px;
        font-size: 10px;
        &.blue {
          color: $theme_color;
        }
      }
      .message {
        display: inline-block;
        padding: 3px;
        height: 15px;
        background: #ff0000;
        display: block;
        position: absolute;
        border-radius: 50%;
        top: 5%;
        right: 20%;
        text-align: center;
        font-size: 10px;
        line-height: 8px;
        color: #fff;
      }
    }
    a {
      color: #666;
    }
  }
</style>
