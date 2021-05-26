<template>
  <div v-if = "split">
    <q-separator v-if = "split"/>

  </div>
  <q-item
    v-else
    clickable
    tag = "a"
    target = "_self"
    :href = "link"
  >
    <q-item-section
      v-if = "icon"
      avatar
    >
      <q-icon :name = "icon"/>
    </q-item-section>

    <q-item-section>
      <q-item-label>{{ title }}</q-item-label>
      <q-item-label caption>{{ caption }}</q-item-label>
    </q-item-section>
  </q-item>
</template>

<script>
import Book from "components/Book";

export default {
  name: 'EssentialLink',
  props: {
    title: {
      type: String,
    },

    caption: {
      type: String,
      default: ''
    },

    link: {
      type: String,
      default: '#'
    },

    icon: {
      type: String,
      default: ''
    },

    split: {
      type: Boolean,
      default: false
    }
  }
}
</script>
