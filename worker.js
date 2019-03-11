const { parentPort } = require('worker_threads')

const { isPrime } = require('./primality')

parentPort.on('message', candidate => {
  if (isPrime(candidate, 5)) {
    parentPort.postMessage({ type: 'prime', value: candidate })
  }
  parentPort.postMessage({ type: 'request' })
})

parentPort.postMessage({ type: 'request' })
