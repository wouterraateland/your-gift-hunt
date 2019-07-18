import React from "react"

import TabbedSection from "components/TabbedSection"
import Entrance from "./Entrance"
import Add from "./Add"

const Entrances = ({ template }) => (
  <TabbedSection
    title="Entrances"
    placeholder="This template has no entrances yet."
    tabs={template.entrances.map(entrance => ({
      id: entrance.id,
      label: entrance.name || <em>Nameless</em>,
      content: <Entrance template={template} entrance={entrance} />
    }))}
    actions={[
      {
        label: <Add template={template} />
      }
    ]}
  />
)

export default Entrances
