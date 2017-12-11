
<template>
  <div class="wrapper">
    <div class="back" @click.prevent="back">返回</div>
    <div class="regist">
      <h3 class="regist_title">
        欢迎注册
      </h3>
      <form class="regist_form">
        <input v-model="formdata.qq" type="number" placeholder="QQ号">
        <input v-model="formdata.password" type="password" placeholder="密码">
        <div class="selector">
          性别
          <select v-model="formdata.sex" name="sex">
            <option value="male">男</option>
            <option value="female">女</option>
          </select>
        </div>
        <input v-model="formdata.age" type="number" placeholder="年龄">
        <input v-model="formdata.nickname" type="text" placeholder="昵称">
        <input v-model="formdata.question" type="text" placeholder="密保问题">
        <input v-model="formdata.answer" type="text" placeholder="密保答案">
        <mark>请尽量完成以下信息</mark>
        <input v-model="formdata.signature" type="text" placeholder="个性签名">
        <input v-model="formdata.place" type="text" placeholder="居住地">
        <a @click.prevent="regist()" class="regist_btn">注册</a>
      </form>
    </div>
    <loading :show="showloading"></loading>
    <alert @on-hide="onHide" title="提示" :content="alert" :value="showAlert" hide-on-blur></alert>
  </div>
</template>

<script>
import axios from "axios";
import { Alert, Loading } from "vux";
export default {
    data() {
        return {
            formdata: {
                qq: "",
                password: "",
                question: "",
                answer: "",
                nickname: "",
                sex: "",
                place: "",
                signature: "",
                age: ""
            },
            response: "",
            alert: "",
            showAlert: false,
            showloading: false
        };
    },
    methods: {
        regist() {
            this.showloading = true;
            if (!this.validation()) {
                this.showloading = false;
                return;
            }
            axios.post("/api/doregist", this.formdata).then(response => {
                this.response = response.data;
                if (this.response == "-1") {
                    this.alert = "该QQ已被注册过";
                    this.showAlert = true;
                    this.showloading = false;
                    this.handleRes("QQ号已被注册");
                    return;
                }
                if (this.response == "-2") {
                    this.handleRes("服务器错误");
                    return;
                }
                this.handleRes("注册成功");
                this.clearForm();
                var that = this;
                setTimeout(function() {
                    that.showAlert = false;
                    that.$router.push("/login");
                }, 2000);
            });
        },
        validation() {
            var data = this.formdata;
            if (data.qq.length < 6 && data.password.length < 6 && data.sex.length && data.question.length && data.answer.length && data.nickname.length<10 && data.nickname.length) {
                this.alert = "必填字段没有完成，QQ与密码必须大于六位,昵称不能超过9位";
                this.showAlert = true;
                return false;
            }
            return true;
        },
        onHide() {
            this.showAlert = false;
        },
        handleRes(alert) {
            this.showloading = false;
            this.alert = alert;
            this.showAlert = true;
        },
        clearForm() {
            this.formdata = {
                qq: "",
                password: "",
                question: "",
                answer: "",
                nickname: "",
                sex: "",
                place: "",
                signature: "",
                age: ""
            };
        },
        back(){
            this.$router.go(-1)
        }
    },
    components: {
        Alert,
        Loading
    }
};
</script>

<style lang="scss" scoped>
@import "~assets/variables.scss";
.wrapper {
    background: #eee;
    background-size: cover;
    width: 100%;
    height: 100%;
    .regist {
        width: 100%;
        height: 100%;
        padding: 20px;
        .regist_title {
            margin-bottom: 10px;
            color: #333;
        }
    }
    .regist_form {
        position: relative;
        input{
            color:#333;
        }
        mark {
            display: inline-block;
            background: none;
            margin-bottom: 10px;
        }
        .regist_btn {
            display: inline-block;
            width: 100%;
            background: $attention_text;
            color: #eee;
            border-radius: 5px;
            font-size: 14px;
            padding: 10px;
            letter-spacing: 1px;
        }
        .loading {
            width: 80px;
            height: 80px;
            position: relative;
            display: inline-block;
            bottom: -40px;
            left: 62%;
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
    }
}
</style>
