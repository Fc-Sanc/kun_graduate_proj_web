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
               class = "q-px-md"/>

        <q-btn label = "修改送货地址" color = "info" icon = "local_shipping"
               class = "q-px-md"/>

        <q-btn label = "取消" color = "warning" icon = "clear"
               class = "q-px-md"/>

      </q-card-actions>
      <q-card-actions v-else
                      class = "q-gutter-md">
        <q-btn v-if = "content.status === '已发货' || content.status === '已支付'"
               label = "修改送货地址" color = "info" icon = "local_shipping"
               class = "q-px-md"/>

        <q-btn label = "退款" color = "warning" icon = "clear"
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

  </q-card>
</template>

<script>
export default {
  name: "OrderItem",
  data() {
    return {
      content: {},
      statusColor: 'primary',
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
    }
  },
  mounted() {
    this.init()
  }
}
</script>

<style scoped>

</style>
