<template>
  <q-card bordered
          ref = "card"
          class = "q-my-sm shadow-6 row">
    <q-card-section>
      <q-icon name = "place"/>
    </q-card-section>

    <q-separator vertical/>

    <q-card-section class = "card_detail">
      <div class = "q-px-md">地址: <span class = "text-secondary">{{ content.address }}</span></div>
    </q-card-section>

    <q-separator vertical/>

    <q-card-section class = "card_detail">
      <div class = "q-px-md">邮编: <span class = "text-secondary">{{ content.postcode }}</span></div>
    </q-card-section>

    <q-separator vertical/>

    <q-card-section class = "card_detail">
      <div class = "q-px-md">接收人: <span class = "text-secondary">{{ content.receiver }}</span></div>
    </q-card-section>

    <q-separator vertical/>

    <q-card-section class = "card_detail">
      <div class = "q-px-md">电话号码: <span class = "text-secondary">{{ content.phoneNumber }}</span></div>
    </q-card-section>

    <q-separator vertical/>

    <q-card-actions class = "row justify-evenly items-center">
      <q-btn icon = "edit_location_alt" label = "编辑" color = "primary"
             @click = "showUpdateDialog"/>
      <q-btn icon = "wrong_location" label = "删除" color = "negative"
             @click = "onDelete"/>

      <q-btn :icon = "content.isDefault ? 'done' : 'push_pin'"
             :label = "content.isDefault ? '默认地址' : '设为默认'"
             :color = "content.isDefault ? 'positive' : 'accent'"
             @click = "setDefault">
        <template v-slot:loading>

        </template>
      </q-btn>
    </q-card-actions>

    <q-dialog v-model = "dialogStatus">
      <q-card class = "dialog-detail q-pa-sm">
        <q-card-section class = "text-h6">
          <div class = "row justify-between q-mb-md">
            编辑收货地址
            <q-space/>
            <q-btn round flat icon = "close" v-close-popup/>
          </div>

          <q-separator/>
        </q-card-section>

        <q-card-section>
          <q-form ref = "address_form"
                  autocorrect = "off" autocapitalize = "off"
                  autocomplete = "off" spellcheck = "false"
                  @submit = "onSubmit" @reset = "onReset"
                  class = "q-gutter-md">

            <q-input outlined clearable
                     v-model = "body.address"
                     label = "地址 *" hint = "您的详细收货地址"
                     :lazy-rules = "true"
                     :rules = "[val => val && val.length !== 0 || '必填项']">
              <template v-slot:prepend>
                <q-icon name = "place"/>
              </template>
            </q-input>

            <q-input outlined clearable
                     v-model = "body.postcode"
                     label = "邮编 *" hint = "收货地址邮政编码"
                     :lazy-rules = "true"
                     :rules = "[val => val && val.length !== 0 || '必填项']">
              <template v-slot:prepend>
                <q-icon name = "local_post_office"/>
              </template>
            </q-input>

            <q-input outlined clearable
                     v-model = "body.receiver"
                     label = "收货人姓名 *" hint = "您的详细收货地址"
                     :lazy-rules = "true"
                     :rules = "[val => val && val.length !== 0 || '必填项']">
              <template v-slot:prepend>
                <q-icon name = "face"/>
              </template>
            </q-input>

            <q-input outlined clearable
                     v-model = "body.phoneNumber"
                     label = "电话号码 *" hint = "收货人电话号码" type = "tel"
                     :lazy-rules = "true"
                     :rules = "[val => val && val.length !== 0 || '必填项']">
              <template v-slot:prepend>
                <q-icon name = "phone"/>
              </template>
            </q-input>

            <div class = "row justify-evenly">

              <q-btn label = "保存" color = "primary" type = "submit"
                     class = "q-px-md"/>

              <q-btn label = "重置" color = "info" type = "reset"
                     class = "q-px-md"/>

            </div>

          </q-form>
        </q-card-section>
      </q-card>
    </q-dialog>

    <q-ajax-bar skip-hijack
                ref = "ajax_bar"
                color = "primary" position = "bottom" size = "10px"/>

  </q-card>
</template>

<script>
import {Cookies} from "quasar";
import {apiInternal} from "src/router";
import {fetch_s} from "assets/js/utils/fetch_extension";

export default {
  name: "AddressItem",
  data() {
    return {
      content: {},
      dialogStatus: false,
      body: {
        userId: 0,
        address: '',
        postcode: '',
        phoneNumber: '',
        receiver: '',
        isDefault: 0
      }
    }
  },
  props: {
    address: {
      type: Object
    }
  },
  methods: {
    init() {
      this.content = this.address
    },
    showUpdateDialog() {
      this.body = {...this.content};
      this.dialogStatus = true
    },
    setDefault() {
      if (this.content.isDefault) {
        this.$q.notify('该地址已经是默认地址了^_^')
      } else {
        this.$refs.ajax_bar.start()

        let body = {...this.content};
        body.userId = Cookies.get('user_id')

        let api = apiInternal.api.address.set_default
        fetch_s(api.url, {
          method: api.method,
          body: JSON.stringify(body),
          headers: {
            'Content-Type': 'application/json;charset=UTF-8'
          }
        }).then(result => {
          this.$refs.ajax_bar.stop()
          this.dialogStatus = false
          this.$router.go(0)
        })
      }
    },
    onDelete() {
      this.$q.dialog({
        // title: '',
        message: '确实要删除该地址吗？',
        cancel: true,
        persistent: true
      }).onOk(() => {
        this.$refs.ajax_bar.start()
        let api = apiInternal.api.address.delete
        api.body.id = this.content.id
        fetch_s(api.url, {
          method: api.method,
          body: JSON.stringify(api.body),
          headers: {
            'Content-Type': 'application/json;charset=UTF-8'
          }
        }).then(result => {
          this.$refs.ajax_bar.stop()
          this.$router.go(0)
        })
      })
    },
    onSubmit() {
      this.$refs.address_form.validate().then(success => {
        if (success) {
          this.$refs.ajax_bar.start()

          this.body.userId = Cookies.get('user_id')
          let api = apiInternal.api.address.update
          fetch_s(api.url, {
            method: api.method,
            body: JSON.stringify(this.body),
            headers: {
              'Content-Type': 'application/json;charset=UTF-8'
            }
          }).then(result => {
            this.$refs.ajax_bar.stop()
            this.content = result.data
            this.dialogStatus = false
          })
        } else {
          this.$q.notify('请填写全部内容')
        }
      })
    },
    onReset() {
      this.body = {
        content: '',
        postcode: '',
        phoneNumber: '',
        receiver: ''
      }
    }
  },
  mounted() {
    this.init()
  }
}
</script>

<style scoped>
.card_detail {
  width: 16vw;
}

.dialog-detail {
  width: 60vw;
}
</style>
