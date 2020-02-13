import Vue from "vue"
import App from "./test.vue"
// import App from "./App.vue"

import VueKonva from "vue-konva"

import VueHighlightJS from "vue-highlight.js"
import json from "highlight.js/lib/languages/json"
import plaintext from "highlight.js/lib/languages/plaintext"
import vuetify from "./plugins/vuetify"

import "material-design-icons-iconfont/dist/material-design-icons.css"

Vue.config.productionTip = false

Vue.use(VueKonva)
Vue.use(VueHighlightJS, {
  languages: {
    json,
    plaintext,
  },
})

new Vue({
  vuetify,
  render: h => h(App),
}).$mount("#app")
