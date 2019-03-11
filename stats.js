class Stats {
  constructor (buckets = 10) {
    this.value = 0
    this.lastValue = 0
    this.index = 0
    this.stats = Array(buckets).fill(0)
  }

  push (value) {
    const delta = value - this.lastValue
    this.lastValue = value

    this.stats[this.index] = delta
    this.index++
    if (this.index >= this.stats.length) {
      this.index = 0
    }
  }

  total () {
    return this.stats.reduce((a, b) => a + b, 0)
  }

  average () {
    return this.total() / this.stats.length
  }
}

module.exports = Stats
