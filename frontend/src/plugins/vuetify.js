import Vue from 'vue'
import Vuetify from 'vuetify/lib'

Vue.use(Vuetify)

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: '#131a5c',
        secondary: '#E47296',
        accent: '#673ab7',
        error: '#f44336',
        warning: '#ff5722',
        info: '#607d8b',
        success: '#8bc34a'
      }
    }
  },
  icons: {
    iconfont: 'mdiSvg'
  }
})
