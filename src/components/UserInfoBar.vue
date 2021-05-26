<template>
  <div>
    <q-btn flat v-if = "hasSignedIn">
      <q-item>
        <q-chip outline color="secondary">
          <q-avatar size = "30px">
            <q-img :src = "model.portraitUrl"/>
          </q-avatar>
          {{ model.username }}
        </q-chip>
      </q-item>

      <q-menu fit>
        <q-list>
          <q-item clickable v-close-popup>
            <q-item-section>
              个人信息
            </q-item-section>
          </q-item>
          <q-separator/>
          <q-item clickable v-close-popup @click = "logout">
            <q-item-section>
              注销
            </q-item-section>
          </q-item>
        </q-list>
      </q-menu>
    </q-btn>
    <q-btn-group rounded v-else>
      <q-btn
        ref = "btn_register"
        dense
        push
        color = "white"
        class = "text-black q-pl-sm q-pr-sm"
        label = "Register"
        @click = "goToRegister"/>

      <q-btn
        ref = "btn_login"
        dense
        push
        class = "q-pr-sm q-pl-sm"
        color = "secondary"
        label = "Login"
        @click = "goToLogin"/>
    </q-btn-group>
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
      model: {
        username: 'shuang',
        portraitUrl: 'http://localhost:7734/test/get_uploaded_image?imagePath=png/button_128px_1277554_easyicon.net.png'
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
    init() {
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
