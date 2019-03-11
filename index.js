const path = require('path')
const readline = require('readline')
const util = require('util')
const { Worker } = require('worker_threads')

const Stats = require('./stats')
const Ticker = require('./ticker')

const DEFAULT_WORKER_NUM = 8

let next = 2
let highestPrime = 1
let workerCount = 0
let lastNumFound = 0
let numFound = 0
let exiting = false
const stats = new Stats(4)

const ticker = new Ticker()
function display () {
  readline.clearLine(process.stdout, 0)
  readline.cursorTo(process.stdout, 0);
  const char = ticker.next()
  const str = util.format(
    '%s Workers: %i; Testing: %i; highest candidate: %i; candidates found: %i; rate: %i/sec',
    char, workerCount, next, highestPrime, numFound, stats.average()
  )
  process.stdout.write(str)
}

setInterval(display, 33)
setInterval(() => {
  const delta = numFound - lastNumFound
  lastNumFound = numFound
  stats.push(delta)
}, 250)

function createWorker () {
  workerCount++
  const worker = new Worker(path.join(__dirname, 'worker.js'))
  worker.on('message', message => {
    if (message.type === 'request') {
      next = Math.max(next, highestPrime) + 1
      worker.postMessage(next)
      next++
    } else if (message.type === 'prime') {
      numFound++
      if (message.value > highestPrime) {
        highestPrime = message.value
      }

      if (highestPrime > 20000 && !exiting) {
        exiting = true
        process.stdout.write('\n')
        process.exit(0)
      }
    }
  })
}

console.log(`Server started on PID ${process.pid}`)
process.on('SIGUSR2', createWorker)

for (let i = 0; i < DEFAULT_WORKER_NUM; i++) {
  createWorker()
}
