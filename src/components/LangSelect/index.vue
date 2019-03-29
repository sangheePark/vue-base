<template>
  <el-dropdown 
    trigger="click" 
    class="international" 
    @command="handleSetLanguage">
    <div>
      <svg-icon 
        class-name="international-icon" 
        icon-class="language" />
    </div>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item 
        :disabled="language==='ko'" 
        command="ko">
        한국어
      </el-dropdown-item>
      <el-dropdown-item 
        :disabled="language==='en'" 
        command="en">
        English
      </el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
import { SELECT_LANG } from '@/store/modules/appMutationType'
export default {
  // data() {
  //   return {
  //     language: this.$store.getters.language
  //   }
  // },
  computed: {
    language() {
      console.log(this.$store.getters.language);
      console.log(this.$store.getters.language === 'ko');
      return this.$store.getters.language
    }
  },
  methods: {
    handleSetLanguage(lang) {
      this.$i18n.locale = lang
      this.$store.commit(SELECT_LANG, lang)
      const message = this.$t('app.selectLang');
      this.$message({
        message: `${message}`,
        type: 'success'
      })
    }
  },
}
</script>
