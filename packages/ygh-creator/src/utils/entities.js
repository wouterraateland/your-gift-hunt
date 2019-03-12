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

// getInputValue :: String => EntityInstance => Maybe any
export const getInputValue = fieldName => instance =>
  S.pipe([
    S.toMaybe,
    S.map(i => i.inputValues.find(({ key }) => key === fieldName)),
    S.map(f => f.value),
    S.map(JSON.parse)
  ])(instance)

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
