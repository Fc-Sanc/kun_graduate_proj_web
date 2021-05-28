<template>
  <q-intersection transition = "fade" class = "q-ma-sm example-item card-transition">
    <q-card class = "shadow-6">
      <div @click = "dialogStatus=true">
        <q-img src = "https://cdn.quasar.dev/img/parallax1.jpg"/>
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
      <q-expansion-item expand-separator :label = "model.brief.substr(0,10)+'...'" icon = "more">
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
      <q-card class = "card-detail">
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
        <q-card-section class = "row justify-evenly">
          <q-img width = "200px" src = "https://cdn.quasar.dev/img/parallax1.jpg" ratio = "1">
            <div class = "absolute-bottom text-subtitle1 text-center">
              {{ model.name }} - {{ model.author }}
            </div>
          </q-img>
          <q-card-section class = "column items-end">
            <div class = "q-pa-sm text-body1">销量: {{ model.sales }}</div>
            <div class = "q-pa-sm text-body1">库存: {{ model.quantity }}</div>
            <div class = "q-pa-sm text-h5 text-accent text-weight-bold">售价:¥{{ model.price }}</div>
          </q-card-section>
        </q-card-section>
        <q-separator/>
        <q-card-section class = "column">
          <q-card-section class = "row justify-evenly">
            <div class = "text-body2">
              ISBN: {{ model.isbn }}
            </div>
            <div class = "text-body2">
              类型: {{ model.type }}
            </div>
          </q-card-section>
          <q-card-section class = "row justify-evenly">
            <div class = "text-body2">
              语言: {{ model.language }}
            </div>
            <div class = "text-body2">
              出版社: {{ model.publish }}
            </div>
          </q-card-section>
        </q-card-section>
        <q-separator/>
        <q-card-section class = "column">
          <div class = "text-h6 border">
            书籍简介
          </div>
          <div class = "text-body1">
            {{ model.brief }}
          </div>
        </q-card-section>
        <q-card-section>

        </q-card-section>
        <q-card-actions class = "row justify-evenly">
          <q-btn push icon = "add_shopping_cart" color = "info" no-caps label = "shopping cart" class = "q-ma-sm"/>
          <q-btn push color = "positive" icon = "payments" no-caps label = "buy now!" class = "q-ma-sm"/>
          <q-btn push color = "warning" icon = "star" no-caps label = "favorite" class = "q-ma-sm"/>
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-intersection>
</template>

<script>
export default {
  name: "Book",
  data() {
    return {
      model: {
        name: '好书好书好书好书好书好书好书',
        author: '我',
        'price': 200.00,
        brief: `尽信书不如无书,尽信书不如无书,尽信书不如无书,尽信书不如无书,尽信书不如无书,尽信书不如无书,
        尽信书不如无书,尽信书不如无书,尽信书不如无书,尽信书不如无书,尽信书不如无书,尽信书不如无书,
        尽信书不如无书,尽信书不如无书,尽信书不如无书,尽信书不如无书,尽信书不如无书,尽信书不如无书,
        尽信书不如无书,尽信书不如无书,尽信书不如无书,尽信书不如无书,尽信书不如无书,尽信书不如无书,
        尽信书不如无书,尽信书不如无书,尽信书不如无书,尽信书不如无书,尽信书不如无书,尽信书不如无书`,
        'coverUrl': '',
        type: '文学刊物',
        sales: 10000,
        publish: '啥也不是出版社',
        isbn: '000000000000',
        quantity: 1,
        language: 'chinese',
      },
      dialogStatus: false,
      maximizedToggle: true
    }
  }
}
</script>

<style scoped>
.card-transition {
  min-height: 250px;
  width: 300px;
}

.card-detail {
  min-width: 600px;
}
</style>
