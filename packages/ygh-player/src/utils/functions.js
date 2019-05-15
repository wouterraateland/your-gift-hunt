import { Maybe } from "./functionals"

export const and = (...fns) => x => fns.reduce((v, f) => v && f(x), true)
export const compose = (...fns) => x => fns.reduceRight((v, f) => f(v), x)
export const constant = x => () => x
export const flip = f => x => y => f(y)(x)
export const identity = x => x
export const iff = p => (f, g) => v => (p(v) ? f(v) : g(v))
export const maybe = iff(Maybe.isNothing)
export const noop = () => {}
export const or = (...fns) => x => fns.reduce((v, f) => v || f(x), false)
export const pipe = (...fns) => x => fns.reduce((v, f) => f(v), x)

export default {
  and,
  compose,
  constant,
  flip,
  identity,
  iff,
  maybe,
  noop,
  or,
  pipe
}
