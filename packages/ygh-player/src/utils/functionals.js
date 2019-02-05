export const Box = x => ({
  id: () => Box(x),
  inspect: () => {
    console.log(`Box(${x})`)
    return Box(x)
  },
  map: f => Box(f(x)),
  fold: f => f(x),
  value: () => x
})

const isNothing = x => x === null || x === undefined

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
