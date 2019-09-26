import React, { useState } from "react"
import styled from "styled-components"

import { ActionButton, Float, ToolTip } from "ygh-ui"
import Icons from "ygh-icons"

import Transition from "components/GameCreator/ClickableTransition"
import Unlocks from "./Unlocks"
import ActionRequirement from "./ActionRequirement"
import ActionRequirementForm from "./ActionRequirementForm"

const ActionRequirements = styled.ul`
  padding: 0;
  margin: 0;
`

const Label = styled.strong`
  display: block;
  margin: 0.5rem 0;
  line-height: 1.5rem;
`

const TransitionWithRequirements = ({ entity, state, transition }) => {
  const { from, to, requiredActions = [] } = transition
  const [isAddingNew, setAddingNew] = useState(false)

  return (
    <>
      <Transition from={from} to={to} />
      <Label>
        Required actions
        <Float.Right style={{ marginRight: "-.25rem" }}>
          <ActionButton color="primary" onClick={() => setAddingNew(true)}>
            <ToolTip>Add action requirement</ToolTip>
            <Icons.Plus />
          </ActionButton>
        </Float.Right>
      </Label>
      {isAddingNew && (
        <ActionRequirementForm
          entity={entity}
          state={state}
          transition={transition}
          onClose={() => setAddingNew(false)}
        />
      )}
      <ActionRequirements>
        {requiredActions.length
          ? requiredActions.map((actionRequirement, i) => (
              <ActionRequirement
                key={i}
                entity={entity}
                state={state}
                transition={transition}
                actionRequirement={actionRequirement}
              />
            ))
          : !isAddingNew && <em>None</em>}
      </ActionRequirements>
      <Unlocks from={from} to={to} />
    </>
  )
}

export default TransitionWithRequirements
