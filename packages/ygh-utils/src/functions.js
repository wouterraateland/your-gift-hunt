import { Maybe } from "./functionals"

export const and = (...fns) => x => fns.reduce((v, f) => v && f(x), true)
export const chooseRandom = xs => xs[Math.floor(Math.random() * xs.length)]
export const compose = (...fns) => x => fns.reduceRight((v, f) => f(v), x)
export const constant = x => () => x
export const flip = f => x => y => f(y)(x)
export const identity = x => x
export const iff = p => (a, b) => v => (p(v) ? a(v) : b(v))
export const is = x => y => x === y
export const maybe = iff(Maybe.isNothing)
export const noop = () => {}
export const omit = keys => object =>
  Object.keys(object).reduce(
    (acc, key) => (keys.includes(key) ? acc : { ...acc, [key]: object[key] }),
    {}
  )
export const or = (...fns) => x => fns.reduce((v, f) => v || f(x), false)
export const pipe = (...fns) => x => fns.reduce((v, f) => f(v), x)

export const pruneData = d =>
  Array.isArray(d)
    ? iff(x => x.length === 0)(constant(undefined), identity)(
        d.reduce(
          (acc, x) =>
            iff(is(undefined))(constant(acc), y => [...acc, y])(pruneData(x)),
          []
        )
      )
    : d && typeof d === "object"
    ? iff(x => Object.keys(x).length === 0)(constant(undefined), identity)(
        Object.keys(d).reduce(
          (acc, k) =>
            iff(is(undefined))(constant(acc), y => ({ ...acc, [k]: y }))(
              pruneData(d[k])
            ),
          {}
        )
      )
    : d

export default {
  and,
  chooseRandom,
  compose,
  constant,
  flip,
  identity,
  iff,
  is,
  maybe,
  noop,
  omit,
  or,
  pipe,
  pruneData
}
