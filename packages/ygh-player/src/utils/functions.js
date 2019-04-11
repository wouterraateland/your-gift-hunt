import { Maybe } from "./functionals"

export const compose = (...fns) => x => fns.reduceRight((v, f) => f(v), x)
export const constant = x => () => x
export const identity = x => x
export const noop = () => {}
export const iff = p => (f, g) => v => (p(v) ? f(v) : g(v))
export const maybe = iff(Maybe.isNothing)
export const or = (...fns) => x => fns.reduce((v, f) => v || f(x), false)
export const and = (...fns) => x => fns.reduce((v, f) => v && f(x), true)

export default {
  compose,
  constant,
  identity,
  noop,
  iff,
  maybe,
  or,
  and
}
