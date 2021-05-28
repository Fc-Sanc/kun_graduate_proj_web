<template>
  <q-page>
    <q-tabs v-model = "crtTab" class = "bg-primary text-white" align = "justify">
      <q-tab name = "goodSales" label = "热卖品"/>
      <q-tab name = "explore" label = "浏览"/>
      <q-tab name = "findByType" label = "类别"/>
    </q-tabs>
    <div class = "column justify-center items-center">
      <div class = "row items-center justify-center">
        <div v-for = "book in books" :key = "book.id">
          <Book/>
        </div>
      </div>
      <q-pagination class = "q-ma-md" v-model = "crtPage" boundary-numbers boundary-links :max-pages = "6" :max = "10"/>
    </div>

  </q-page>
</template>

<script>
import Book from "components/Book";

export default {
  name: "BookListPage",
  components: {Book},
  data() {
    return {
      crtPage: 1,
      crtTab: 'goodSales',
      books: []
    }
  },
  methods: {
    init() {
      for (let i = 0; i < 8; i++) {
        this.books.push({id: i})
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
