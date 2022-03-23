import getRandom from './getRandom'

export default (arr, commissions) => {
  const result = []
  for (let i = 0; i < arr.length - 1; i++) {
    for (let j = 0; j < arr.length - 1; j++) {
      if (arr[i] === arr[j]) continue
      result.push({
        base_currency: arr[i],
        quote_currency: arr[j],
        commission: commissions[getRandom(0, commissions.length - 1)],
      })
    }
  }
  return result
}
