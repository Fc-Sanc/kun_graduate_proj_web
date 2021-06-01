<template>
  <q-page>
    <q-card class = "q-ma-md shadow-6 card-page">

      <q-card-section>
        <div class = "text-h5 text-weight-bold">我的订单</div>
      </q-card-section>

      <q-card-section v-if = "orders.count > 0">
        <div class = "text-h6">共<span class = "text-primary">{{ orders.count }}</span>条结果</div>
        <q-separator/>
      </q-card-section>

      <q-card-section v-if = "orders.count > 0">
        <OrderItem v-for = "order in orders.models" :key = "order.id" :order = "order" :is-noy-paid = "false"/>
      </q-card-section>
      <q-card-section v-else>
        <div class = "row items-center justify-center q-pt-xl">
          <q-icon name = "sentiment_dissatisfied" color = "primary"
                  style = "font-size: 4rem"/>
          <div
            style = "font-size: 2rem"
            class = "text-h6">
            暂时没有订单哦
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
import {apiInternal} from "src/router";
import {Cookies} from "quasar";
import {checkLogin, fetch_s} from "assets/js/utils/fetch_extension";
import OrderItem from "components/OrderItem";
import {orderModel} from "assets/js/model/order_convertor";

export default {
  name: "OrdersPage",
  components: {OrderItem},
  data() {
    return {
      orders: {
        models: [],
        count: 0,
      },
    }
  },
  methods: {
    init() {
      checkLogin(() => {
        this.$router.push({path: '/login'})
      })
      let api = apiInternal.api.order.orders
      fetch_s(api.url, {method: api.method}).then(result => {
        let orders = result.data
        this.orders.count = result.data.length
        for (let index in orders) {
          if (orders.hasOwnProperty(index)) {
            this.orders.models.push(orderModel(orders[index]))
          }
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
.card-page {
  min-height: 350px;
}
</style>
