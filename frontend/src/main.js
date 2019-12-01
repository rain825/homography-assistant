import Vue from "vue"
// import App from "./App.vue"
import App from "./components/CodeBlock.vue"

import VueKonva from "vue-konva"

import VueHighlightJS from "vue-highlight.js"
import json from "highlight.js/lib/languages/json"

Vue.config.productionTip = false

Vue.use(VueKonva)
Vue.use(VueHighlightJS, {
  languages: {
    json,
  },
})

new Vue({
  render: h => h(App),
}).$mount("#app")
