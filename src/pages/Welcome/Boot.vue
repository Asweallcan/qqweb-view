<
<template>
  <!-- 模拟QQ启动页面 -->
  <div class="wrapper">
     <div class="boot"></div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
export default {
    computed: {
        ...mapGetters(["login"])
    },
    created() {
        //未登陆则切换到欢迎页面,否则进入消息页面
        var that = this;
        setTimeout(() => {
            that.login ? that.$router.push("/message") : that.$router.push("/welcome");
        }, 1500);
    },
    methods: {
        ...mapMutations({
            setlogin: "SET_LOGIN"
        })
    }
};
</script>

<style scoped lang="scss" type="text/css">
.boot {
    position: absolute;
    width: 100%;
    height: 100%;
    background: url(./splash.png) no-repeat center center;
    background-size: contain;
}
</style>
