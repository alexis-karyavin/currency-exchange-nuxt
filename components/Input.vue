<template lang="pug">
  div.wrapper-input-exchange
    input(type="text" :value="value" @input="inputValue($event.target.value)")
    select(@change="changeSelect($event.target.value)")
      option(
        v-for="(currency, i) in currencies"
        :key="currency + Date.now"
        :value="currency"
        :selected="currency === currentCurrency"
      ) {{ currency }}
</template>
>

<script>
// import { mapGetters } from 'vuex'

export default {
  name: 'InputComponent',
  props: {
    currentCurrency: {
      type: String,
      default: '',
    },
    currencies: {
      type: Array,
      default: () => [],
    },
    value: {
      type: String,
      default: '',
    },
  },
  created() {
    this.changeSelect(this.currencies[0])
  },
  methods: {
    changeSelect(value) {
      this.$emit('change-current-currency', value)
    },
    inputValue(value) {
      value = !isNaN(+value) ? value : ''
      this.$emit('set-value', value)
    },
  },
}
</script>

<style lang="scss">
.wrapper-input-exchange {
  input,
  select {
    height: 30px;
  }

  input {
    width: 80%;
  }

  select {
    width: 15%;
  }
}
</style>
