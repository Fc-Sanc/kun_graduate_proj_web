<template>
  <q-card bordered
          ref = "card"
          class = "q-my-sm q-pa-md shadow-6 column">

    <q-separator/>

    <div class = "row items-center justify-between">

      <q-separator vertical/>

      <q-card-section>
        <q-img ratio = "1" width = "100px"
               :src = "content.book.coverUrl">
          <div class = "absolute-bottom text-subtitle1 text-center">{{ content.book.name }}</div>
        </q-img>
      </q-card-section>

      <q-separator vertical/>

      <q-card-actions v-if = "isNoyPaid"
                      class = "q-gutter-md">

        <q-btn label = "付款" color = "positive" icon = "payments"
               @click = "buy"
               class = "q-px-md"/>

        <q-btn label = "修改送货地址" color = "info" icon = "local_shipping"
               @click = "showOrderDialog"
               class = "q-px-md"/>

        <q-btn label = "取消" color = "warning" icon = "clear"
               class = "q-px-md"/>

      </q-card-actions>
      <q-card-actions v-else
                      class = "q-gutter-md">
        <q-btn v-if = "content.status === '已发货' || content.status === '已支付'"
               label = "修改送货地址" color = "info" icon = "local_shipping"
               @click = "showOrderDialog"
               class = "q-px-md"/>

        <q-btn v-if = "content.status !== '退款中' && content.status !== '已退款'"
               label = "退款" color = "warning" icon = "clear"
               class = "q-px-md"/>

      </q-card-actions>

      <q-separator vertical/>

    </div>
    <q-separator/>

    <div class = "row items-center justify-between">

      <q-separator vertical/>

      <q-card-section
        class = "text-body1">
        数量: <span class = "text-primary text-weight-bold">{{ content.quantity }}</span>
      </q-card-section>

      <q-separator vertical/>

      <q-card-section
        class = "text-body1">
        订单总价: <span class = "text-primary text-weight-bold">{{ content.total_price }}</span>元
      </q-card-section>

      <q-separator vertical/>

      <q-card-section
        class = "text-body1">
        下单日期: <span class = "text-primary text-weight-bold">{{ content.createTime }}</span>
      </q-card-section>

      <q-separator vertical/>

      <q-card-section
        class = "text-body1">
        订单状态:
        <span :class = "`text-${statusColor} text-weight-bold`">
          {{ content.status }}
        </span>
      </q-card-section>

      <q-separator vertical/>

    </div>

    <q-separator/>

    <div class = "row items-center justify-between">

      <q-separator vertical/>

      <q-card-section
        class = "text-body1">
        送货地址: <span class = "text-primary text-weight-bold">{{ content.user_address.address }}</span>
      </q-card-section>

      <q-separator vertical/>

      <q-card-section
        class = "text-body1">
        收货人: <span class = "text-primary text-weight-bold">{{ content.user_address.receiver }}</span>
      </q-card-section>

      <q-separator vertical/>

      <q-card-section
        class = "text-body1">
        联系电话: <span class = "text-primary text-weight-bold">{{ content.user_address.phoneNumber }}</span>
      </q-card-section>

      <q-separator vertical/>

    </div>

    <q-separator/>

    <q-dialog v-model = "orderDialogStatus">
      <q-card class = "dialog-detail q-pa-sm">
        <q-card-section class = "text-h6">
          <div class = "row justify-between q-mb-md">
            请选择收货地址
            <q-space/>
            <q-btn round flat icon = "close" v-close-popup/>
          </div>
          <q-separator/>
        </q-card-section>

        <q-card-section>
          <q-select outlined
                    label = "收货地址" hint = "请选择下列选项中的一项"
                    :options = "selectableAddresses"
                    v-model = "selectedAddress"
                    options-selected-class = "text-primary bg-grey-4">

            <template v-slot:prepend>
              <q-icon name = "o_local_shipping" color = "primary"/>
            </template>

            <template v-slot:option = "scope"
            >
              <q-item
                v-bind = "scope.itemProps"
                v-on = "scope.itemEvents"
              >
                <q-item-section avatar>
                  <q-icon name = "place"/>
                </q-item-section>
                <q-item-section>
                  <q-item-label v-html = "scope.opt.label"/>
                  <q-item-label caption>{{ scope.opt.postcode }}</q-item-label>
                  <q-item-label caption>{{ scope.opt.receiver }}</q-item-label>
                  <q-item-label caption>{{ scope.opt.phoneNumber }}</q-item-label>
                </q-item-section>
              </q-item>
            </template>
          </q-select>

        </q-card-section>

        <q-card-section class = "row justify-center">
          <q-btn outline v-close-popup
                 label = "确认" icon = "o_done" color = "primary"
                 @click = "editAddress"
          />
        </q-card-section>
      </q-card>
    </q-dialog>

  </q-card>
</template>

<script>
import {checkLogin, fetch_s} from "assets/js/utils/fetch_extension";
import {apiInternal} from "src/router";
import {Cookies} from "quasar";
import {addressModel} from "assets/js/model/address_convertor";

export default {
  name: "OrderItem",
  data() {
    return {
      content: {},
      statusColor: 'primary',
      orderDialogStatus: false,
      selectedAddress: null,
      selectableAddresses: []
    }
  },
  props: {
    order: {
      type: Object,
    },
    isNoyPaid: {
      type: Boolean,
    }
  },
  methods: {
    init() {
      this.content = this.order
      this.setStatusColor()
    },
    setStatusColor() {
      switch (this.content.status) {
        case '未支付':
          this.statusColor = 'warning'
          break
        case '退款中':
          this.statusColor = 'negative'
          break
        case '已退款':
          this.statusColor = 'grey'
          break
        case '已收货':
          this.statusColor = 'positive'
          break
        default:
          this.statusColor = 'primary'
          break
      }
    },
    showOrderDialog() {
      checkLogin(() => {
        this.$router.push({path: '/login'})
      })
      let api = apiInternal.api.address.get_by_user_id(Cookies.get('user_id'))
      fetch_s(api.url, {method: api.method}).then(result => {
        let addressList = result.data
        this.selectableAddresses = []
        for (let index in addressList) {
          if (addressList.hasOwnProperty(index)) {
            let option = addressModel(addressList[index])
            option.label = option.address
            this.selectableAddresses.push(option)
            if (option.id === this.content.user_address.id) {
              this.selectedAddress = option
            }
          }
        }
      })
      this.orderDialogStatus = true
    },
    editAddress() {

    },
    buy() {
      let api = apiInternal.api.order.add
      api.body.bookId = this.content.book.id
      api.body.quantity = this.content.quantity
      api.body.totalPrice = this.content.total_price
      api.body.status = 'paid'
      console.log(api)
      this.$q.dialog({
        message: `购买${this.content.quantity}本${this.content.book.name}，共消费${this.content.total_price}元，确定吗？`,
        cancel: true,
        persistent: true
      }).onOk(() => {
        this.doBuy(api)
      })
    },
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

</style>
