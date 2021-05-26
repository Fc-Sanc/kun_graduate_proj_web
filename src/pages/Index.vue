<template>
  <q-page class = "flex flex-center column">
    <div class = "text-h4 text-primary">
      开卷有益
    </div>

    <q-img
      width="450px"
      alt="cover-image"
      src = "http://localhost:7734/test/get_uploaded_image?imagePath=jpg/%E7%89%A7%E5%9C%BA%E7%89%A9%E8%AF%AD.jpg"/>

    <q-ajax-bar position = "top"/>
  </q-page>
</template>

<script>
import RegisterBox from "components/RegisterBox";

export default {
  name: 'PageIndex',
  data() {
    return {}
  },
  methods: {}
}
</script>
