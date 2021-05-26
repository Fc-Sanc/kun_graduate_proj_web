<template>
  <q-layout view = "hHh LpR fFr">
    <q-header elevated>
      <q-toolbar>
        <q-btn flat @click = "toIndex">
          <q-icon name = "auto_stories" size = "md"/>

          <q-toolbar-title>
            Next Page
          </q-toolbar-title>
        </q-btn>

        <q-space/>

        <UserInfoBar class = "q-mr-sm"/>

        <!--        <q-btn flat @click = "rightDrawerOpen = !rightDrawerOpen" icon = "menu"/>-->

      </q-toolbar>
    </q-header>

    <q-drawer
      v-model = "leftDrawerOpen"
      show-if-above
      bordered
      :mini = "miniState"
      @mouseover = "miniState = false"
      @mouseout = "miniState = true"
      content-class = "bg-grey-1"
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
      <router-view/>
    </q-page-container>

    <q-footer>
      <q-toolbar>
        <div>Quasar v{{ $q.version }}</div>
      </q-toolbar>
    </q-footer>

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
      essentialLinks: user_left_link_data
    }
  },
  methods: {
    toIndex() {
      this.$router.push({path: '/'})
    }
  }
}
</script>

<style>
* {
  font-family: "Comic Sans MS", 'Sarasa UI SC', monospace;
}
</style>
