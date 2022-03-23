<template lang="pug">
  div
    div {{currencyPairs}}
    div {{ exchangeRates }}
    //- button(type='button' ) increment
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  name: 'IndexPage',
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
