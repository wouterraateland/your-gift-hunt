export const Identity = x => ({
  id: () => Identity(x),
  inspect: () => {
    console.log(`Identity(${x})`)
    return Identity(x)
  },
  map: f => Identity(f(x)),
  fold: f => f(x),
  value: () => x
})

const isNothing = x => x === null || x === undefined
const isJust = x => x !== null && x !== undefined

export const Maybe = x => ({
  id: () => Maybe(x),
  inspect: () => {
    console.log(isNothing(x) ? `Nothing` : `Just(${x})`)
    return Maybe(x)
  },
  map: f => Maybe(isNothing(x) ? x : f(x)),
  fold: f => (isNothing(x) ? x : f(x)),
  value: () => x
})
Maybe.from = x => Maybe(x)
Maybe.isNothing = isNothing
Maybe.isJust = isJust
