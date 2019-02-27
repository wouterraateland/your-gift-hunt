import React, { useContext } from "react"

import EntitiesContext from "contexts/Entities"

import { InputType } from "your-gift-hunt/ui"
import ListItem from "./ListItem"

const toInputType = type => {
  switch (type) {
    case "STRING":
      return "text"
    case "NUMBER":
      return "number"
    default:
      return type
  }
}

const FieldLabel = ({ fieldId }) => {
  const { getEntityFieldById } = useContext(EntitiesContext)

  const { label, type, isMulti, isSecret } = getEntityFieldById(fieldId)

  return (
    <strong>
      {label}
      <InputType
        type={toInputType(type)}
        isMulti={isMulti}
        isSecret={isSecret}
      />
    </strong>
  )
}

const ValueRequirement = ({ requiredValues }) =>
  requiredValues.length ? (
    requiredValues.map(({ key, eqValue, neqValue, eqField, neqField }, i) => (
      <ListItem key={i}>
        Input "{key}" is {(neqValue || neqField) && <u>not</u>} equal to{" "}
        {eqValue}
        {neqValue}
        {eqField && <FieldLabel fieldId={eqField.id} />}
        {neqField && <FieldLabel fieldId={neqField.id} />}
      </ListItem>
    ))
  ) : (
    <ListItem>Touched</ListItem>
  )

export default ValueRequirement
