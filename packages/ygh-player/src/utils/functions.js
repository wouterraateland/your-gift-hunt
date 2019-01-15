export const identity = x => x

export const noop = () => {}

export const mean = xs =>
  xs.reduce((acc, x) => acc + x, 0) / xs.length

export const angle = (p1, p2) =>
  Math.atan2(p2.y - p1.y, p2.x - p1.x)

export const dist = (p1, p2) =>
  Math.sqrt(Math.pow(p2.y - p1.y, 2) + Math.pow(p2.x - p1.x, 2))

export default {
  identity,
  noop,
  mean,
  angle,
  dist,
}
