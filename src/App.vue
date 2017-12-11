<template>
  <div id="app">
    <keep-alive>
      <router-view/>
    </keep-alive>
  </div>
</template>

<script>
  import {
    mapGetters,
    mapMutations
  } from "vuex";
  export default {
    name: "app",
    mounted() {
      setInterval(() => {
        this.setWeather();
      }, 60000);
    },
    methods: {
      ...mapMutations({
        setWeather: "SET_WEATHER"
      })
    }
  };

</script>

<style lang="scss">
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    -webkit-touch-callout: none;
    user-select: none;
  }

  html,
  body {
    width: 100%;
    height: 100%;
    overflow: hidden;
    font-family: "Microsoft Yahei" !important;
  }

  #app,
  .wrapper {
    width: 100%;
    height: 100%;
    position: absolute;
    overflow: hidden;
  }

  @media screen and (min-width: 769px) {
    body {
      box-shadow: 0 0 30px gray;
      margin: 0 auto;
    }
    body,
    #app {
      width: 440px;
    }
  }

  a {
    display: inline-block;
    text-decoration: none;
    font-size: 16px;
    text-align: center;
  }

  input.text {
    border: none;
    outline: none;
    font-size: 16px;
    color: #333;
    height: 40px;
    border-bottom: 1px solid #eee;
  }

  input.btn {
    display: block;
    border-radius: 2px;
    letter-spacing: 2px;
    font-size: 16px;
    text-align: center;
    outline: none;
    border: none;
    cursor: pointer;
  }

  button {
    text-align: center;
    outline: none;
    border: none;
  }

  .clearfix::after {
    content: ".";
    display: block;
    height: 0;
    clear: both;
    visibility: hidden;
  }

  .clearfix {
    zoom: 1;
  }

  .left {
    float: left;
  }

  .right {
    float: right;
  }
  .center {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
  ul {
    display: inline-block;
    li {
      list-style-type: none;
    }
  }
  #vueg-background {
    opacity: 1;
    background: #fff !important;
  }

</style>
