const TICKS = [ '|', '/', '-', '\\' ]

class Ticker {
  constructor () {
    this.nextTick = 0
  }

  next () {
    this.nextTick++
    if (this.nextTick >= TICKS.length) {
      this.nextTick -= TICKS.length
    }
    return TICKS[this.nextTick]
  }
}

module.exports = Ticker
