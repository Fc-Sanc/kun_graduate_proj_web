<template>
  <q-list>
    <q-item>
      <div class = "text-bold text-justify text-h5">登录</div>
    </q-item>
    <q-item>
      <q-input outlined label = "Username"
               v-model = "body.username"/>
    </q-item>
    <q-item>
      <q-input outlined type = "password" label = "Password"
               v-model = "body.password"/>
    </q-item>

    <q-item class = "row">
      <q-btn label = "login" class = "text-capitalize" @click = "login"/>
    </q-item>

    <q-dialog v-model = "alert">
      <q-card flat square>
        {{ alertMsg }}
      </q-card>
    </q-dialog>

  </q-list>
</template>

<script>
import {apiInternal} from "src/router";
import {fetch_s} from "assets/js/utils/fetch_extension";
import {Cookies} from "quasar";

export default {
  name: "LoginBox",
  data() {
    return {
      login_user: apiInternal.api.login.user,
      self_detail: apiInternal.api.self_detail,
      body: {},
      alert: false,
      alertMsg: ''
    }
  },
  methods: {
    init() {
      this.body = this.login_user.body
    },
    login() {
      fetch_s(this.login_user.url, {
        method: this.login_user.method,
        body: JSON.stringify(this.body),
        headers: {
          'Content-Type': 'application/json;charset=UTF-8'
        }
      }).then(promise => promise.json())
        .then(result => {
          if (result.code !== -1 && result.data !== null) {
            Cookies.set('token', result.data['token'])
            fetch_s(this.self_detail.url, {
              method: this.self_detail.method
            }).then(promise => promise.json())
              .then(result => {
                console.log(result)
                Cookies.set('userId', result.data['id'])
                Cookies.set('username', result.data['username'])
                Cookies.set('portraitUrl', result.data['portraitUrl'])
                this.$router.push('/')
                location.reload()
              })
          }
        })
    }
  },
  mounted() {
    this.init()
  }
}
</script>

<style scoped>

</style>
