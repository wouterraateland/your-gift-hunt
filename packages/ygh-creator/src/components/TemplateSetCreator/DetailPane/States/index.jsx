import React from "react"

import StateTag from "components/Primitives/StateTag"
import TabbedSection from "components/TabbedSection"

import State from "./State"
import Add from "./Add"

const States = ({ template }) => (
  <TabbedSection
    title="States"
    placeholder="This template has no states yet."
    tabs={template.states.map(state => ({
      id: state.id,
      label: <StateTag state={state} />,
      content: <State template={template} state={state} />
    }))}
    actions={[
      {
        label: <Add template={template} />
      }
    ]}
  />
)

export default States
