<template>
  <q-card
    class = "q-ma-md shadow-6 card-page">
    <q-card-section>
      <div class = "text-h5 text-weight-bold">我的账户</div>

      <q-separator/>
    </q-card-section>

    <q-card-section class = "column">

      <q-card-section class = "row items-center">
        <q-avatar square size = "100px" rounded>
          <q-img :src = "model.avatar" ratio = "1"/>
        </q-avatar>
        <div class = "text-h4 q-pl-md">
          {{ model.username }}
        </div>
      </q-card-section>
      <div>
        <q-btn outline
               icon = "o_manage_accounts" color = "primary" label = "更换头像"
               @click = "avatarChangingDialogStatus = true"/>
      </div>

    </q-card-section>

    <q-card-section class = "row">
      <div class = "text-h6">余额: <span class = "text-primary">¥{{ model.balance }}</span></div>
      <q-btn outline
             icon = "o_savings" label = "充值" color = "primary"
             @click = "paymentSelectorDialogStatus = true"
             class = "q-ml-xl q-px-sm"/>
    </q-card-section>

    <q-card-section>
      <div class = "text-grey-6">注册时间: {{ model.createTime }}</div>
    </q-card-section>

    <!--  充值数额选择弹窗  -->
    <q-dialog v-model = "paymentSelectorDialogStatus">
      <q-card class = "q-pa-md card_detail">
        <q-card-section class = "row justify-between">
          <div class = "text-h5 q-mb-sm">
            请选择充值数额
          </div>
          <q-btn round flat icon = "close" v-close-popup/>
        </q-card-section>

        <q-separator/>

        <q-card-section class = "q-gutter-sm item" style = "text-align: center">
          <q-btn outline
                 v-for = "value in payment_range" :key = "value"
                 icon = "o_monetization_on" color = "primary"
                 :label = "'¥'+value"
                 @click = "recharge(value)"
                 class = "recharge_item">
            <q-badge floating
                     v-if = "value === 1000 ">
              推荐
            </q-badge>
            <div v-else-if = "value === 10000">
              <q-spinner-comment color = "primary"/>
              <q-tooltip>
                您真有钱！
              </q-tooltip>
            </div>

          </q-btn>
        </q-card-section>

      </q-card>
    </q-dialog>

    <!--  充值等待弹窗  -->
    <q-dialog persistent
              v-model = "rechargingDialogStatus">
      <q-card style = "width: 30vw;height: 30vh;"
              class = "q-pa-md bg-primary">
        <q-inner-loading showing>
          <q-spinner-bars size = "100px" color = "white"/>
          <div style = "text-align: center"
               class = "text-white">
            请稍候...
          </div>
        </q-inner-loading>
      </q-card>
    </q-dialog>

    <!--  修改头像弹窗  -->
    <q-dialog v-model = "avatarChangingDialogStatus">
      <q-card class = "">
        <!--        <q-card-section class = "row justify-between">-->
        <!--          <div class = "text-h5 q-mb-sm">-->
        <!--            更换头像-->
        <!--          </div>-->
        <!--          <q-btn round flat icon = "close" v-close-popup/>-->
        <!--        </q-card-section>-->

        <!--        <q-separator/>-->

        <q-uploader label = "请上传头像" max-files = "1" multiple
                    auto-upload url = "http://localhost:7734/open/upload" field-name = "file"
                    style = "height: 30vh"
                    @uploaded = "uploaded"/>

        <q-card-section style = "text-align: center"
                        class = "q-pt-md">
          <q-btn outline
                 color = "primary" icon = "save" label = "保存头像"
                 @click = "saveAvatar"
                 class = "q-px-md"/>
        </q-card-section>
      </q-card>
    </q-dialog>

  </q-card>
</template>

<script>
import {apiInternal} from "src/router";
import {fetch_s} from "assets/js/utils/fetch_extension";
import {userModel} from "assets/js/model/user_convertor";
import {get_image_url} from "assets/js/api/api_internal";
import {Cookies} from "quasar";
import {api_outside} from "assets/js/api/api_outside";

export default {
  name: "BalanceManagementBox",
  data() {
    return {
      paymentSelectorDialogStatus: false,
      rechargingDialogStatus: false,
      avatarChangingDialogStatus: false,
      model: {},
      payment_range: [
        50, 100, 200, 500, 1000, 2000, 5000, 10000
      ],
      uploadedAvatarUrl: '',
      one_sentence: '',
    }
  },
  methods: {
    init() {
      let api = apiInternal.api.self_detail
      fetch_s(api.url, {method: api.method}).then(result => {
        this.model = userModel(result.data)
      })

      let hitokoto = api_outside.hitokoto
      fetch_s(hitokoto.url, {
        method: hitokoto.method
      }).then(result => {
        this.one_sentence = result.hitokoto
        console.log(result.hitokoto)
      })
    },
    uploaded(info) {
      this.uploadedAvatarUrl = JSON.parse(info.xhr.response)['data']
      // this.model.avatar = get_image_url(JSON.parse(info.xhr.response)['data'])
    },
    saveAvatar() {
      if (this.uploadedAvatarUrl) {
        let api = apiInternal.api.user.change_avatar
        api.body.value = this.uploadedAvatarUrl
        fetch_s(api.url, {
          method: api.method,
          body: JSON.stringify(api.body),
          headers: {
            'Content-Type': 'application/json;charset=UTF-8'
          }
        }).then(result => {
          Cookies.set('portrait_url', result.data.portraitUrl)
          this.$router.go(0)
        })
      } else {
        this.$q.notify('请先上传图片')
      }
    },
    recharge(value) {
      this.$q.dialog({
        message: `为什么都要营业执照QAQ，只能装装样子了，请问您要充值${value}元嘛？`,
        cancel: true,
        persistent: true
      }).onOk(() => {
        this.rechargingDialogStatus = true
        let api = apiInternal.api.user.recharge
        api.body.value = value
        fetch_s(api.url, {
          method: api.method,
          body: JSON.stringify(api.body),
          headers: {
            'Content-Type': 'application/json; charset=UTF-8'
          }
        }).then(result => {
          setTimeout(() => {
            this.model = userModel(result.data)
            this.$q.notify({
              message: '充值成功',
              color: 'primary',
              icon: 'done_all',
              position: 'center',
              progress: true,
              timeout: 1000,
            })
            this.rechargingDialogStatus = false
            this.paymentSelectorDialogStatus = false
          }, 3000)
        })
      })
    }
  },
  mounted() {
    this.init()
  }
}
</script>

<style scoped>
.card_detail {
  width: 60vw;
}

.recharge_item {
  width: 40%;
}
</style>
