import Vue from "vue"
import Vuetify from "vuetify/lib"
import ja from "vuetify/es5/locale/ja"

import colors from "vuetify/lib/util/colors"

Vue.use(Vuetify)

export default new Vuetify({
  theme: {
    options: {
      customProperties: true,
    },
    themes: {
      light: {
        primary: colors.teal.lighten3,
        secondary: colors.blueGrey.lighten3,
        accent: colors.lightBlue.lighten3,
        error: colors.red.lighten3,
        warning: colors.orange.lighten3,
        info: colors.brown.lighten3,
        success: colors.green.lighten3,
        border: colors.grey.darken1,
      },
      dark: {
        primary: colors.teal.base,
        secondary: colors.blueGrey.base,
        accent: colors.lightBlue.base,
        error: colors.red.base,
        warning: colors.orange.base,
        info: colors.brown.base,
        success: colors.green.base,
        border: colors.grey.darken3,
      },
    },
  },
  lang: {
    locales: { ja },
    current: "ja",
  },
  iconfont: "md",
})
