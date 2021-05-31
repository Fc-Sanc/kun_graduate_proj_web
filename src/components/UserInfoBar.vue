<template>
  <div>
    <q-btn flat no-caps v-if = "hasSignedIn" @click = "getBalance">
      <q-item>
        <q-chip color = "secondary">
          <q-avatar size = "25px">
            <q-img :src = "model.portraitUrl"/>
          </q-avatar>
          {{ model.username }}
        </q-chip>
      </q-item>

      <q-menu fit>
        <div class = "row no-wrap q-pa-md">
          <div class = "column">
            <div class = "text-h6 q-mb-md">基本信息</div>
            <div class = "text-body2">余额: {{ model.balance }}</div>
            <q-btn dense push
                   color = "primary" label = "账户管理"
                   @click = "toAccountManagement"
                   class = "q-px-sm q-my-sm"/>

            <q-separator class = "q-my-sm"/>

            <div class = "text-h6 q-mb-md">系统设置</div>
            <q-toggle v-model = "darkMode" label = "dark mode" @input = "toggleDarkMode"/>
          </div>

          <q-separator vertical class = "q-mx-lg"/>

          <div class = "column items-center">
            <q-avatar size = "72px">
              <q-img :src = "model.portraitUrl"/>
            </q-avatar>

            <div class = "text-subtitle1 q-mt-md q-mb-xs">{{ model.username }}</div>

            <q-btn
              color = "primary"
              label = "注销"
              push
              @click = "logout"
              size = "sm"
              v-close-popup
            />
          </div>
        </div>
      </q-menu>
    </q-btn>
    <div v-else>
      <q-btn-group rounded>
        <q-btn
          ref = "btn_register"
          dense
          color = "white"
          class = "text-black q-pl-sm q-pr-sm"
          label = "注册"
          @click = "goToRegister"/>

        <q-btn
          ref = "btn_login"
          dense
          class = "q-pr-sm q-pl-sm"
          color = "secondary"
          label = "登录"
          @click = "goToLogin"/>
      </q-btn-group>
      <q-btn round flat icon = "settings">
        <q-menu fit>
          <div class = "column q-pa-md">
            <div class = "text-h6 q-mb-md">Settings</div>
            <q-toggle v-model = "darkMode" label = "dark mode" @input = "toggleDarkMode"/>
          </div>
        </q-menu>
      </q-btn>
    </div>
  </div>
</template>

<script>
import {get_image_url} from "assets/js/api/api_internal";
import {apiInternal} from "src/router";
import {fetch_s} from "assets/js/utils/fetch_extension";

export default {
  name: "UserInfoBar",
  data() {
    return {
      hasSignedIn: false,
      darkMode: false,
      model: {
        username: '',
        portraitUrl: '',
        balance: 0
      }
    }
  },
  methods: {
    goToRegister() {
      this.$router.push({path: '/register'})
    },
    goToLogin() {
      this.$router.push({path: '/login'})
    },
    logout() {
      this.$q.cookies.remove('token');
      this.$q.cookies.remove('user_id')
      this.$q.cookies.remove('username')
      this.$q.cookies.remove('portrait_url')
      this.$router.push('/')
      this.$router.go(0)
    },
    toggleDarkMode(isOpen) {
      this.$q.cookies.set('dark_mode', isOpen)
      this.$q.dark.set(isOpen)
    },
    init() {
      if (this.$q.cookies.get('dark_mode') != null) {
        this.$q.dark.set(this.$q.cookies.get('dark_mode'))
        this.darkMode = this.$q.cookies.get('dark_mode')
      }
      if (this.$q.cookies.get('token') != null) {
        this.hasSignedIn = true
        this.model.username = this.$q.cookies.get('username')
        this.model.portraitUrl = get_image_url(this.$q.cookies.get('portrait_url'))
      }
    },
    getBalance() {
      let api = apiInternal.api.self_detail
      fetch_s(api.url, {
        method: api.method
      }).then(result => {
        this.model.balance = result.data.balance
      })
    },
    toAccountManagement() {
      this.$router.push({path: '/account'})
    }
  },
  mounted() {
    this.init()
  }
}
</script>

<style scoped>

</style>
