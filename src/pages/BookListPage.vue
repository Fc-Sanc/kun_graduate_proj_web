<template>
  <q-page>
    <q-tabs v-model = "crtTab" align = "justify" indicator-color = "primary"
            class = "bg-white text-black shadow-2">
      <q-tab name = "goodSales" label = "热卖品"/>
      <q-tab name = "explore" label = "浏览"/>
      <q-tab name = "findByType" label = "类别"/>
    </q-tabs>

    <div>&nbsp;</div>

    <q-tab-panels animated v-model = "crtTab">

      <q-tab-panel name = "goodSales" class = "column justify-center items-center">
        <div class = "text-h5 q-pb-md">Top 16</div>
        <div style = "text-align: center"
             class = "row items-center justify-start">
          <Book v-for = "book in books_in_best_sales" :key = "book.id" :book = "book"/>
        </div>
      </q-tab-panel>

      <q-tab-panel name = "explore" class = "column justify-center items-center">
        <div style = "text-align: center"
             class = "row items-center justify-start">
          <div v-for = "book in books_in_explore.content" :key = "book.id">
            <Book :book = "book"/>
          </div>
        </div>
        <q-pagination boundary-numbers boundary-links
                      v-model = "books_in_explore.crt_page" :max-pages = "6" :max = "books_in_explore.total_pages"
                      @input = "val => explorePagination(val)"
                      class = "q-ma-md"/>
      </q-tab-panel>

      <q-tab-panel name = "findByType">
        <div class = "row col-3">
          <div>
            <q-list dense bordered
                    class = "rounded-borders bg-primary">
              <div>
                <q-item clickable
                        @click = "typePagination(1, '')"
                        class = "bg-primary text-white text-center row items-center">
                  <q-icon name = "bookmark"
                          class = "q-pr-sm"/>
                  <q-item-section>
                    <q-item-label class = "text-weight-bold">全部</q-item-label>
                  </q-item-section>
                </q-item>
              </div>

              <div v-for = "type in types" :key = "type" @click = "typePagination(1, type)">
                <q-separator color = "secondary"/>
                <q-item clickable
                        class = "bg-primary text-white text-center row items-center">
                  <q-icon name = "bookmark"
                          class = "q-pr-sm"/>
                  <q-item-section>
                    <q-item-label class = "text-weight-bold">{{ type }}</q-item-label>
                  </q-item-section>
                </q-item>
              </div>

            </q-list>
          </div>
          <div
            class = "column items-center justify-center col-9">
            <div
              class = "row items-center justify-start">
              <div v-for = "book in books_in_type.content" :key = "book.id">
                <Book :book = "book"/>
              </div>
            </div>
            <q-pagination boundary-numbers boundary-links
                          v-model = "books_in_type.crt_page" :max-pages = "6" :max = "books_in_type.total_pages"
                          @input = "val => typePagination(val, crt_type)"
                          class = "q-ma-md"/>
          </div>
        </div>
      </q-tab-panel>

    </q-tab-panels>

  </q-page>
</template>

<script>
import Book from "components/Book";
import {apiInternal} from "src/router";
import {fetch_s} from "assets/js/utils/fetch_extension";
import {bookModel} from "assets/js/model/book_convertor";

export default {
  name: "BookListPage",
  components: {Book},
  data() {
    return {
      crtTab: 'goodSales',
      best_sales: apiInternal.api.book.best_sales,
      page_size: 12,
      books_in_best_sales: [],
      books_in_explore: {
        content: [],
        crt_page: 1,
        total_pages: 1
      },
      books_in_type: {
        content: [],
        crt_page: 1,
        total_pages: 1
      },
      types: [],
      crt_type: ''
    }
  },
  methods: {
    init() {
      this.fetchBestSales()
      this.explorePagination(1)
      this.typePagination(1, '')
      this.loadTypes()
    },
    fetchBestSales() {
      fetch_s(this.best_sales.url, {
        method: this.best_sales.method
      }).then(result => {
        this.books_in_best_sales = []
        for (let index in result.data) {
          if (result.data.hasOwnProperty(index)) {
            let model = bookModel(result.data[index])
            this.books_in_best_sales.push(model)
          }
        }
      })
    },
    explorePagination(page) {
      let api = apiInternal.api.book.get(page - 1, this.page_size, '')
      fetch_s(api.url, {
        method: api.method
      }).then(result => {
        this.books_in_explore.content = []
        this.books_in_explore.total_pages = result.data.total_pages
        for (let index in result.data.content) {
          if (result.data.content.hasOwnProperty(index)) {
            let model = bookModel(result.data.content[index])
            this.books_in_explore.content.push(model)
          }
        }
      })
    },
    typePagination(page, type) {
      this.crt_type = type
      let api = apiInternal.api.book.get(page - 1, this.page_size, type)
      fetch_s(api.url, {
        method: api.method
      }).then(result => {
        this.books_in_type.content = []
        this.books_in_type.total_pages = result.data.total_pages
        for (let index in result.data.content) {
          if (result.data.content.hasOwnProperty(index)) {
            let model = bookModel(result.data.content[index])
            this.books_in_type.content.push(model)
          }
        }
      })
    },
    loadTypes() {
      let api = apiInternal.api.type.get_all
      fetch_s(api.url, {
        method: api.method
      }).then(result => {
        this.types = []
        for (let type in result.data) {
          if (result.data.hasOwnProperty(type)) {
            this.types.push(result.data[type].name)
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

</style>
