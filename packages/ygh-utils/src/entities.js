import { Maybe } from "./functionals"
import { omit } from "./functions"
import { EPSILON, approximateStationaryDistribution } from "./math"

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

export const toInputType = type => {
  switch (type) {
    case "STRING":
      return "textarea"
    case "NUMBER":
      return "number"
    case "GEOPOINT":
      return "geopoint"
    case "TIMESTAMP":
      return "datetime-local"
    default:
      return type
  }
}

export const getMinimalStateSpan = states => {
  if (states.length === 1) {
    return states
  }

  const stateIds = states.map(({ id }) => id)
  const transitionMatrix = states.map(({ id, outgoingTransitions }) => {
    const actualTransitions = outgoingTransitions.flatMap(({ to }) =>
      to ? [to.id] : []
    )
    return stateIds.map(stateId =>
      actualTransitions.length
        ? actualTransitions.includes(stateId)
          ? 1 / actualTransitions.length
          : 0
        : stateId === id
        ? 1
        : 0
    )
  })

  const stationaryDistribution = approximateStationaryDistribution(
    transitionMatrix
  )

  return states.filter((_, i) => stationaryDistribution[i] > EPSILON)
}

export const getMinimalStateSpanInverse = states => {
  if (states.length === 1) {
    return states
  }

  const stateIds = states.map(({ id }) => id)
  const transitionMatrix = states.map(({ id, incomingTransitions }) => {
    const actualTransitions = incomingTransitions.map(({ from }) => from)
    return stateIds.map(stateId =>
      actualTransitions.length
        ? actualTransitions.includes(stateId)
          ? 1 / actualTransitions.length
          : 0
        : stateId === id
        ? 1
        : 0
    )
  })

  const stationaryDistribution = approximateStationaryDistribution(
    transitionMatrix
  )

  return states.filter((_, i) => stationaryDistribution[i] > EPSILON)
}
