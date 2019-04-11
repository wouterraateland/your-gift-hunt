import { Maybe } from "./functionals"

export const hasState = stateName => entity =>
  !!(entity && entity.state) && entity.state.name === stateName

export const getFieldValue = fieldName => entity =>
  Maybe(entity)
    .map(e => e.fields.find(({ name }) => name === fieldName))
    .fold(f => f.value)

export const getInputValue = key => entity =>
  Maybe(entity)
    .map(e => e.inputs.find(input => input.key === key))
    .fold(i => i.value)
