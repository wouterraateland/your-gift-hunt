import React from "react"

import TabbedSection from "components/TabbedSection"
import InformationSlot from "./InformationSlot"
import Add from "./Add"

const InformationSlots = ({ template }) => (
  <TabbedSection
    title="InformationSlots"
    placeholder="This template has no information slots yet."
    tabs={template.informationSlots.map(slot => ({
      id: slot.id,
      label: slot.name || <em>Nameless</em>,
      content: <InformationSlot template={template} slot={slot} />
    }))}
    actions={[
      {
        label: <Add template={template} />
      }
    ]}
  />
)

export default InformationSlots
