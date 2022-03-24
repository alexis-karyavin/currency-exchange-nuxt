export default (value, commisionPercent, exchange = 'to-quote') => {
  const commission =
    commisionPercent === '0.0' ? value * (commisionPercent / 100) : 0

  if (exchange === 'to-quote') {
    return value - commission
  } else if (exchange === 'to-base') {
    return value + commission
  }
}
