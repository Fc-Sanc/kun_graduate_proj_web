<template>
  <q-page>
    <q-card class = "q-ma-md shadow-6">

      <q-card-section>
        <div class = "text-h5 text-weight-bold">搜索结果</div>
      </q-card-section>

      <q-card-section>
        <div class = "text-h6">共<span class = "text-primary">{{ books.total_element_size }}</span>条结果</div>
      </q-card-section>

      <q-card-section>
        <div class = "row justify-start">
          <Book v-for = "book in books.content" :key = "book.id" :book = "book"/>
        </div>
      </q-card-section>

      <q-card-section class = "row justify-center">
        <q-pagination boundary-numbers boundary-links
                      v-model = "books.crt_page" :max-pages = "6" :max = "books.total_pages"
                      class = "q-ma-md"/>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
import Book from "components/Book";
import {apiInternal} from "src/router";
import {fetch_s} from "assets/js/utils/fetch_extension";
import {bookModel} from "assets/js/model/book_convertor";

export default {
  name: "SearchPage",
  components: {Book},
  data() {
    return {
      keyword: '',
      pageSize: 12,
      books: {
        content: [],
        crt_page: 1,
        total_pages: 1,
        total_element_size: 0
      },
    }
  },
  methods: {
    init() {
      this.keyword = this.$route.query.keyword
      this.search()
    },
    search() {
      let api = apiInternal.api.book.search(this.keyword, this.books.crt_page - 1, this.pageSize)
      this.$q.loading.show({delay: 0})
      fetch_s(api.url, {
        method: api.method
      }).then(result => {
        let books = result.data.content
        this.books.crt_page = result.data.crt_page + 1
        this.books.total_pages = result.data.total_pages
        this.books.total_element_size = result.data.total_element_size
        for (let index in books) {
          if (books.hasOwnProperty(index)) {
            console.log(index)
            this.books.content.push(bookModel(books[index]))
          }
        }
        setTimeout(() => {
        this.$q.loading.hide()
        }, 500)
      })
    }
  },
  mounted() {
    this.init()
  }
}
</script>

<style scoped>

</style>
