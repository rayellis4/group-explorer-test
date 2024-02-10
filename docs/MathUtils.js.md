// @flow
// math functions

import BitSet from './BitSet.js'

const primeList /*: BitSet */ = new BitSet(200,
  [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41,
    43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97,
    101, 103, 107, 109, 113, 127, 131, 137, 139, 149,
    151, 157, 163, 167, 173, 179, 181, 191, 193, 197, 199])

const primePowerList /*: BitSet */ = new BitSet(200,
  [2, 3, 4, 5, 7, 8, 9, 11, 13, 16, 17, 19, 23, 25, 27,
    29, 31, 32, 37, 41, 43, 47, 49, 53, 59, 61, 64, 67,
    71, 73, 79, 81, 83, 89, 97, 101, 103, 107, 109, 113,
    121, 125, 127, 128, 131, 137, 139, 149, 151, 157, 163,
    167, 169, 173, 179, 181, 191, 193, 197, 199])

export function isPrime (n /*: integer */) /*: boolean */ {
  return (n < 200) ? primeList.isSet(n) : getFactors(n).length === 1
}

export function isPrimePower (n /*: integer */) /*: boolean */ {
  if (n < 200) {
    return primePowerList.isSet(n)
  } else {
    const factors = getFactors(n)
    return factors.every(el => el === factors[0])
  }
}

export function getFactors (n /*: integer */) /*: Array<integer> */ {
  const lim = Math.ceil(Math.sqrt(n + 1))
  for (let i = 2; i < lim; i++) {
    if (n % i === 0) {
      const fs = getFactors(n / i)
      fs.push(i)
      return fs
    }
  }
  return [n]
}
