export const Box = x => ({
  inspect: () => console.log(`Box(${x})`),
  map: f => Box(f(x)),
  fold: f => f(x),
  value: () => x,
})
