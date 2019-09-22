import { ACTION_TYPES } from "data"

import React from "react"
import styled from "styled-components"

import ListItem from "./ListItem"
import EntityRequirement from "./EntityRequirement"
import InputRequirement from "./InputRequirement"
import Hints from "./Hints"

const Container = styled.div`
  padding: 0.5rem 0 0.5rem 1rem;
  margin-right: -0.5rem;
  border-bottom: 1px solid #0002;

  &:first-of-type {
    border-top: 1px solid #0002;
  }
`

const ActionRequirement = ({ type, payload }) => {
  switch (type) {
    case ACTION_TYPES.USE:
    case ACTION_TYPES.TARGET_OF_USE:
      return (
        <EntityRequirement
          type={type}
          requiredEntity={payload.requiredEntity}
        />
      )
    case ACTION_TYPES.INPUT:
      return <InputRequirement requiredInput={payload.requiredInput} />
    default:
      return (
        <ListItem>
          {type}: {JSON.stringify(payload)}
        </ListItem>
      )
  }
}

const ActionRequirementWithHints = props => (
  <Container>
    <ActionRequirement {...props} />
    <Hints {...props} />
  </Container>
)

export default ActionRequirementWithHints
