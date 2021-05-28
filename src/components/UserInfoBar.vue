<template>
  <div>
    <q-btn flat v-if = "hasSignedIn">
      <q-item>
        <q-chip outline color = "secondary">
          <q-avatar size = "30px">
            <q-img :src = "model.portraitUrl"/>
          </q-avatar>
          {{ model.username }}
        </q-chip>
      </q-item>

      <q-menu fit>
        <div class = "row no-wrap q-pa-md">
          <div class = "column">
            <div class = "text-h6 q-mb-md">Settings</div>
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
              label = "Logout"
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
import {Cookies} from "quasar";
import {get_image_url} from "assets/js/api/api_internal";

export default {
  name: "UserInfoBar",
  data() {
    return {
      hasSignedIn: false,
      darkMode: false,
      model: {
        username: '',
        portraitUrl: ''
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
      Cookies.remove('token');
      Cookies.remove('userId')
      Cookies.remove('username')
      Cookies.remove('portraitUrl')
      this.$router.push('/')
      location.reload()
    },
    toggleDarkMode(isOpen) {
      Cookies.set('dark_mode', isOpen)
      this.$q.dark.set(isOpen)
    },
    init() {
      if (Cookies.get('dark_mode') != null) {
        this.$q.dark.set(Cookies.get('dark_mode'))
        this.darkMode = Cookies.get('dark_mode')
      }
      if (Cookies.get('token') != null) {
        this.hasSignedIn = true
        this.model.username = Cookies.get('username')
        this.model.portraitUrl = get_image_url(Cookies.get('portraitUrl'))
      }
    }
  },
  mounted() {
    this.init()
  }
}
</script>

<style scoped>

</style>
