<template>
  <q-page class = "q-pa-sm">

    <BalanceManagementBox/>

    <AddressManagementBox/>

  </q-page>
</template>

<script>
import {Cookies} from "quasar";
import AddressManagementBox from "components/AddressManagementBox";
import BalanceManagementBox from "components/BalanceManagementBox";

export default {
  name: "AccountManagementPage",
  components: {BalanceManagementBox, AddressManagementBox},
  methods: {
    init() {
      let userId = Cookies.get('user_id')
      if (!userId) {
        this.$q.notify("请登录后再进行操作")
        this.$router.push({path: '/login'})
      }
    }
  },
  mounted() {
    this.init()
  }

}
</script>

<style scoped>

</style>
