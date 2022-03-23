<template lang="pug"> 
  div.content
    h1.title Crypto Exchange

    div.container-cards
      Card
        template(v-slot:header) Exchange EUR to USD
        div.form-group
          label You pay
          input(type="text")
        div.container-button-reverse  
          button.btn-reverse aaa
        div.form-group
          label You get
          input(type="text")
</template>

<script>
import { mapState, mapActions } from 'vuex'
import TheNavBar from '@/components/TheNavBar.vue'
import Card from '@/components/Card.vue'

export default {
  name: 'IndexPage',
  components: {
    TheNavBar,
    Card,
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
.content {
  padding: 1rem;

  .title {
    margin-bottom: 2rem;
  }

  .form-group {
    display: flex;
    flex-direction: column;

    label {
      margin-bottom: 0.5rem;
    }
  }

  .container-button-reverse {
    display: flex;
    justify-content: flex-end;
    padding-right: 1rem;
    .btn-reverse {
      width: 50px;
      height: 50px;
      margin-top: 1rem;
    }
  }
}
</style>
