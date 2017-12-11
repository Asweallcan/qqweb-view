
<template>
  <div @touchstart="touchstart" @touchmove="touchmove" class="wrapper">
    <v-header @openSideMenu="openSideMenu" currentTab="2"></v-header>
    <div class="friends-wrapper">
      <scroll :data="friendList" :probeType=2 class="friends-content">
        <ul>

          <div class="friends-tab">群聊</div>
          <li @click="toChatGroup" class="friend">
            <div class="info">
              <img class="face" :src="'/api/avatar/avatar.jpg'" alt="">
              <p class="info-text user-nickname">zy1501</p>
              <p class="info-text user-signature">这是软件工程zy1501的群</p>
            </div>
          </li>

          <div class="friends-tab">好友</div>
          <li @click="showProfile(friend.qq)" :key="index" v-for="(friend,index) in friendList" class="friend">
            <div class="info">
              <img class="face" :src="'/api/avatar/'+friend.avatar" alt="">
              <p class="info-text user-nickname">{{friend.nickname}}</p>
              <p class="info-text user-signature">{{friend.signature}}</p>
            </div>
          </li>
        </ul>
      </scroll>
    </div>
    <side-menu :open="open"></side-menu>
    <v-footer currentTab="2"></v-footer>
  </div>
</template>

<script>
import VFooter from "pages/Common/Footer/Footer.vue";
import VHeader from "pages/Common/Header/Header.vue";
import Scroll from "base/Scroll/Scroll.vue";
import SideMenu from "pages/Common/SideMenu/SideMenu.vue";
import { mapGetters } from "vuex";
import axios from "axios";
export default {
    components: {
        VFooter,
        VHeader,
        Scroll,
        SideMenu
    },
    data() {
        return {
            friendList: [],
            startX: 0,
            startY: 0,
            endX: 0,
            endY: 0,
            distanceX: 0,
            distanceY: 0,
            open: ""
        };
    },
    computed: {
        ...mapGetters(["login", "user"])
    },
    created() {
        this._getFriendList();
    },
    methods: {
        _getFriendList() {
            axios
                .get("/api/getfriends")
                .then(response => {
                    this.friendList = response.data.filter(element => {
                        return element.qq != this.user.qq;
                    });
                })
                .catch(err => {
                    console.log(err);
                });
        },
        showProfile(qq) {
            this.$router.push("/profile/" + qq);
        },
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
        toChatGroup(){
            this.$router.push("/chatgroup")
        },
        openSideMenu() {
            this.open = "open";
        }
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
}

.friends-wrapper {
    position: fixed;
    width: 100%;
    top: 40px;
    bottom: 40px;
    .friends-tab {
        width: 100%;
        height: 30px;
        background: #ccc;
        line-height: 30px;
        text-indent: 10px;
    }
    .friends-content {
        height: 100%;
        overflow: hidden;
        ul {
            width: 100%;
        }
        .friend {
            display: inline-block;
            width: 100%;
            border-bottom: 1px solid#eee;
            height: 45px;
            white-space: nowrap;
            margin: 5px 0;
            .info {
                width: 100%;
                padding: 0 10px;
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
            }
        }
    }
}
</style>
