<template>
  <q-intersection transition = "fade" class = "q-ma-md example-item card-transition">
    <q-card clickable class = "shadow-8" @click = "dialogStatus=true">
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
        <div class = "text-h5 text-accent text-weight-bold">{{ model.price }}元</div>
      </q-card-section>

    </q-card>

    <q-dialog persistent v-model = "dialogStatus">
      <q-card class = "card-detail">
        <q-btn icon = "close" no-caps label = "close" class = "q-ma-sm float-right" @click = "dialogStatus=false"/>
        <q-card-section class = "row justify-evenly">
          <q-img width = "200px" src = "https://cdn.quasar.dev/img/parallax1.jpg" ratio="9/16"/>
          <q-card-section class = "items-baseline">
            <div class = "text-primary text-h6 text-weight-bold">{{ model.name }}</div>
            <q-space/>
            <div class = "text-body1 text-grey-8">{{ model.author }}</div>
          </q-card-section>
          <q-card-section class = "row items-baseline">
            <div class = "text-body1">{{ model.type }}</div>
            <q-space/>
            <div class = "text-h5 text-accent text-weight-bold">{{ model.price }}元</div>
          </q-card-section>
        </q-card-section>
        <q-separator/>

        <q-expansion-item expand-separator :label = "model.brief.substr(0,10)+'...'" icon = "more">
          <q-card>
            <q-card-section>
              {{ model.brief }}
            </q-card-section>
          </q-card>
        </q-expansion-item>
        <q-card-section class = "row justify-evenly">
          <q-btn icon = "add_shopping_cart" color = "info" no-caps label = "shopping cart" class = "q-ma-sm"/>
          <q-btn color = "warning" icon = "payments" no-caps label = "buy now!" class = "q-ma-sm"/>
          <q-btn icon = "star" no-caps label = "favorite" class = "q-ma-sm"/>
        </q-card-section>
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
        name: '好书',
        author: '我',
        'price': 200.00,
        brief: '尽信书不如无书,尽信书不如无书,尽信书不如无书,尽信书不如无书,尽信书不如无书,尽信书不如无书',
        'coverUrl': '',
        type: '文学',
      },
      dialogStatus: false
    }
  }
}
</script>

<style scoped>
.card-transition {
  min-height: 400px;
  width: 300px;
}

.card-detail {
  min-height: 700px;
  min-width: 600px;
}
</style>
