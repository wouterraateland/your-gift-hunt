import { Maybe } from "./functionals"
import { omit } from "./functions"

export const hasState = stateName => entity =>
  !!(entity && stateName && entity.state && entity.state.name) &&
  entity.state.name.toLowerCase() === stateName.toLowerCase()

export const getFieldValue = fieldName => entity =>
  Maybe(entity)
    .map(e => e.fields)
    .map(fields => fields.find(({ name }) => name === fieldName))
    .fold(f => f.value)

export const getInputValue = key => entity =>
  Maybe(entity)
    .map(e => e.inputs)
    .map(inputs => inputs.find(input => input.key === key))
    .fold(i => i.value)

export const getInformationSlotValue = name => entity =>
  Maybe(entity)
    .map(e => e.informationSlots)
    .map(slots => slots.find(slot => slot.name === name))
    .fold(s => s.value)

export const stripEntity = entity =>
  Maybe(entity).fold(omit(["left", "top", "rotation", "width", "height", "z"]))