import React, { useContext } from "react"

import EntitiesContext from "contexts/Entities"

import FieldTag from "components/Editor/FieldTag"
import ListItem from "./ListItem"

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

const ValueRequirement = ({ requiredValues }) => {
  const { getFieldById } = useContext(EntitiesContext)

  return requiredValues.length ? (
    requiredValues.map(({ key, comparator, not, value, field }, i) => (
      <ListItem key={i}>
        Input "{key}" is {getVerb(comparator, not)} {value}
        {field && <FieldTag field={getFieldById(field.id)} />}
      </ListItem>
    ))
  ) : (
    <ListItem>Touched</ListItem>
  )
}

export default ValueRequirement
