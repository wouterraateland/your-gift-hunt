const Identity = value => ({
  id: () => Identity(value),
  map: f => Identity(f(value)),
  fold: f => f(value),

  valueOf: () => value,
  toString: () => `Identity(${value})`,
  [Symbol.iterator]: function*() {
    yield value
  },
  constructor: Identity
})

Identity.toString = () => "Identity"
Identity.is = x => typeof x.map === "function"

const isNothing = x => x === null || x === undefined
const isJust = x => !isNothing(x)
const Maybe = value => ({
  id: () => Maybe(value),
  map: f => Maybe(isNothing(value) ? value : f(value)),
  fold: f => (isNothing(value) ? value : f(value)),

  valueOf: () => value,
  toString: () => (isNothing(value) ? "Nothing" : `Just(${value})`),
  [Symbol.iterator]: function*() {
    if (isJust(value)) {
      yield value
    }
  },
  constructor: Maybe
})

Maybe.isNothing = isNothing
Maybe.isJust = isJust

export { Identity, Maybe }
