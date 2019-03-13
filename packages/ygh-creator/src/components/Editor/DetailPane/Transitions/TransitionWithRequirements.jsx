import React from "react"
import styled from "styled-components"

import Transition from "components/Editor/Transition"
import Unlocks from "./Unlocks"
import ActionRequirement from "./ActionRequirement"

const TransitionList = styled.ul`
  padding: 0;
  margin: 0;
`

const Label = styled.strong`
  display: block;
  margin: 1em 0 0.5em;

  font-size: smaller;
`

const TransitionWithRequirements = ({ from, to, requiredActions = [] }) => (
  <>
    <Transition from={from} to={to} />
    <Label>Required actions</Label>
    <TransitionList>
      {requiredActions.map((actionRequirement, i) => (
        <ActionRequirement key={i} {...actionRequirement} />
      ))}
    </TransitionList>
    <Label>Unlocks</Label>
    <Unlocks from={from} to={to} />
  </>
)

export default TransitionWithRequirements
