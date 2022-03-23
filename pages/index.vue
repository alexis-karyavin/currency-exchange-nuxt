<template lang="pug"> 
  div.content
    h1.title Crypto Exchange
   
    div.container-cards
      Card
        template(v-slot:header) Exchange EUR to USD
        div.form-group
          label You pay {{ currentBaseCurrency }}
          Input(
            :currentCurrency="currentBaseCurrency"
            :currencies="baseCurrencies"
            @change-current-currency="setCurrentBaseCurrency"
          )
        div.container-button-reverse
          button.btn-reverse(@click="reverseCurrency")
            img.image-arrow(:src="imgArrow")
        div.form-group(v-if="quoteCurrencies.length")
          label You get {{ currentQuoteCurrency }}
          Input(
            :currentCurrency="currentQuoteCurrency"
            :currencies="quoteCurrencies"
            @change-current-currency="setQuoteBaseCurrency"
          )
</template>

<script>
import { mapState, mapActions, mapGetters, mapMutations } from 'vuex'
import TheNavBar from '@/components/TheNavBar.vue'
import Card from '@/components/Card.vue'
import Input from '@/components/Input.vue'

import imgArrow from '@/assets/icons/arrows-couple.png'

export default {
  name: 'IndexPage',
  components: {
    TheNavBar,
    Card,
    Input,
  },
  data() {
    return {
      imgArrow,
    }
  },
  computed: {
    ...mapState([
      'currencyPairs',
      'exchangeRates',
      'currentBaseCurrency',
      'currentQuoteCurrency',
    ]),
    ...mapGetters({
      baseCurrencies: 'getBaseCurrencies',
      quoteCurrencies: 'getQuoteCurrencies',
    }),
  },
  created() {
    this.initCurrencyExchange()
  },
  methods: {
    ...mapActions(['initCurrencyExchange', 'reverseCurrency']),
    ...mapMutations(['setCurrentBaseCurrency', 'setQuoteBaseCurrency']),
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

      .image-arrow {
        transform: rotate(90deg);
      }
    }
  }
}
</style>
