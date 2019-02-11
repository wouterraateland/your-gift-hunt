import S from "sanctuary"

export const hasState = stateName => instance =>
  !!(instance && instance.state) && instance.state.name === stateName

// getFieldValue :: String => EntityInstance => Maybe any
export const getFieldValue = fieldName => instance =>
  S.pipe([
    S.toMaybe,
    S.map(i => i.fieldValues.find(({ label }) => label === fieldName)),
    S.map(f => f.value),
    S.map(JSON.parse)
  ])(instance)
// S.Maybe(instance)
//   .map(i => i.fieldValues.find(({ label }) => label === fieldName))
//   .map(f => f.value)
//   .fold(JSON.parse)

// getInputValue :: String => EntityInstance => Maybe any
export const getInputValue = fieldName => instance =>
  S.pipe([
    S.toMaybe,
    S.map(i => i.inputValues.find(({ key }) => key === fieldName)),
    S.map(f => f.value),
    S.map(JSON.parse)
  ])(instance)
// Maybe(instance)
//   .map(i => i.inputValues.find(({ key }) => key === fieldName))
//   .map(f => f.value)
//   .fold(JSON.parse)
