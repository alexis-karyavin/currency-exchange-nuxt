<template lang="pug">
  div
    TheNavBar
    div
      div {{currencyPairs}}
      div {{ exchangeRates }}
    //- button(type='button' ) increment
</template>

<script>
import { mapState, mapActions } from 'vuex'
import TheNavBar from '@/components/TheNavBar.vue'

export default {
  name: 'IndexPage',
  components: {
    TheNavBar,
  },
  computed: {
    ...mapState(['currencyPairs', 'exchangeRates']),
  },
  created() {
    this.initCurrencyExchange()
  },
  methods: {
    ...mapActions(['initCurrencyExchange']),
  },
}
</script>

<style lang="scss">
button {
  color: red;
}
</style>
