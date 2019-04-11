import { INPUT, USE } from "./actionTypes"

export const createInputAction = (source, inputValues = []) => ({
  type: INPUT,
  payload: {
    source: source && source.id ? { id: source.id } : null,
    inputValues: inputValues.map(({ key, value }) => ({
      key,
      value: JSON.stringify(value)
    }))
  }
})

export const createUseAction = (source, destination) => ({
  type: USE,
  payload: {
    source: source && source.id ? { id: source.id } : null,
    destination: destination && destination.id ? { id: destination.id } : null
  }
})

export default {
  createInputAction,
  createUseAction
}
