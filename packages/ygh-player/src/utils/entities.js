import { Maybe } from "./functionals"

export const hasState = stateName => instance =>
  !!(instance && instance.state) && instance.state.name === stateName

export const getFieldValue = fieldName => instance =>
  Maybe(instance)
    .map(i => i.fieldValues.find(({ label }) => label === fieldName))
    .map(f => f.value)
    .fold(JSON.parse)

export const getInputValue = fieldName => instance =>
  Maybe(instance)
    .map(i => i.inputValues.find(({ key }) => key === fieldName))
    .map(f => f.value)
    .fold(JSON.parse)
