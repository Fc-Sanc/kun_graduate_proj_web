<template>
  <q-page class = "flex flex-center column">
    <div class = "text-h4 text-primary">
      开卷有益
    </div>

    <q-img
      width = "450px"
      alt = "cover-image"
      :src = "home_page_img"/>

    <q-ajax-bar position = "top"/>
  </q-page>
</template>

<script>
import RegisterBox from "components/RegisterBox";
import {get_image_url} from "assets/js/api/api_internal";

export default {
  name: 'PageIndex',
  data() {
    return {
      home_page_img: get_image_url("jpg/%E7%89%A7%E5%9C%BA%E7%89%A9%E8%AF%AD.jpg")
    }
  },
  methods: {}
}
</script>
