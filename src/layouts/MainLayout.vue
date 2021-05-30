<template>
  <q-layout view = "hHh LpR fFr">
    <q-header elevated>
      <q-toolbar>
        <q-btn no-caps flat
               @click = "toIndex">
          <q-icon name = "auto_stories" size = "md"/>
          <div class = "text-h6 q-pl-md">
            Next Page
          </div>
        </q-btn>

        <q-space/>

        <div class = "row">
          <q-input dark dense standout
                   v-model = "searchText" placeholder = "请输入搜索内容"
                   style = "width: 400px"
                   class = "col">
            <template v-slot:append>
              <q-icon v-if = "searchText !== ''" name = "clear" class = "cursor-pointer" @click = "searchText = ''"/>
            </template>
          </q-input>
          <q-btn dense flat
                 icon = "search"
                 @click = "search"
                 class = "q-mx-sm"/>
        </div>

        <q-space/>

        <UserInfoBar class = "q-mr-sm"/>

      </q-toolbar>
    </q-header>

    <q-drawer
      v-model = "leftDrawerOpen"
      show-if-above
      bordered
      :mini = "miniState"
      @mouseover = "miniState = false"
      @mouseout = "miniState = true"
    >
      <q-list>
        <EssentialLink
          v-for = "link in essentialLinks"
          :key = "link.title"
          v-bind = "link"
        />
      </q-list>
    </q-drawer>

    <!--    <q-drawer side = "right" bordered elevated v-model = "rightDrawerOpen">-->
    <!--      <q-list>-->
    <!--        <EssentialLink-->
    <!--          v-for = "link in essentialLinks"-->
    <!--          :key = "link.title"-->
    <!--          v-bind = "link"-->
    <!--        />-->
    <!--      </q-list>-->
    <!--    </q-drawer>-->

    <q-page-container>
      <router-view :key = "$route.query.t"/>
    </q-page-container>

    <!--    <q-footer>-->
    <!--      <q-toolbar>-->
    <!--        <div>Quasar v{{ $q.version }}</div>-->
    <!--      </q-toolbar>-->
    <!--    </q-footer>-->

  </q-layout>
</template>

<script>
import EssentialLink from 'components/EssentialLink.vue'
import UserInfoBar from "components/UserInfoBar";
import {user_left_link_data} from "assets/js/link/user_left_link";


export default {
  name: 'MainLayout',
  components: {UserInfoBar, EssentialLink},
  data() {
    return {
      miniState: true,
      leftDrawerOpen: false,
      rightDrawerOpen: false,
      essentialLinks: user_left_link_data,
      searchText: '',
    }
  },
  methods: {
    toIndex() {
      this.$router.push({path: '/'})
    },
    search() {
      this.$router.push({
        path: '/search', query: {
          keyword: this.searchText,
          t: Date.now()
        }
      })
    }
  }
}
</script>

<style>
* {
  font-family: "Comic Sans MS", 'Sarasa UI SC', monospace;
}
</style>
