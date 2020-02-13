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
        primary: colors.teal.lighten4,
        secondary: colors.blueGrey.lighten4,
        accent: colors.lightBlue.lighten4,
        error: colors.red.lighten4,
        warning: colors.orange.lighten4,
        info: colors.brown.lighten4,
        success: colors.green.lighten4,
      },
      dark: {
        primary: colors.teal.base,
        secondary: colors.blueGrey.base,
        accent: colors.lightBlue.base,
        error: colors.red.base,
        warning: colors.orange.base,
        info: colors.brown.base,
        success: colors.green.base,
      },
    },
  },
  lang: {
    locales: { ja },
    current: "ja",
  },
  iconfont: "md",
})
