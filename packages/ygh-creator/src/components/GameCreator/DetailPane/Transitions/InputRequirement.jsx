import React from "react"

import InputTag from "components/Primitives/InputTag"
import FieldTag from "components/Primitives/FieldTag"
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

const JustInputRequirement = ({
  requiredInput: { key, comparator, not, value, field }
}) => (
  <>
    <InputTag>{key}</InputTag> is {getVerb(comparator, not)} {value}
    {field && <FieldTag field={field} />}
  </>
)

const MaybeInputRequirement = ({ requiredInput }) => (
  <ListItem>
    {requiredInput ? (
      <JustInputRequirement requiredInput={requiredInput} />
    ) : (
      "Touched"
    )}
  </ListItem>
)

export default MaybeInputRequirement
