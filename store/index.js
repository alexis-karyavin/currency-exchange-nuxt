import currencies from '@/static/currencies.json'
import commissions from '@/static/commissions.json'

import createPairs from '@/assets/libs/createPairs'
import createExchangeRates from '@/assets/libs/createExchangeRates'
import getValueWithCommision from '@/assets/libs/getValueWithCommision'

export const state = () => ({
  currencyPairs: [],
  exchangeRates: [],
  currentBaseCurrency: null,
  currentQuoteCurrency: null,
  valueBaseCurrency: null,
  valueQuoteCurrency: null,
  handlerUpdateId: null,
})

export const getters = {
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
  getCurrentCurrencyPairs: (state) =>
    state.currencyPairs.find(
      (pair) =>
        pair.base_currency === state.currentBaseCurrency &&
        pair.quote_currency === state.currentQuoteCurrency
    ),
}

export const actions = {
  initCurrencyExchange({ commit, dispatch }) {
    const pairs = createPairs(currencies, commissions)
    const exchangeRates = createExchangeRates(pairs)

    commit('setPairs', pairs)
    commit('setExchangeRates', exchangeRates)
  },
  initIntervalUpdate({ commit, dispatch, state }, time) {
    const handlerUpdateId = setInterval(() => {
      dispatch('initCurrencyExchange')
      dispatch('calculateBaseCurrencies', state.valueBaseCurrency)
    }, time)

    commit('setHandlerUpdate', handlerUpdateId)
  },
  destroyHandlerUpdate({ state }) {
    clearInterval(state.handlerUpdateId)
  },
  reverseCurrency({ state, commit, dispatch }) {
    const tmp = state.currentBaseCurrency

    commit('setCurrentBaseCurrency', state.currentQuoteCurrency)
    commit('setCurrentQuoteCurrency', tmp)

    dispatch('calculateBaseCurrencies', state.valueBaseCurrency)
  },
  calculateBaseCurrencies({ commit, getters }, value) {
    if (value === '0') {
      commit('setValueQuoteCurrency', 0)
      commit('setValueBaseCurrency', 0)
      return
    }

    const commission = getters.getCurrentCurrencyPairs?.commission
    let valueQuoteCurrency = +value * getters.getCurrentExchangeRate?.rate

    valueQuoteCurrency =
      getValueWithCommision(valueQuoteCurrency, commission) || ''

    commit('setValueBaseCurrency', value)
    commit('setValueQuoteCurrency', valueQuoteCurrency.toString())
  },
  calculateQuoteCurrencies({ commit, getters }, value) {
    if (value === '0') {
      commit('setValueQuoteCurrency', 0)
      commit('setValueBaseCurrency', 0)
      return
    }

    const commission = getters.getCurrentCurrencyPairs?.commission

    let valueBaseCurrency = +value / getters.getCurrentExchangeRate?.rate

    valueBaseCurrency =
      getValueWithCommision(valueBaseCurrency, commission, 'to-base') || ''

    valueBaseCurrency = Math.ceil(valueBaseCurrency * 100) / 100

    commit('setValueQuoteCurrency', value)
    commit('setValueBaseCurrency', valueBaseCurrency.toString())
  },
  changeBaseCurrencies({ state, commit, dispatch }, value) {
    if (value === state.currentQuoteCurrency) {
      dispatch('reverseCurrency')
      return
    }

    commit('setCurrentBaseCurrency', value)
    dispatch('calculateBaseCurrencies', state.valueBaseCurrency)
  },
  changeQuoteCurrencies({ state, commit, dispatch }, value) {
    if (value === state.currentBaseCurrency) {
      dispatch('reverseCurrency')
      return
    }

    commit('setCurrentQuoteCurrency', value)
    dispatch('calculateBaseCurrencies', state.valueBaseCurrency)
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
  setCurrentQuoteCurrency(state, value) {
    state.currentQuoteCurrency = value
  },
  setValueBaseCurrency(state, value) {
    state.valueBaseCurrency = value
  },
  setValueQuoteCurrency(state, value) {
    state.valueQuoteCurrency = value
  },
  setHandlerUpdate(state, id) {
    state.handlerUpdateId = id
  },
}
