// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import router from "./router";
import FastClick from "fastclick";
import vueg from "vueg";
import Vuex from "vuex";
import store from './store'
import "vueg/css/transition-min.css";
Vue.config.productionTip = false;
const options = {
    duration: 0.2,
    tabsDisable: true,
    forwardAnim:"fadeIn",
    backAnim : "fadeIn",
    tabs: [
        {
            name: "message"
        },
        {
            name: "friend"
        },
        {
            name: "about"
        }
    ]
};
Vue.use(vueg, router, options);

if ("addEventListener" in document) {
    document.addEventListener(
        "DOMContentLoaded",
        function() {
            FastClick.attach(document.body);
        },
        false
    );
}

new Vue({
    el: "#app",
    router,
    store,
    template: "<App/>",
    components: { App }
});
