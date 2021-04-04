/*
 * @Author: xuziyong
 * @Date: 2021-03-27 02:14:25
 * @LastEditors: xuziyong
 * @LastEditTime: 2021-04-04 23:20:43
 * @Description: TODO
 */
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

const app = createApp(App).use(store).use(router);

app.mount("#app");
