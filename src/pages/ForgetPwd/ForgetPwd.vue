
<template>
  <div class="wrapper">
    <div class="back" @click.prevent="back">返回</div>
    <div class="resetpwd">
      <h3 class="resetpwd_title">找回密码</h3>
      <form ref="resetpwd_from" class="resetpwd_form">
        <p>
          <input v-model="qq" class="resetpwd_form_qq" type="number" placeholder="QQ账号">
          <a @click.prevent="getQues" class="resetpwd_form_btn validate">验证QQ号</a>
        </p>
        <input readonly v-model="response.data" type="text" placeholder="密保问题">
        <input type="text" v-model="answer" placeholder="密保答案">
        <input type="password" v-model="newpwd" placeholder="新密码">
        <a @click.prevent="resetpwd" class="resetpwd_form_btn">重置密码</a>
      </form>
    </div>
    <loading :show="showloading"></loading>
    <alert @on-hide="onHide" :content="alert" :value="showAlert"></alert>
  </div>
</template>

<script>
import { Alert, Loading } from "vux";
import axios from "axios";
export default {
    data() {
        return {
            alert: "",
            showAlert: false,
            response: "",
            qq: "",
            answer: "",
            newpwd: "",
            showloading: false
        };
    },
    methods: {
        onHide() {
            this.showAlert = false;
        },
        getQues() {
            this.showloading = true;
            if (!this.validation(this.qq)) {
                this.handleRes("QQ号不能为空");
                return;
            }
            axios
                .get("/api/getques", {
                    params: {
                        qq: this.qq
                    }
                })
                .then(response => {
                    if (response.data == "-1") {
                        this.handleRes("QQ号不存在");
                        return;
                    }
                    if (response.data == "-2") {
                        this.handleRes("服务器错误");
                        return;
                    }
                    this.response = response;
                    this.showloading = false;
                })
                .catch(err => {
                    console.log(err);
                });
        },
        resetpwd() {
            this.showloading = true;
            if (!this.validation(this.qq)) {
                this.handleRes("QQ号不能为空");
                return;
            }
            if (!this.validation(this.answer) || !this.validation(this.newpwd)) {
                this.handleRes("密保答案或者新密码不能为空");
                return;
            }
            axios
                .post("/api/setnewpwd", {
                    qq: this.qq,
                    answer: this.answer,
                    newpwd: this.newpwd
                })
                .then(response => {
                    if (response.data == "-1") {
                        this.handleRes("密保问题回答错误");
                        return;
                    }
                    if (response.data == "-2") {
                        this.handleRes("服务器错误");
                        return;
                    }
                    this.handleRes("修改成功");
                    this.clearForm();
                    var that = this;
                    setTimeout(function() {
                        that.showAlert = false;
                        that.$router.push("/login");
                    }, 2000);
                })
                .catch(err => {
                    console.log(err);
                });
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
            this.answer = "";
            this.newpwd = "";
        },
        handleRes(alert) {
            this.showloading = false;
            this.alert = alert;
            this.showAlert = true;
        },
        back(){
            this.$router.go(-1)
        }
    },
    components: {
        Alert,
        Loading
    },
    mounted(){

    }
};
</script>

<style lang="scss" scoped>
@import "~assets/variables.scss";
.wrapper {
    background:#eee;
    background-size: cover;
    .resetpwd {
        padding: 10px;
        .resetpwd_title {
            margin-bottom: 15px;
            color: $text_color;
        }
        .resetpwd_form {
            .resetpwd_form_qq {
                display: inline;
            }
            .resetpwd_form_btn {
                display: inline-block;
                width: 100%;
                background: $attention_text;
                color: #eee;
                border-radius: 5px;
                padding: 10px;
                font-size: 14px;
                margin-bottom: 15px;
            }
        }
    }
}
</style>
