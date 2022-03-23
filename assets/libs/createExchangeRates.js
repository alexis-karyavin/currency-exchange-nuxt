import getRandom from './getRandom'

export default (pairs) =>
  pairs.map((pair) => ({
    pair: `${pair.base_currency}/${pair.quote_currency}`,
    rate: getRandom(10, 100),
  }))
