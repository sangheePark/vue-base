import Vue from 'vue'
import VueI18n from 'vue-i18n'
import Cookies from 'js-cookie'
import enLocale from './en'
import koLocale from './ko'

Vue.use(VueI18n)

const messages = {
  en: {
    ...enLocale
  },
  ko: {
    ...koLocale
  }
}
const i18n = new VueI18n({
  locale: Cookies.get('language') || 'ko',
  messages
})

export default i18n