import React from "react"

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

const InputRequirement = ({ requiredInputs }) => {
  return requiredInputs.length ? (
    requiredInputs.map(({ key, comparator, not, value, field }, i) => (
      <ListItem key={i}>
        Input "{key}" is {getVerb(comparator, not)} {value}
        {field && <FieldTag field={field} />}
      </ListItem>
    ))
  ) : (
    <ListItem>Touched</ListItem>
  )
}

export default InputRequirement
