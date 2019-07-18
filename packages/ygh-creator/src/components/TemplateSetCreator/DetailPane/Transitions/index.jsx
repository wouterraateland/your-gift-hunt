import React from "react"

import TransitionTag from "components/Primitives/Transition"
import TabbedSection from "components/TabbedSection"

import Transition from "./Transition"
import Add from "./Add"

const Transitions = ({ template }) => (
  <TabbedSection
    title="State transitions"
    placeholder="This template has no transitions yet."
    tabs={template.states.flatMap(state =>
      state.outgoingTransitions.map(transition => ({
        id: transition.id,
        label: (
          <TransitionTag
            from={state}
            to={
              transition.to
                ? template.states.find(({ id }) => id === transition.to.id)
                : null
            }
          />
        ),
        content: <Transition template={template} transition={transition} />
      }))
    )}
    actions={[
      {
        label: <Add template={template} />
      }
    ]}
  />
)

export default Transitions
