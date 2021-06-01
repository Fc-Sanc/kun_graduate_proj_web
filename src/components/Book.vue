<template>
  <q-intersection once
                  transition = "fade"
                  class = "q-ma-sm example-item card-transition">
    <q-card class = "shadow-6">
      <div @click = "maximizedToggle=false; dialogStatus=true">
        <q-img :src = "model.coverUrl" ratio = "1"/>
        <q-card-section class = "row items-baseline">
          <div class = "text-primary text-h6 text-weight-bold ellipsis">{{ model.name }}</div>
          <q-space/>
          <div class = "text-body1 text-grey-8 ellipsis">{{ model.author }}</div>
        </q-card-section>
        <q-separator/>
        <q-card-section class = "row items-baseline">
          <div class = "text-body1 text-warning">{{ model.isLiked ? '已收藏' : '' }}</div>
          <q-space/>
          <div class = "text-h5 text-accent text-weight-bold">¥{{ model.price }}</div>
        </q-card-section>
      </div>
      <q-expansion-item expand-separator
                        icon = "more" :label = "model.brief != null ? model.brief.substr(0,10)+'...' : ''">
        <q-card>
          <q-card-section>
            {{ model.brief }}
          </q-card-section>
        </q-card>
      </q-expansion-item>
    </q-card>

    <q-dialog persistent
              v-model = "dialogStatus" :maximized = "maximizedToggle"
              transition-show = "slide-up" transition-hide = "slide-down">
      <q-card
        style = "min-width: 60vw">

        <q-bar>
          <q-space/>
          <q-btn dense flat icon = "minimize" @click = "maximizedToggle = false" :disable = "!maximizedToggle">
            <q-tooltip v-if = "maximizedToggle" content-class = "bg-white text-primary">Minimize</q-tooltip>
          </q-btn>
          <q-btn dense flat icon = "crop_square" @click = "maximizedToggle = true" :disable = "maximizedToggle">
            <q-tooltip v-if = "!maximizedToggle" content-class = "bg-white text-primary">Maximize</q-tooltip>
          </q-btn>
          <q-btn dense flat icon = "close" v-close-popup>
            <q-tooltip content-class = "bg-white text-primary">Close</q-tooltip>
          </q-btn>
        </q-bar>
        <q-card-section
          style = "max-height: 70vh"
          class = "scroll">
          <q-card-section class = "row justify-evenly">
            <q-card-section>
              <q-img width = "200px" :src = "model.coverUrl" ratio = "1">
                <div class = "absolute-bottom text-subtitle1 text-center">
                  {{ model.name }} - {{ model.author }}
                </div>
              </q-img>
              <div class = "text-body2 text-center text-grey">
                ISBN: {{ model.isbn }}
              </div>
            </q-card-section>
            <q-card-section class = "column items-end">
              <div class = "q-pb-sm text-body2">类型: {{ model.type }}</div>
              <div class = "q-pb-sm text-body2">语言: {{ model.language }}</div>
              <div class = "q-pb-sm text-body2">出版社: {{ model.publish }}</div>
              <div class = "q-pb-sm text-body2">销量: {{ model.sales }}</div>
              <div class = "q-pb-sm text-body2">库存: {{ model.quantity }}</div>
              <div class = "q-pb-sm text-h6 text-accent text-weight-bold">单价: ¥{{ model.price }}</div>
              <div class = "q-pb-sm text-h6 text-accent text-weight-bold">总价: ¥{{ model.price * count }}</div>
              <div class = "row justify-center items-baseline">
                <div class = "text-h6">数量:</div>
                <q-input outlined dense @input = "changeCount"
                         v-model.number = "count" type = "number"/>
              </div>
            </q-card-section>
            <q-card-actions class = "row justify-end">
              <q-btn push no-caps
                     icon = "add_shopping_cart" color = "info" label = "加入购物车"
                     :disable = "disableFavorite"
                     @click = "showOrderDialog(false)"
                     class = "q-ma-sm btn"/>
              <q-btn push no-caps
                     color = "positive" icon = "payments" label = "立即购买"
                     :disable = "disableFavorite"
                     @click = "showOrderDialog(true)"
                     class = "q-ma-sm btn"/>
              <q-btn push no-caps
                     color = "warning" :icon = "model.isLiked ? 'done' : 'favorite'"
                     :disable = "disableFavorite"
                     :loading = "likedWaiting"
                     :label = "model.isLiked ? '已收藏' : '收藏'"
                     @click = "toggleLike"
                     class = "q-ma-sm btn">
              </q-btn>
            </q-card-actions>
          </q-card-section>
          <q-separator/>
          <q-card-section class = "column">
          </q-card-section>
          <q-separator/>
          <q-card-section class = "column">
            <div class = "text-h6 border q-pb-md">
              书籍简介
            </div>
            <div class = "text-body1">
              {{ model.brief }}
            </div>
          </q-card-section>
        </q-card-section>
      </q-card>
    </q-dialog>

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
                 @click = "save"
          />
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-intersection>
</template>

<script>
import {get_image_url} from "assets/js/api/api_internal";
import {checkLogin, fetch_s} from "assets/js/utils/fetch_extension";
import {apiInternal} from "src/router";
import {addressModel} from "assets/js/model/address_convertor";
import {Cookies} from "quasar";

export default {
  name: "Book",
  data() {
    return {
      model: {},
      dialogStatus: false,
      orderDialogStatus: false,
      buy: false,
      maximizedToggle: false,
      likedWaiting: false,
      disableFavorite: false,
      count: 1,
      selectedAddress: null,
      selectableAddresses: []
    }
  },
  methods: {
    init() {
      this.model = this.book
      if (!this.model.coverUrl.startsWith('http')) {
        this.model.coverUrl = get_image_url(this.model.coverUrl)
      }
      this.loadLike()
    },
    loadLike() {
      let userId = this.$q.cookies.get('user_id')
      if (userId == null) {
        this.disableFavorite = true
      } else {
        let api = apiInternal.api.fav.is_liked_by_user(userId, this.model.id)
        fetch_s(api.url, {
          method: api.method
        }).then(result => {
          this.model.isLiked = result.data
        })
      }
    },
    toggleLike() {
      this.likedWaiting = true
      if (this.model.isLiked) {
        let add_api = apiInternal.api.fav.remove
        add_api.body.userId = this.$q.cookies.get('user_id')
        add_api.body.bookId = this.model.id
        fetch_s(add_api.url, {
          method: add_api.method,
          body: JSON.stringify(add_api.body),
          headers: {
            'Content-Type': 'application/json;charset=UTF-8'
          }
        }).then(result => {
          setTimeout(() => {
            this.likedWaiting = false
            this.model.isLiked = false
          }, 500)
        })
      } else {
        let add_api = apiInternal.api.fav.add
        add_api.body.userId = this.$q.cookies.get('user_id')
        add_api.body.bookId = this.model.id
        fetch_s(add_api.url, {
          method: add_api.method,
          body: JSON.stringify(add_api.body),
          headers: {
            'Content-Type': 'application/json;charset=UTF-8'
          }
        }).then(result => {
          setTimeout(() => {
            this.likedWaiting = false
            this.model.isLiked = true
          }, 500)
        })
      }
    },
    changeCount(val) {
      if (val <= 0) {
        this.$q.notify('不可以调皮哦')
        this.count = 1
      }
    },
    showOrderDialog(buy) {
      checkLogin(() => {
        this.$router.push({path: '/login'})
      })
      this.buy = buy
      let api = apiInternal.api.address.get_by_user_id(Cookies.get('user_id'))
      fetch_s(api.url, {method: api.method}).then(result => {
        let addressList = result.data
        this.selectableAddresses = []
        for (let index in addressList) {
          if (addressList.hasOwnProperty(index)) {
            let option = addressModel(addressList[index])
            option.label = option.address
            this.selectableAddresses.push(option)
            if (option.isDefault) {
              this.selectedAddress = option
            }
          }
        }
      })
      this.orderDialogStatus = true
    },
    save() {
      if (this.selectedAddress) {
        let api = apiInternal.api.order.add
        api.body.bookId = this.model.id
        api.body.userAddressId = this.selectedAddress.id
        api.body.quantity = this.count
        api.body.totalPrice = this.count * this.model.price
        if (this.buy) {
          api.body.status = 'paid'
          this.$q.dialog({
            message: `购买${this.count}本${this.model.name}，共消费${api.body.totalPrice}元，确定吗？`,
            cancel: true,
            persistent: true
          }).onOk(() => {
            this.doBuy(api)
          })
        } else {
          api.body.status = 'not_pay'
          this.doBuy(api)
        }
      }
    },
    doBuy(api) {
      fetch_s(api.url, {
        method: api.method,
        body: JSON.stringify(api.body),
        headers: {
          'Content-Type': 'application/json;charset=UTF-8'
        }
      }).then(result => {
        if (result.data == null) {
          this.$q.notify({
            message: '下单失败，请检查余额是否充足',
            color: 'warning',
            icon: 'close',
            position: 'center',
            progress: true,
            timeout: 1000,
          })
        } else {
          this.$q.notify({
            message: this.buy ? '购买成功，请在订单中查看' : '添加成功，请在购物车中查看',
            color: 'primary',
            icon: 'done_all',
            position: 'center',
            progress: true,
            timeout: 1000,
          })
        }
        this.dialogStatus = false
      })
    }
  },
  props: {
    book: {
      type: Object
    }
  },
  mounted() {
    this.init()
  },
}
</script>

<style scoped>
.card-transition {
  min-height: 40px;
  width: 300px;
}

.card-detail {
  min-width: 600px;
}

.btn {
  width: 10vw;
}

.dialog-detail {
  width: 60vw;
}
</style>
