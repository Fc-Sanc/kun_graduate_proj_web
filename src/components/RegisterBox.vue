<template>
  <q-list>
    <q-item>
      <div class = "text-bold text-justify text-h5">注册</div>
    </q-item>
    <q-item>
      <q-item-section>
        <q-item>
          <q-input outlined label = "Username"
                   v-model = "body.username"/>
        </q-item>
        <q-item>
          <q-input outlined type = "password" label = "Password"
                   v-model = "body.password"/>
        </q-item>
      </q-item-section>
      <q-item-section>
        <q-item>
          <q-uploader label = "请上传头像" max-files = "1" multiple
                      auto-upload url = "http://localhost:7734/open/upload" field-name = "file"
                      @uploaded = "uploaded"
          />
        </q-item>
      </q-item-section>
    </q-item>

    <q-item class = "row">
      <q-btn label = "注册" class = "text-capitalize" @click = "register"/>
    </q-item>

    <q-dialog v-model = "alert">
      <q-card flat square>
        {{ alertMsg }}
      </q-card>
    </q-dialog>

    <q-ajax-bar color = "pink" ref = "ajax_bar" skip-hijack position = "bottom" size = "10px"/>

  </q-list>

</template>

<script>
import {apiInternal} from "src/router";
import {fetch_s} from "assets/js/utils/fetch_extension";
import {Cookies} from "quasar";

export default {
  name: "RegisterBox",
  data() {
    return {
      register_user: apiInternal.api.register.user,
      body: {},
      alert: false,
      alertMsg: ''
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      this.body = this.register_user.body
    },
    uploaded(info) {
      this.body.portraitUrl = JSON.parse(info.xhr.response)['data']
      console.log(this.body)
    },
    register() {
      this.$refs.ajax_bar.start()
      fetch_s(this.register_user.url, {
        method: this.register_user.method,
        body: JSON.stringify(this.register_user.body),
        headers: {
          'Content-Type': 'application/json; charset=UTF-8'
        }
      }).then(result => {
        let login_api = apiInternal.api.login.user
        fetch_s(login_api.url, {
          method: login_api.method,
          body: JSON.stringify(this.body),
          headers: {
            'Content-Type': 'application/json;charset=UTF-8'
          }
        }).then(result => {
          if (result.code !== -1 && result.data !== null) {
            let self_detail_api = apiInternal.api.self_detail
            Cookies.set('token', result.data['token'])
            fetch_s(self_detail_api.url, {
              method: self_detail_api.method
            }).then(result => {
              console.log(result)
              Cookies.set('user_id', result.data['id'])
              Cookies.set('username', result.data['username'])
              Cookies.set('portrait_url', result.data['portraitUrl'])
              this.$refs.ajax_bar.stop()
              this.$router.push({path:'/'})
              setTimeout(() => {
                this.$router.go(0)
              }, 500)
            })
          }
        })
      })
    }
  }
}
</script>

<style scoped>

</style>
