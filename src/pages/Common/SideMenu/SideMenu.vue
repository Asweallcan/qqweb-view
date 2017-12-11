<template>
  <div class="wrapper" :class="open">
    <div class="sidemenu">
      <div :style="style" @click.prevent="toProfile()" class="sidemenu-top">
        <div class="box">
          <img v-if="userinfo.avatar" class="face" :src="'/api/avatar/'+userinfo.avatar" alt="">
          <span class="nickname">{{userinfo.nickname}}</span>
        </div>
        <p class="signature">{{userinfo.signature}}</p>
      </div>
      <div class="sidemenu-weather">
        <div class="weather">
          <div :class="weather.weather"></div>
          <p class="weather-info">{{weather.info}}</p>
          <div class="place">湖北 武汉</div>
        </div>
      </div>
      <div class="sidemenu-bottom">
        <div @click.prevent="toSetting()" class="settingbtn">设置个人信息</div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import axios from "axios";
export default {
    props: {
        open: {
            type: String,
            default: ""
        }
    },
    data() {
        return {
            userinfo: {}
        };
    },
    mounted() {
        this.getProfile();
    },
    methods: {
        toProfile() {
            this.$router.push("/profile/" + this.user.qq);
        },
        toSetting() {
            this.$router.push("/setting");
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
    },
    computed: {
        style() {
            return `background:url("/api/background/${this.user.background}") no-repeat center center;background-size:cover`;
        },
        ...mapGetters(["weather","user"])
    }
};
</script>

<style lang="scss" scoped>
@import "~assets/variables.scss";
@import "~assets/cards.scss";
.wrapper {
    width: 100%;
    height: 100%;
    position: absolute;
    transform: translate3d(-100%, 0, 0);
    z-index: 4;
    transition: all 0.4s ease-in-out;
    &.open {
        transform: translate3d(0, 0, 0);
        background: rgba(0, 0, 0, 0.3);
    }
    .sidemenu {
        width: 80%;
        height: 100%;
        position: relative;
        .sidemenu-top {
            height: 30%;
            position: relative;
            color: #fff;
            .box {
                position: absolute;
                height: 50px;
                bottom: 30px;
                width: 100%;
                .face {
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                    border: 2px solid#fff;
                    margin-right: 3px;
                    vertical-align: middle;
                    margin-bottom: 5px;
                    margin-left: 20px;
                }
                .nickname {
                    font-size: 25px;
                    line-height: 50px;
                    width: 80%;
                }
            }
            .signature {
                position: absolute;
                bottom: 10px;
                width: 100%;
                text-indent: 70px;
                font-size: 15px;
                white-space: nowrap;
                text-overflow: ellipsis;
                overflow: hidden;
            }
        }
        .sidemenu-weather {
            position: absolute;
            top: 30%;
            width: 100%;
            height: 65%;
            background: #bbb;
            .weather {
                position: absolute;
                width: 200px;
                height: 290px;
                top: 0;
                left: 0;
                bottom: 0px;
                right: 0;
                margin: auto;
                text-align: center;
                font-size: 200%;
                color: #333;
                border-radius: 50px;
                .weather-info {
                    position: absolute;
                    bottom: 0;
                    width: 100%;
                    font-size: 25px;
                }
            }
        }
        .sidemenu-bottom {
            width: 100%;
            position: absolute;
            height: 5%;
            bottom: 0;
            background: $theme_color;
            color: #eee;
            .settingbtn {
                position: absolute;
                top: 0;
                left: 0;
                bottom: 0;
                right: 0;
                margin: auto;
                display: -webkit-box;
                -webkit-box-pack: center;
                -webkit-box-align: center;
            }
        }
    }
}
</style>
