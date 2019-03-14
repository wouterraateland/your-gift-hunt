import React, { useContext } from "react"

import EntitiesContext from "contexts/Entities"

import { InputType } from "your-gift-hunt/ui"
import ListItem from "./ListItem"
import _ from "utils"

const FieldLabel = ({ fieldId }) => {
  const { getFieldById } = useContext(EntitiesContext)

  const { label, type, isSecret } = getFieldById(fieldId)

  return (
    <strong>
      {label}
      <InputType
        type={_.toInputType(type.type)}
        isMulti={type.isMulti}
        isSecret={isSecret}
      />
    </strong>
  )
}

const getVerb = (comparator, not) => {
  switch (comparator) {
    case "EQUAL_TO":
      return `${not ? "not " : ""}equal to`
    case "ELEMENT_OF":
      return `${not ? "not " : ""}an element of`
    case "GREATER_THEN":
      return not ? "less then or equal to" : "greater then"
    case "LESS_THEN":
      return not ? "greater then or equal to" : "less then"
    default:
      return `${not} ${comparator}`
  }
}

const ValueRequirement = ({ requiredValues }) =>
  requiredValues.length ? (
    requiredValues.map(({ key, comparator, not, value, field }, i) => (
      <ListItem key={i}>
        Input "{key}" is {getVerb(comparator, not)} {value}
        {field && <FieldLabel fieldId={field.id} />}
      </ListItem>
    ))
  ) : (
    <ListItem>Touched</ListItem>
  )

export default ValueRequirement
