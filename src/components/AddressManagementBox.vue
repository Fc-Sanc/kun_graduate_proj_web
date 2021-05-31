<template>
  <div>
    <q-card class = "q-ma-md shadow-6 card-page">

      <q-card-section>
        <div class = "text-h5 text-weight-bold">我的收货地址</div>
      </q-card-section>

      <q-card-section v-if = "addresses.length > 0">
        <div class = "text-h6">共<span class = "text-primary">{{ addresses.length }}</span>条结果</div>
        <q-separator/>
      </q-card-section>

      <q-card-section>
        <q-btn icon = "add_location_alt" name = "playlist_add" label = "添加" color = "positive"
               @click = "dialogStatus = true"
               class = "q-px-lg"/>
      </q-card-section>

      <q-card-section v-if = "addresses.length > 0">
        <div class = "column">
          <AddressItem v-for = "address in addresses" :key = "address.id" :address = "address"/>
        </div>
      </q-card-section>
      <q-card-section v-else>
        <div class = "row items-center justify-center q-pt-xl">
          <q-icon name = "sentiment_dissatisfied" color = "primary"
                  style = "font-size: 4rem"/>
          <div
            style = "font-size: 2rem"
            class = "text-h6">
            暂时没有收货地址哦
          </div>
        </div>
      </q-card-section>

    </q-card>

    <q-dialog v-model = "dialogStatus">
      <q-card class = "dialog-detail q-pa-sm">
        <q-card-section class = "text-h6">
          <div class = "row justify-between q-mb-md">
            添加收货地址
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
                color = "pink" position = "bottom" size = "10px"/>
  </div>
</template>

<script>
import AddressItem from "components/AddressItem";
import {apiInternal} from "src/router";
import {Cookies} from "quasar";
import {fetch_s} from "assets/js/utils/fetch_extension";
import {addressModel} from "assets/js/model/address_convertor";

export default {
  name: "AddressManagementBox",
  components: {AddressItem},
  data() {
    return {
      addresses: [],
      dialogStatus: false,
      body: {
        userId: 0,
        address: '',
        postcode: '',
        phoneNumber: '',
        receiver: ''
      }
    }
  },
  methods: {
    init() {
      let userId = Cookies.get('user_id')
      if (!userId) {
        this.$q.notify("请登录后再进行操作")
        this.$router.push({path: '/login'})
      } else {
        let api = apiInternal.api.address.get_by_user_id(userId)
        fetch_s(api.url, {method: api.method}).then(result => {
          let addressList = result.data
          this.addresses = []
          for (let index in addressList) {
            if (addressList.hasOwnProperty(index)) {
              this.addresses.push(addressModel(addressList[index]))
            }
          }
        })
      }
    },
    onSubmit() {
      this.$refs.address_form.validate().then(success => {
        if (success) {
          this.$refs.ajax_bar.start()

          this.body.userId = Cookies.get('user_id')
          let api = apiInternal.api.address.add
          fetch_s(api.url, {
            method: api.method,
            body: JSON.stringify(this.body),
            headers: {
              'Content-Type': 'application/json;charset=UTF-8'
            }
          }).then(result => {
            console.log(result.data)
            this.$refs.ajax_bar.stop()
            this.init()
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
.dialog-detail {
  width: 60vw;
}

.card-page {
  min-height: 350px;
}
</style>
