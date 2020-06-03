import Vue from 'vue'
import Vuetify from 'vuetify/lib'

Vue.use(Vuetify)

export default new Vuetify({
  theme: {
    themes: {
      light: {
        // primary: '#8bc34a',
        // secondary: '#cddc39',
        // accent: '#ffeb3b',
        // error: '#e91e63',
        // warning: '#ff9800',
        // info: '#03a9f4',
        // success: '#2196f3'
      }
    }
  },
  icons: {
    iconfont: 'mdi'
  }
})
