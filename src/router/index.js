import Vue from "vue";
import Router from "vue-router";

const asyncComponent = name => {
    return resolve => require([`@/pages/${name}`], resolve);
};

const Boot = asyncComponent("Welcome/Boot.vue"),
    Welcome = asyncComponent("Welcome/Welcome.vue"),
    Login = asyncComponent("Login/Login.vue"),
    Regist = asyncComponent("Regist/Regist.vue"),
    ServiceTerm = asyncComponent("Login/ServiceTerm.vue"),
    ForgetPwd = asyncComponent("ForgetPwd/ForgetPwd"),
    Message = asyncComponent("Message/Message.vue"),
    Friend = asyncComponent("Friend/Friend.vue"),
    Profile = asyncComponent("Profile/Profile.vue"),
    Setting = asyncComponent("Setting/Setting.vue"),
    About = asyncComponent("About/About.vue"),
    ChatOne = asyncComponent("Message/ChatOne.vue"),
    ChatGroup = asyncComponent("Message/ChatGroup.vue");

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: "/",
            name: "boot",
            component: Boot,
            meta: { keepAlive: false }
        },
        {
            path: "/welcome",
            name: "welcome",
            component: Welcome,
            meta: { keepAlive: false }
        },
        {
            path: "/login",
            name: "login",
            component: Login,
            meta: { keepAlive: false }
        },
        {
            path: "/regist",
            name: "regist",
            component: Regist,
            meta: { keepAlive: false }
        },
        {
            path: "/login/serviceterm",
            name: "serviceterm",
            component: ServiceTerm,
            meta: { keepAlive: false }
        },
        {
            path: "/forgetpwd",
            name: "forgetpwd",
            component: ForgetPwd,
            meta: { keepAlive: false }
        },
        {
            path: "/message",
            name: "message",
            component: Message,
            meta: { keepAlive: true }
        },
        {
            path: "/friend",
            name: "friend",
            component: Friend,
            meta: { keepAlive: true }
        },
        {
            path: "/setting",
            name: "setting",
            component: Setting,
            meta: { keepAlive: true }
        },
        {
            path: "/profile/:qq",
            name: "profile",
            component: Profile,
            meta: { keepAlive: false }
        },
        {
            path: "/about",
            name: "about",
            component: About,
            meta: { keepAlive: true }
        },
        {
            path: "/chatone/:qq",
            name: "chatone",
            component: ChatOne,
            meta: { keepAlive: true }
        },
        {
            path: "/chatgroup",
            name: "chatgroup",
            component: ChatGroup,
            meta: { keepAlive: true }
        }
    ]
});
