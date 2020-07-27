"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var vue_js_1 = __importDefault(require("./vue.js"));
// import router from './router'
// import store from './store'
vue_js_1.default.config.productionTip = false;
// new Vue({
//   router,
//   store,
//   render: h => h(App)
// }).$mount('#app')
new vue_js_1.default({
    data: {
        message: "laotang"
    }
}).$mount('#app');
