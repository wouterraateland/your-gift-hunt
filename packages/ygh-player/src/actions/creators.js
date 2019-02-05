import { INPUT, USE } from "./types"

export const createInputAction = (instanceId, inputValueMap = {}) => ({
  type: INPUT,
  payload: {
    instanceId,
    inputValues: Object.entries(inputValueMap).map(([key, value]) => ({
      key,
      value: JSON.stringify(value)
    }))
  }
})

export const createUseAction = (instanceId, itemId) => ({
  type: USE,
  payload: { instanceId, itemId }
})
