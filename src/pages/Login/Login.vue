
<template>
  <div class="wrapper">
    <div class="login">
      <h3 class="login_title">QQ
        <mark>乞丐版</mark>
      </h3>
      <form class="login_form">
        <input v-model="qq" class="input username" name="username" type="text" placeholder="QQ账号">
        <input v-model="pwd" class="input password" name="password" type="password" placeholder="密码">
      </form>
      <footer class="login_footer">
        <a @touchstart.prevent="login" class="login_footer_loginbtn">登陆</a>
        <router-link to="/forgetpwd" class="login_footer_forgetpassword">忘记密码？</router-link>
        <router-link to="/regist" class="login_footer_regist">新用户注册</router-link>
      </footer>
    </div>
    <footer class="footer">
      登陆即代表阅读并同意
      <router-link to="/login/serviceterm">服务条款</router-link>
    </footer>
    <loading :show="showloading"></loading>
    <alert @on-hide="onHide" title="提示" :content="alert" :value="showAlert" hide-on-blur></alert>
  </div>
</template>

<script>
import { Alert, Loading } from "vux";
import { mapMutations } from "vuex";
import axios from "axios";
export default {
    data() {
        return {
            qq: "",
            pwd: "",
            showloading: false,
            showAlert: false,
            response: "",
            alert: ""
        };
    },
    created() {
        localStorage.user = ""
        localStorage.login = ""
        localStorage.weather = ""
    },
    components: {
        Alert,
        Loading
    },
    methods: {
        login() {
            this.showloading = true;
            if (!this.validation(this.qq) || !this.validation(this.pwd)) {
                this.handleRes("QQ号或密码不能为空");
                return;
            }
            axios
                .post("/api/dologin", { qq: this.qq, password: this.pwd })
                .then(response => {
                    if (response.data == "-1") {
                        this.handleRes("QQ号错误");
                        return;
                    }
                    if (response.data == "-2") {
                        this.handleRes("密码错误");
                        return;
                    }
                    this.showloading = false;
                    this.setLogin(response.data);
                    this.getWeather();
                    this.clearForm();
                    this.$router.push("/message");
                })
                .catch(err => {
                    console.log(err);
                });
        },
        onHide() {
            this.showAlert = false;
        },
        validation(sth) {
            if (!sth.length > 0) {
                return false;
            }
            return true;
        },
        clearForm() {
            this.response = "";
            this.qq = "";
            this.pwd = "";
            this.alert = "";
        },
        handleRes(alert) {
            this.showloading = false;
            this.alert = alert;
            this.showAlert = true;
        },
        ...mapMutations({
            setLogin: "SET_LOGIN",
            setWeather: "SET_WEATHER"
        }),
        getWeather() {
            this.setWeather();
        }
    },
    computed: {}
};
</script>

<style lang="scss" scoped>
@import "~assets/variables.scss";
@import "~assets/cards.scss";
.wrapper {
    background: url("~assets/background.jpg") no-repeat center center;
    background-size: cover;
    .weather {
        position: absolute;
        top: 20%;
        left: 50%;
        width: 200px;
        height: 260px;
        transform: translate(-50%, -50%);
        text-align: center;
        font-size: 200%;
        color: #fff;
        border-radius: 5px;
    }
    .login {
        color: $text_color;
        width: 60%;
        height: 50%;
        position: absolute;
        left: 50%;
        top: 50%;
        margin: -20% 0 0 -30%;
        text-align: center;
        input{
            color:#fff;
        }
        .login_title {
            text-align: left;
            margin-bottom: 10px;
            color: #fff;
            mark {
                color: #fff;
                font-size: 10px !important;
                background: none;
                margin-left: 3px;
                letter-spacing: 2px;
            }
        }
        .login_footer {
            .login_footer_loginbtn {
                display: block;
                width: 100%;
                margin-bottom: 10px;
                background: $attention_text;
                border-radius: 6px;
                letter-spacing: 3px;
                color: #eee;
                border: none;
                padding: 3px;
                padding: 10px;
            }
            .login_footer_forgetpassword {
                font-size: 12px;
                float: left;
                color: #fff;
            }
            .login_footer_regist {
                font-size: 12px;
                float: right;
                color: #fff;
            }
        }
    }
    .footer {
        display: block;
        position: absolute;
        margin: 0 auto;
        text-align: center;
        width: 100%;
        bottom: 0;
        font-size: 14px;
        color: #fff;
        a {
            font-size: 14px;
            background: none;
            color: $theme_color;
        }
    }
}
</style>
