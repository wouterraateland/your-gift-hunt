export const EPSILON = 1e-4
export const MARKOV_MAX_STEPS = 5000

export const clamp = (min, max) => x => Math.max(min, Math.min(x, max))

export const mean = xs => xs.reduce((acc, x) => acc + x, 0) / xs.length

export const angle = (p1, p2) => Math.atan2(p2.y - p1.y, p2.x - p1.x)

export const dist = (p1, p2) =>
  Math.sqrt(Math.pow(p2.y - p1.y, 2) + Math.pow(p2.x - p1.x, 2))

export const xA = (x, A) => {
  const b = x.map(() => 0)
  for (let i = 0; i < A.length; i++) {
    for (let j = 0; j < A[i].length; j++) {
      b[j] += x[i] * A[i][j]
    }
  }
  return b
}

export const approximateStationaryDistribution = (T, n = MARKOV_MAX_STEPS) => {
  let d = T.map(() => 1 / T.length)
  for (let i = 0; i < n; i++) {
    d = xA(d, T)
  }
  return d
}

export default {
  EPSILON,
  MARKOV_MAX_STEPS,
  clamp,
  mean,
  angle,
  dist,
  xA,
  approximateStationaryDistribution
}
