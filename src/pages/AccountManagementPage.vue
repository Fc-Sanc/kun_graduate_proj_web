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
import {checkLogin} from "assets/js/utils/fetch_extension";

export default {
  name: "AccountManagementPage",
  components: {BalanceManagementBox, AddressManagementBox},
  methods: {
    init() {
      checkLogin(() => {
        this.$router.push({path: '/login'})
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
