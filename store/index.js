import currencies from '@/static/currencies.json'
import commissions from '@/static/commissions.json'

const getRandom = (min, max) => {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min
}

const createPairs = (arr) => {
  const result = []
  for (let i = 0; i < arr.length - 1; i++) {
    for (let j = i; j < arr.length - 1; j++) {
      result.push({
        base_currency: arr[i],
        quote_currency: arr[j + 1],
        commission: commissions[getRandom(0, commissions.length - 1)],
      })
    }
  }
  return result
}

const createExchangeRates = (pairs) =>
  pairs.map((pair) => ({
    pair: `${pair.base_currency}/${pair.quote_currency}`,
    rate: getRandom(10, 100),
  }))

export const state = () => ({
  currencyPairs: [],
  exchangeRates: null,
})

export const actions = {
  initCurrencyExchange({ state, commit }) {
    const pairs = createPairs(currencies)
    const exchangeRates = createExchangeRates(pairs)

    commit('setPairs', pairs)
    commit('setExchangeRates', exchangeRates)
  },

  // initCurrencyPairs() {
  //   for (let i = 0; i < this.length - 1; i++) {
  //     for (let j = i; j < this.length - 1; j++) {
  //       func([this[i], this[j + 1]])
  //     }
  //   }
  // },
  // initExchangeRates() {},
}

export const mutations = {
  setPairs(state, value) {
    state.currencyPairs = value
  },
  setExchangeRates(state, value) {
    state.exchangeRates = value
  },
}
