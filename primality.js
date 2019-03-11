function isPrime (candidate, tries) {
  for (let i = 0; i < tries; i++) {
    if (!fermat(candidate)) {
      return false
    }
  }

  return true
}

function fermat (p) {
  if (p <= 3) {
    return true
  }

  const a = BigInt(randomBetween(2, p - 2))
  if (a ** BigInt(p - 1) % BigInt(p) === 1n) {
    return true
  } else {
    return false
  }
}

function randomBetween (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

module.exports = {
  isPrime, fermat
}
