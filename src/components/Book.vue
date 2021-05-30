<template>
  <q-intersection once
                  transition = "rotate"
                  class = "q-ma-sm example-item card-transition">
    <q-card class = "shadow-6">
      <div @click = "maximizedToggle=false; dialogStatus=true">
        <q-img :src = "model.coverUrl"/>
        <q-card-section class = "row items-baseline">
          <div class = "text-primary text-h6 text-weight-bold">{{ model.name }}</div>
          <q-space/>
          <div class = "text-body1 text-grey-8">{{ model.author }}</div>
        </q-card-section>
        <q-separator/>
        <q-card-section class = "row items-baseline">
          <div class = "text-body1">{{ model.type }}</div>
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
              <q-btn push icon = "add_shopping_cart" color = "info" no-caps label = "shopping cart" class = "q-ma-sm"/>
              <q-btn push color = "positive" icon = "payments" no-caps label = "buy now!" class = "q-ma-sm"/>
              <q-btn push no-caps :disable = "disableFavorite"
                     :loading = "likedWaiting"
                     color = "warning" :icon = "model.isLiked ? 'done' : 'favorite'"
                     :label = "model.isLiked ? '已收藏' : '收藏'"
                     @click = "toggleLike"
                     class = "q-ma-sm">
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
  </q-intersection>
</template>

<script>
import {get_image_url} from "assets/js/api/api_internal";
import {fetch_s} from "assets/js/utils/fetch_extension";
import {apiInternal} from "src/router";

export default {
  name: "Book",
  data() {
    return {
      model: {
        id: 1,
        publishingTime: 1620996118000,
        name: '好书好书好书好书好书好书好书',
        coverUrl: 'default',
        author: '我',
        price: 200.00,
        brief: `尽信书不如无书,尽信书不如无书,尽信书不如无书,尽信书不如无书,尽信书不如无书,尽信书不如无书,
        尽信书不如无书,尽信书不如无书,尽信书不如无书,尽信书不如无书,尽信书不如无书,尽信书不如无书,
        尽信书不如无书,尽信书不如无书,尽信书不如无书,尽信书不如无书,尽信书不如无书,尽信书不如无书,
        尽信书不如无书,尽信书不如无书,尽信书不如无书,尽信书不如无书,尽信书不如无书,尽信书不如无书,
        尽信书不如无书,尽信书不如无书,尽信书不如无书,尽信书不如无书,尽信书不如无书,尽信书不如无书`,
        type: '文学刊物',
        sales: 10000,
        publish: '啥也不是出版社',
        isbn: '000000000000',
        quantity: 1,
        language: 'chinese',
        isLiked: false,
      },
      dialogStatus: false,
      maximizedToggle: false,
      likedWaiting: false,
      disableFavorite: false,
      count: 1,
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
    toggleLike() { // 等调用接口的
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
          this.likedWaiting = false
          this.model.isLiked = false
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
          this.likedWaiting = false
          this.model.isLiked = true
        })
      }
    },
    changeCount(val) {
      if (val <= 0) {
        this.$q.notify('不可以调皮哦')
        this.count = 1
      }
    },
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
</style>
