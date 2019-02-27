import React from "react"
import styled from "styled-components"

import Transition from "./Transition"
import Unlocks from "./Unlocks"
import ActionRequirement from "./ActionRequirement"

const TransitionContainer = styled.div`
  margin: 0 -1em;
  padding: 1em;

  & + & {
    border-top: 1px solid #0002;
  }
`

const Label = styled.span`
  font-size: 0.7em;
  color: #0006;
`

const TransitionList = styled.ul`
  padding: 0;
  margin: 0;
`

const TransitionWithRequirements = ({ from, to, requiredActions = [] }) => (
  <TransitionContainer>
    <Transition from={from} to={to} />
    <br />
    <br />
    <Label>When</Label>
    <TransitionList>
      {requiredActions.map((actionRequirement, i) => (
        <ActionRequirement key={i} {...actionRequirement} />
      ))}
    </TransitionList>
    <br />
    <Unlocks from={from} to={to} />
  </TransitionContainer>
)

export default TransitionWithRequirements
