import currencies from '@/static/currencies.json'
import commissions from '@/static/commissions.json'

import createPairs from '@/assets/libs/createPairs'
import createExchangeRates from '@/assets/libs/createExchangeRates'

export const state = () => ({
  currencyPairs: [],
  exchangeRates: [],
  currentBaseCurrency: null,
  currentQuoteCurrency: null,
  valueBaseCurrency: null,
  valueQuoteCurrency: null,
})

export const getters = {
  // getCurrentBaseCurrency: (state) => state.currentBaseCurrency,
  // getCurrentQuoteCurrency: (state) => state.currentQuoteCurrency,
  getBaseCurrencies: (state) => [
    ...new Set(state.currencyPairs.map((item) => item.base_currency)),
  ],
  getQuoteCurrencies: (state) =>
    state.currencyPairs
      .filter((item) => item.base_currency === state.currentBaseCurrency)
      .map((item) => item.quote_currency),
  getCurrentExchangeRate: (state) =>
    state.exchangeRates.find(
      (rate) =>
        rate.pair ===
        `${state.currentBaseCurrency}/${state.currentQuoteCurrency}`
    ),
}

export const actions = {
  initCurrencyExchange({ commit }) {
    const pairs = createPairs(currencies, commissions)
    const exchangeRates = createExchangeRates(pairs)

    commit('setPairs', pairs)
    commit('setExchangeRates', exchangeRates)
  },
  reverseCurrency({ state, commit, dispatch }) {
    const tmp = state.currentBaseCurrency
    commit('setCurrentBaseCurrency', state.currentQuoteCurrency)
    commit('setQuoteBaseCurrency', tmp)

    dispatch('calculateBaseCurrencies', state.valueBaseCurrency)
  },
  calculateBaseCurrencies({ commit, getters }, value) {
    const valueQuoteCurrency =
      +value * getters.getCurrentExchangeRate.rate || ''

    commit('setValueBaseCurrency', value)
    commit('setValueQuoteCurrency', valueQuoteCurrency.toString())
  },
  calculateQuoteCurrencies({ commit, getters }, value) {
    const valueBaseCurrency = +value / getters.getCurrentExchangeRate.rate || ''

    commit('setValueQuoteCurrency', value)
    commit('setValueBaseCurrency', valueBaseCurrency.toString())
  },
}

export const mutations = {
  setPairs(state, value) {
    state.currencyPairs = value
  },
  setExchangeRates(state, value) {
    state.exchangeRates = value
  },
  setCurrentBaseCurrency(state, value) {
    state.currentBaseCurrency = value
  },
  setQuoteBaseCurrency(state, value) {
    state.currentQuoteCurrency = value
  },
  setValueBaseCurrency(state, value) {
    state.valueBaseCurrency = value
  },
  setValueQuoteCurrency(state, value) {
    state.valueQuoteCurrency = value
  },
}
