<template>
  <q-page>
    <q-card class = "q-ma-md shadow-6 card-page">

      <q-card-section>
        <div class = "text-h5 text-weight-bold">我的购物车</div>
      </q-card-section>

      <q-card-section v-if = "shopping_cart.count > 0">
        <div class = "text-h6">共<span class = "text-primary">{{ shopping_cart.count }}</span>条结果</div>
        <q-separator/>
      </q-card-section>

      <q-card-section v-if = "shopping_cart.count > 0">
        <OrderItem v-for = "order in shopping_cart.models" :key = "order.id" :order = "order" :is-noy-paid = "true"/>
      </q-card-section>
      <q-card-section v-else>
        <div class = "row items-center justify-center q-pt-xl">
          <q-icon name = "sentiment_dissatisfied" color = "primary"
                  style = "font-size: 4rem"/>
          <div
            style = "font-size: 2rem"
            class = "text-h6">
            购物车暂时为空
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
import {apiInternal} from "src/router";
import {Cookies} from "quasar";
import {fetch_s} from "assets/js/utils/fetch_extension";
import OrderItem from "components/OrderItem";
import {orderModel} from "assets/js/model/order_convertor";

export default {
  name: "ShoppingCartPage",
  components: {OrderItem},
  data() {
    return {
      shopping_cart: {
        models: [],
        count: 0,
      },
    }
  },
  methods: {
    init() {
      let userId = Cookies.get('user_id')
      if (userId != null) {
        let api = apiInternal.api.order.shopping_cart
        fetch_s(api.url, {method: api.method}).then(result => {
          let shopping_cart = result.data
          console.log(result.data)
          this.shopping_cart.count = result.data.length
          for (let index in shopping_cart) {
            if (shopping_cart.hasOwnProperty(index)) {
              this.shopping_cart.models.push(orderModel(shopping_cart[index]))
            }
          }
        })
      }
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
