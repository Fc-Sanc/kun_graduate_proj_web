<template>
  <q-page>
    <q-card class = "q-ma-md shadow-6 card-page">

      <q-card-section>
        <div class = "text-h5 text-weight-bold">我的收藏</div>
      </q-card-section>

      <q-card-section v-if = "books.length > 0">
        <div class = "text-h6">共<span class = "text-primary">{{ books.length }}</span>条结果</div>
        <q-separator/>
      </q-card-section>

      <q-card-section v-if = "books.length > 0">
        <div class = "row justify-start">
          <Book v-for = "book in books" :key = "book.id" :book = "book"/>
        </div>
      </q-card-section>
      <q-card-section v-else>
        <div class = "row items-center justify-center q-pt-xl">
          <q-icon name = "sentiment_dissatisfied" color = "primary"
                  style = "font-size: 4rem"/>
          <div
            style = "font-size: 2rem"
            class = "text-h6">
            暂时没有收藏哦
          </div>
        </div>
      </q-card-section>

    </q-card>

  </q-page>
</template>

<script>
import {apiInternal} from "src/router";
import {fetch_s} from "assets/js/utils/fetch_extension";
import {bookModel} from "assets/js/model/book_convertor";
import Book from "components/Book";

export default {
  name: "FavoritePage",
  components: {Book},
  data() {
    return {
      books: [],
    }
  },
  methods: {
    init() {
      let userId = this.$q.cookies.get('user_id')
      if (!userId) {
        this.$q.notify("请登录后再进行操作")
        this.$router.push({path: '/login'})
      } else {
        let api = apiInternal.api.fav.get_by_user_id(userId)
        fetch_s(api.url, {
          method: api.method,
          headers: {
            'Content-Type': 'application/json;charset=UTF-8'
          }
        }).then(result => {
          let favorites = result.data
          this.books = []
          for (let index in favorites) {
            if (favorites.hasOwnProperty(index)) {
              console.log(favorites[index])
              this.books.push(bookModel(favorites[index].book))
            }
          }
          console.log(this.books)
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
