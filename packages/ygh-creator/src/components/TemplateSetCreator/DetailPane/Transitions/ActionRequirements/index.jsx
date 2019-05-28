import React from "react"

import Section from "components/Section"

import ActionRequirement from "./ActionRequirement"
import Add from "./Add"

const Transitions = ({ template, state, transition }) => {
  const children = (transition.requiredActions.length
    ? transition.requiredActions.map(actionRequirement => (
        <ActionRequirement
          key={actionRequirement.id}
          template={template}
          state={state}
          transition={transition}
          actionRequirement={actionRequirement}
        />
      ))
    : [
        <em>
          No action requirements: Transition happens whenever the player
          executes any action.
        </em>
      ]
  ).concat([<Add template={template} state={state} transition={transition} />])

  return (
    <Section title="Required actions" isFlat wrapChildren children={children} />
  )
}

export default Transitions
