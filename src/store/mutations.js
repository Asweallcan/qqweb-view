import * as types from "./mutation-types";

export const state = {
  login: localStorage.login === "true" ? true : false,
  user: JSON.parse(localStorage.user || "{}"),
  weather: JSON.parse(localStorage.weather || "{}")
};

export const mutations = {
  [types.SET_LOGIN](state, user) {
    state.login = true;
    state.user = user;
    localStorage.login = JSON.stringify(state.login);
    localStorage.user = JSON.stringify(state.user);
  },
  [types.SET_LOGOUT](state) {
    clear(state);
  },
  [types.SET_WEATHER](state) {
    let weatherArr = [
      {
        weather: "sun",
        info: "好天气啊!"
      },
      {
        weather: "cloudy",
        info: "坏天气啊！"
      },
      {
        weather: "cloudy2",
        info: "坏天气啊！"
      },
      {
        weather: "rainy",
        info: "下雨了啊！"
      },
      {
        weather: "breeze",
        info: "起风了啊！"
      },
      {
        weather: "rainbow",
        info: "出彩虹了啊！"
      },
      {
        weather: "starry",
        info: "月亮好亮啊！"
      },
      {
        weather: "thunder",
        info: "打雷了啊！"
      },
      {
        weather: "snowy",
        info: "下雪了啊！"
      }
    ];
    let length = weatherArr.length;
    let random = Math.floor(Math.random() * length);
    state.weather = weatherArr[random];
    localStorage.weather = JSON.stringify(state.weather);
  }
};

function clear(state) {
  state.login = false;
  state.user = {};
  state.weather = {};
  localStorage.messageList = "{}";
  localStorage.login = "false";
  localStorage.user = "{}";
  localStorage.weather = "{}"
}
