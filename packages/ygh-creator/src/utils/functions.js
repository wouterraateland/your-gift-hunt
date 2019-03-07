export const identity = x => x

export const noop = () => {}

export const constant = x => () => x

export const compose = (...fns) => x => fns.reduceRight((v, f) => f(v), x)

export default {
  identity,
  noop,
  constant,
  compose
}
