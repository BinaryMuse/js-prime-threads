class Stats {
  constructor (buckets = 10) {
    this.index = 0
    this.stats = Array(buckets).fill(0)
  }

  push (value) {
    this.stats[this.index] = value
    this.index++
    if (this.index >= this.stats.length) {
      this.index = 0
    }
  }

  average () {
    return this.stats.reduce((a, b) => a + b, 0) / this.stats.length
  }
}

module.exports = Stats
