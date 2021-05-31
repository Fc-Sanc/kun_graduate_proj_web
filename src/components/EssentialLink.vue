<template>
  <div v-if = "split"
       class = "q-px-md">
    <q-separator v-if = "split"/>
  </div>
  <q-item v-else clickable
          tag = "a" target = "_self" :href = "link">
    <q-item-section v-if = "icon" avatar>
      <q-icon :name = "icon" color = "secondary"/>
    </q-item-section>

    <q-item-section>
      <q-item-label class = "text-grey-14">{{ title }}</q-item-label>
<!--      <q-item-label caption>{{ caption }}</q-item-label>-->
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
