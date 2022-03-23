import currencies from '@/static/currencies.json'
import commissions from '@/static/commissions.json'

import createPairs from '@/assets/libs/createPairs'
import createExchangeRates from '@/assets/libs/createExchangeRates'

export const state = () => ({
  currencyPairs: [],
  exchangeRates: null,
})

export const actions = {
  initCurrencyExchange({ commit }) {
    const pairs = createPairs(currencies, commissions)
    const exchangeRates = createExchangeRates(pairs)

    commit('setPairs', pairs)
    commit('setExchangeRates', exchangeRates)
  },
}

export const mutations = {
  setPairs(state, value) {
    state.currencyPairs = value
  },
  setExchangeRates(state, value) {
    state.exchangeRates = value
  },
}
