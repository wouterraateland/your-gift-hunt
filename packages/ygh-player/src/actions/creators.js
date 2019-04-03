import { INPUT, USE } from "./types"

export const createInputAction = (source, inputValueMap = {}) => ({
  type: INPUT,
  payload: {
    source,
    inputValues: Object.entries(inputValueMap).map(([key, value]) => ({
      key,
      value: JSON.stringify(value)
    }))
  }
})

export const createUseAction = (destination, source) => ({
  type: USE,
  payload: { source, destination }
})
