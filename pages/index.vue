<template lang="pug"> 
  div.content
    h1.title Crypto Exchange
   
    div.container-cards
      Card
        template(v-slot:header) Exchange {{ currentBaseCurrency }} to {{currentQuoteCurrency}}
        div.form-group
          label You pay
          Input(
            :currentCurrency="currentBaseCurrency"
            :currencies="baseCurrencies"
            :value="valueBaseCurrency"
            @change-current-currency="changeBaseCurrencies"
            @set-value="calculateBaseCurrencies"
          )
        div.container-button-reverse
          button.btn-reverse(@click="reverseCurrency")
            img.image-arrow(:src="imgArrow")
        div.form-group(v-if="quoteCurrencies.length")
          label You get
          Input(
            :currentCurrency="currentQuoteCurrency"
            :currencies="quoteCurrencies"
            :value="valueQuoteCurrency"
            @change-current-currency="changeQuoteCurrencies"
            @set-value="calculateQuoteCurrencies"
          )
        div.container-btn-exchange
          button(type="button" @click="exchange" :disabled="isDisabledBtnExchange") Exchange

    Modal(v-if="showModalComplete" @close="closeModalComplete")
      h3 Complete!
      
</template>

<script>
import { mapState, mapActions, mapGetters, mapMutations } from 'vuex'
import TheNavBar from '@/components/TheNavBar.vue'
import Card from '@/components/Card.vue'
import Input from '@/components/Input.vue'
import Modal from '@/components/Modal.vue'

import imgArrow from '@/assets/icons/arrows-couple.png'

export default {
  name: 'IndexPage',
  components: {
    TheNavBar,
    Card,
    Input,
    Modal,
  },
  data() {
    return {
      imgArrow,
      showModalComplete: false,
      timeUpdate: 30000,
    }
  },
  computed: {
    ...mapState([
      'currencyPairs',
      'exchangeRates',
      'currentBaseCurrency',
      'currentQuoteCurrency',
      'valueBaseCurrency',
      'valueQuoteCurrency',
    ]),
    ...mapGetters({
      baseCurrencies: 'getBaseCurrencies',
      quoteCurrencies: 'getQuoteCurrencies',
    }),
    isDisabledBtnExchange: (vm) =>
      !vm.valueBaseCurrency && !vm.valueQuoteCurrency,
  },
  created() {
    this.initCurrencyExchange()
    this.initIntervalUpdate(this.timeUpdate)
  },
  methods: {
    ...mapActions([
      'initCurrencyExchange',
      'reverseCurrency',
      'calculateBaseCurrencies',
      'calculateQuoteCurrencies',
      'changeBaseCurrencies',
      'changeQuoteCurrencies',
      'destroyHandlerUpdate',
      'initIntervalUpdate',
    ]),
    ...mapMutations(['setValueQuoteCurrency', 'setValueBaseCurrency']),
    exchange() {
      this.showModalComplete = true
      this.destroyHandlerUpdate()
    },
    closeModalComplete() {
      this.showModalComplete = false
      this.initIntervalUpdate(this.timeUpdate)
    },
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
  .container-btn-exchange {
    margin-top: 2rem;
  }
}
</style>
