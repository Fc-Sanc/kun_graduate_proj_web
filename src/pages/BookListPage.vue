<template>
  <q-page>
    <div class = "column justify-center items-center">
      <div class = "row">
        <Book v-for = "count in 20" :key = "count"/>
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
      crtPage: 1
    }
  }
}
</script>

<style scoped>

</style>
