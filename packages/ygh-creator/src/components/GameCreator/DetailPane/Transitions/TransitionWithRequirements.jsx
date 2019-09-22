import React from "react"
import styled from "styled-components"

import Transition from "components/GameCreator/ClickableTransition"
import Unlocks from "./Unlocks"
import ActionRequirement from "./ActionRequirement"

const ActionRequirements = styled.ul`
  padding: 0;
  margin: 0;
`

const Label = styled.strong`
  display: block;
  margin: 0.5rem 0;
  line-height: 1.5rem;
`

const TransitionWithRequirements = ({ from, to, requiredActions = [] }) => (
  <>
    <Transition from={from} to={to} />
    <Label>Required actions</Label>
    <ActionRequirements>
      {requiredActions.map((actionRequirement, i) => (
        <ActionRequirement key={i} {...actionRequirement} />
      ))}
    </ActionRequirements>
    <Unlocks from={from} to={to} />
  </>
)

export default TransitionWithRequirements
